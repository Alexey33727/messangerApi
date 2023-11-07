from django.contrib.auth.base_user import BaseUserManager



class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, photo, **extra_fields):
        email = self.normalize_email(email)


        user = self.model(
            email=email,
            photo=photo,
            **extra_fields
        )


        user.set_password(password)
        user.save()


        return user


    def create_superuser(self, email, password, photo=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)


        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser has to have is_staff being True')
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser has to have is_superuser being True')
        
        return self.create_user(email=email, password=password, photo=photo, **extra_fields)
