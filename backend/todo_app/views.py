from todo_app.serializers import RegisterSerializer, UserSerializer, TaskSerializer
from todo_app.models import User, Task
from rest_framework import viewsets, status, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterViewSet(
    viewsets.GenericViewSet, mixins.CreateModelMixin
):
  serializer_class = RegisterSerializer

  def create(self, request, *args, **kwargs):
    partial = kwargs.pop("partial", False)
    serializer = self.get_serializer(data=request.data, partial=partial)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)

    user = User.objects.get(id=serializer.data['id'])
    refresh = RefreshToken.for_user(user)

    data = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    return Response(data, status=status.HTTP_200_OK)


class UserViewSet(RetrieveAPIView):
  queryset = User.objects.all()
  permission_classes = [IsAuthenticated]
  serializer_class = UserSerializer


class TaskListViewSet(APIView):
    # add permission to check if user is authenticated
  permission_classes = [IsAuthenticated]

  # 1. List all
  def get(self, request, *args, **kwargs):
    '''
    List all the todo items for given requested user
    '''
    tasks = Task.objects.filter(created_by=request.user.id)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  # 2. Create
  def post(self, request, *args, **kwargs):
    '''
    Create the Todo with given todo data
    '''
    data = {
        'description': request.data.get('description'),
        'due_date': request.data.get('due_date'),
        'status': request.data.get('status'),
        'created_by': request.user.id
    }
    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetailApiView(APIView):
    # add permission to check if user is authenticated
  permission_classes = [IsAuthenticated]

  def get_object(self, task_id, user_id):
    '''
    Helper method to get the object with given task_id, and user_id
    '''
    try:
      return Task.objects.get(id=task_id, created_by=user_id)
    except Task.DoesNotExist:
      return None

  # 3. Retrieve
  def get(self, request, task_id, *args, **kwargs):
    '''
    Retrieves the Task with given task_id
    '''
    task_instance = self.get_object(task_id, request.user.id)
    if not task_instance:
      return Response(
          {"res": "Object with task id does not exists"},
          status=status.HTTP_400_BAD_REQUEST
      )

    serializer = TaskSerializer(task_instance)
    return Response(serializer.data, status=status.HTTP_200_OK)

  # 4. Update
  def put(self, request, task_id, *args, **kwargs):
    '''
    Updates the task item with given task_id if exists
    '''
    task_instance = self.get_object(task_id, request.user.id)
    if not task_instance:
      return Response(
          {"res": "Object with task id does not exists"},
          status=status.HTTP_400_BAD_REQUEST
      )
    data = {
        'description': request.data.get('description'),
        'status': request.data.get('status'),
        'due_date': request.data.get('due_date'),
        'created_by': request.user.id
    }
    serializer = TaskSerializer(
        instance=task_instance, data=data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  # 5. Delete
  def delete(self, request, task_id, *args, **kwargs):
    '''
    Deletes the task item with given task_id if exists
    '''
    task_instance = self.get_object(task_id, request.user.id)
    if not task_instance:
      return Response(
          {"res": "Object with task id does not exists"},
          status=status.HTTP_400_BAD_REQUEST
      )
    task_instance.delete()
    return Response(
        {"res": "Object deleted!"},
        status=status.HTTP_200_OK
    )
