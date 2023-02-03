from django.urls import include, path
from todo_app.views import UserViewSet, TaskListViewSet, TaskDetailApiView

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('register/', UserViewSet.as_view({'post': 'create'})),
    path('tasks/', TaskListViewSet.as_view()),
    path('tasks/<int:task_id>', TaskDetailApiView.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
