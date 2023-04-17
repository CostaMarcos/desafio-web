from rest_framework import generics, permissions
from .serializers import SignUpSerializer

class SignUpView(generics.CreateAPIView):
    """
    Sign up view
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = SignUpSerializer
    
