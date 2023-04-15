from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .serializers import TaskSerializer
from .models import Task
from rest_framework import status

class TaskDeleteView(APIView):
    """
    TaskDeleteView for http method [delete]
    """
    
    # Authentication required
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, task_id):
        """
        Delete task by id

        Args:
            self: (TaskDeleteView) object
            request: (HttpResquest) object representing the user's request.
            task_id: (int) task_id for find and delete Task

        Returns:
            HttpResponse: an HTTP response containing the status code of the request
        """
        task = Task.objects.get(id=task_id, user=request.user.id)

        # Not found
        if (not task):
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

        task.delete()

        return Response(None, status=status.HTTP_200_OK)


class TaskView(APIView):
    """
    TaskView for http methods [POST, GET, PUT]
    """

    # Authentication required
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        """
        Get tasks by user id

        Args:
            self: (TaskView) object
            request: (HttpResquest) object representing the user's request.

        Returns:
            HttpResponse: An HTTP response containing tasks list by authenticated user and status code of the request
        """
        tasks = Task.objects.filter(user=request.user.id)
        task_serializer = TaskSerializer(tasks, many=True)

        return Response(task_serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        """
        Create a new task

        Args:
            self: (TaskView) object
            request: (HttpResquest) object representing the user's request.

        Returns:
            HttpResponse: An HTTP response containing (created task data or errors message) and status code of the request
        """

        # Request data
        taskData = {
            'title': request.data.get('title'),
            'description': request.data.get('description'),
            'due_date': request.data.get('due_date'),
            'status': "ToDo",
            'user': request.user.id
        }

        task_serializer = TaskSerializer(data=taskData)
        
        # Validate
        if task_serializer.is_valid():
            task_serializer.save()
            return Response(task_serializer.data, status=status.HTTP_201_CREATED)

        return Response(task_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request):
        """
        Update a task object

        Args:
            self: (TaskView) object
            request: (HttpResquest) object representing the user's request.

        Returns:
            HttpResponse: An HTTP response containing (created task data or errors message) and status code of the request
        """

        # Veriy if task already registered
        task_id = request.data.get('id')
        instance = Task.objects.get(id=task_id)
        
        # Request data
        taskData = {
            'id': request.data.get('id'),
            'title': request.data.get('title'),
            'description': request.data.get('description'),
            'status': request.data.get('status'),
            'due_date': request.data.get('due_date'),
            'user': request.user.id
        }

        task_serializer = TaskSerializer(instance, data=taskData)

        # validate
        if task_serializer.is_valid():
            task_serializer.save()
            return Response(task_serializer.data, status=status.HTTP_200_OK)

        return Response(task_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
