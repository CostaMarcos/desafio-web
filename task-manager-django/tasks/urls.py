
from django.urls import path
from .views import TaskView, TaskDeleteView

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
task_urls = [
    path('tasks', TaskView.as_view()),
    path('tasks/<int:task_id>', TaskDeleteView.as_view())
]