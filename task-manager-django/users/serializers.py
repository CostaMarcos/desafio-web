from rest_framework import serializers
from .models import User

class SignUpSerializer(serializers.ModelSerializer):
    """
    Serializer class to a object Sign Up, using model user as base
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        """
        Create user method
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user

class UserSerializer(serializers.ModelSerializer):
  """
  Serializer class to a object User 
  """
  class Meta:
    model = User
    fields = ["id", "username", "email", 'created_at', 'updated_at']
    read_only_field = ["id"]
