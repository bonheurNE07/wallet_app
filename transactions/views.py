from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from .models import Account, Category, Transaction
from .serializers import AccountSerializer, CategorySerializer, TransactionSerializer

class AccountViewSet(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TransctionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'date': ['gte', 'lte'],}


    def perform_create(self, serializer):
        transaction = serializer.save()
        account = transaction.account

        if transaction.transaction_type == "income":
            account.balance += transaction.amount
        elif transaction.transaction_type == "expense":
            account.balance -= transaction.amount
        
        account.save()
    
    def perform_update(self, serializer):
        existing_transaction = self.get_object()
        old_amount = existing_transaction.amount
        old_transaction_type = existing_transaction.transaction_type
        account = existing_transaction.account

        # ipdate the transaction
        transaction = serializer.save()

        # reverse the old transaaction effect
        if old_transaction_type == "income":
            account.balance -= old_amount
        elif old_transaction_type == "expense":
            account.balance += old_amount
        
        # apply the new transaction effect
        if transaction.transaction_type == "income":
            account.balance += transaction.amount
        elif transaction.transaction_type == "expense":
            account.balance -= transaction.amount

        account.save()

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