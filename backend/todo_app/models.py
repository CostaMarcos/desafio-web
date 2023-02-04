from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)


class UserManager(BaseUserManager):
  def create_user(self, username, email, password=None, **kwargs):
    """Create and return a `User` with an email, username and password."""
    if username is None:
      raise TypeError("Users must have a username.")
    if email is None:
      raise TypeError("Users must have an email.")

    user = self.model(username=username, email=self.normalize_email(email))
    user.set_password(password)
    user.save(using=self._db)

    return user

  def create_superuser(self, username, email, password):
    """
    Create and return a `User` with superuser (admin) permissions.
    """
    if password is None:
      raise TypeError("Superusers must have a password.")
    if email is None:
      raise TypeError("Superusers must have an email.")
    if username is None:
      raise TypeError("Superusers must have an username.")

    user = self.create_user(username, email, password)
    user.is_superuser = True
    user.is_staff = True
    user.save(using=self._db)

    return


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
  username = models.CharField(
      db_index=True, unique=True, max_length=127)
  email = models.EmailField(db_index=True, unique=True)
  is_staff = models.BooleanField(default=False)

  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = ['email',]

  objects = UserManager()

  def __str__(self):
    return f"{self.username}"


class Task(models.Model):
  description = models.CharField(max_length=255)
  status = models.CharField(max_length=1)
  due_date = models.DateField()
  created_by = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return f"{self.description}"
