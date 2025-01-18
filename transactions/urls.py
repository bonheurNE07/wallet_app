from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AccountViewSet, CategoryViewSet, TransctionViewSet

router = DefaultRouter()
router.register('accounts', AccountViewSet)
router.register('categories', CategoryViewSet)
router.register('transactions', TransctionViewSet)

urlpatterns = [
    path("", include(router.urls)), # Path to the API routes for the transactions app
]