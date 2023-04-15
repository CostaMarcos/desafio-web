from django.contrib import admin
from .models import Task

# Register Task model on Admin
admin.site.register(Task)