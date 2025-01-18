from rest_framework import serializers
from .models import Account, Category, Transaction

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    account_name = serializers.CharField(source='account.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    account_balance = serializers.SerializerMethodField()
    account_budget = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = [
            'id', 'account', 'account_name', 'category', 'category_name',
            'transaction_type', 'amount', 'date', 'description', 'account_balance', 'account_budget'
        ]

    def get_account_balance(self, obj):
        return obj.account.balance
    def get_account_budget(seudgetlf, obj):
        return obj.account.budget