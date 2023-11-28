from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    """
    Custom user manager for the User model..
    """
    def create_user(self, email, username, password=None):
        """
        Creates a new user with the given email, username and password.
        """
        if not email:
            raise ValueError('Users should have a email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        # Hash password
        user.set_password(password)
        
        # Save user
        user.save(using=self._db)
        
        return user

    def create_superuser(self, email, username, password):
        """
        Create a new super user with the given email, username and password.
        """
        # create object user
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )

        user.is_superuser = True
        user.is_staff = True

        # Sace user
        user.save(using=self._db)

        return user
