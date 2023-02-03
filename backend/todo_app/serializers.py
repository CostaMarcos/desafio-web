from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from todo_app.models import User, Task


class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(
      write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = User
    fields = ["id", "username", "email",  "password", "password2"]
    read_only_field = ["id"]

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError(
          {"password": "Password fields didn't match."})

    return attrs

  def create(self, validated_data):
    user = User.objects.create(
        email=validated_data['email'],
        username=validated_data['username']
    )

    user.set_password(validated_data['password'])
    user.save()

    return user


class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = ('id', 'description', 'due_date', 'status', 'created_by')
