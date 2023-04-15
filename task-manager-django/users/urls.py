
from django.urls import path
from .views import SignUpView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
user_urls = [
    # Resgister
    path('signup', SignUpView.as_view(), name="Signup"), # method POST, url: /signup
    # Auth 
    path('login', TokenObtainPairView.as_view(), name="Login"), # method POST, url: /login
    # Refresh token
    path('token/refresh', TokenRefreshView.as_view()) # method POST, url: token/refresh
]