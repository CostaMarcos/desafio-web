from rest_framework import generics
from .serializers import SignUpSerializer

class SignUpView(generics.CreateAPIView):
    """
    Sign up view
    """
    serializer_class = SignUpSerializer
    
