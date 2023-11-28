from django.db import models
from users.models import User

# Create your models here.

class Task(models.Model):
    """
    Representation of the Task entity
    """
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=60, null=False, blank=False)
    description = models.TextField(max_length=300, blank=True)
    due_date = models.DateField(null=True)
    status = models.CharField(max_length=30, null=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
