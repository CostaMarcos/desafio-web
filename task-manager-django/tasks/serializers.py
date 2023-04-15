from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
  """
  Serializer class to a object User 
  """
  class Meta:
    model = Task
    fields = ('id', 'title', 'description', 'due_date', 'status', 'user', 'created_at', 'updated_at')