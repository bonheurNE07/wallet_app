from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend

from .models import Account, Category, Transaction
from .serializers import AccountSerializer, CategorySerializer, TransactionSerializer

# view  for user signup
class SignupView(APIView):
    permission_classes = [AllowAny] # publicly accessible

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # check for required fields
        if not username or not password:
            return Response({"error": "Username and  password are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # check if username already exists
        if User.objects.filter(username=username).exists():
            return Response({"error":"Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        # create new user
        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)
    

# view for user login
class LoginView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = User.objects.filter(username=username).first() # fetch the user by username
        
        # validate credentials
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user) # generate JWT tokens
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"error": "Invalid credebtials."}, status=status.HTTP_401_UNAUTHORIZED)
    
# ViewSet for managing accounts
class AccountViewSet(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated] # Accessible only to authenticated users

# ViewSet for managing accounts
class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

# ViewSet for managing transctions
class TransctionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend] # enable filtering
    filterset_fields = {'date': ['gte', 'lte'],} # filter transactions by date range

    # adjust the account balance when creating a transaction
    def perform_create(self, serializer):
        transaction = serializer.save()
        account = transaction.account

        if transaction.transaction_type == "income":
            account.balance += transaction.amount
        elif transaction.transaction_type == "expense":
            account.balance -= transaction.amount
        
        account.save()
    
    # adjust the account balance when updating a transaction
    def perform_update(self, serializer):
        existing_transaction = self.get_object()
        old_amount = existing_transaction.amount
        old_transaction_type = existing_transaction.transaction_type
        account = existing_transaction.account

        # reverse the old transaaction effect
        if old_transaction_type == "income":
            account.balance -= old_amount
        elif old_transaction_type == "expense":
            account.balance += old_amount
        
        # update the transaction
        transaction = serializer.save()
        
        # apply the new transaction effect
        if transaction.transaction_type == "income":
            account.balance += transaction.amount
        elif transaction.transaction_type == "expense":
            account.balance -= transaction.amount

        account.save()

    # adjust the account balance when deleting a transaction
    def destroy(self, request, *args, **kwargs):
        transaction = self.get_object()
        account = transaction.account

        # to reverse the transaction effect
        if transaction.transaction_type == "income":
            account.balance -= transaction.amount
        elif transaction.transaction_type == "expense":
            account.balance += transaction.amount
        
        account.save()

        return super().destroy(request, *args, **kwargs)