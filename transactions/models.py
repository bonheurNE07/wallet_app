from django.db import models

# model to represent an account
class Account(models.Model):
    name = models.CharField(max_length=100) # name of the account
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) # current balance in the account
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) # budget limit for the account

    def __str__(self):
        return self.name # string representation of the account

# model to represent a category for transaction
class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# model to represent a financial transaction
class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]

    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.amount}"