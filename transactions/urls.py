from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AccountViewSet, CategoryViewSet, TransctionViewSet, SignupView, LoginView

# Define the router for ModelViewSets
router = DefaultRouter()
router.register('accounts', AccountViewSet) # routes for account operations
router.register('categories', CategoryViewSet) # Routes for category operations
router.register('transactions', TransctionViewSet) # Routes for transaction operations

# define url patterns
urlpatterns = [
    path("", include(router.urls)), # Include routes from the router
    path("signup/", SignupView.as_view(), name="signup"), # signup enpoint
    path("login/", LoginView.as_view(), name="login"), # login endpoint
]