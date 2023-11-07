from django.contrib.auth.models import *
from django.db import models
from django.urls import *

from .manager import CustomUserManager


class User(AbstractUser):
    photo = models.ImageField(null=True, upload_to="files/avas")
    email = models.EmailField(unique=True, max_length=254)
    username = models.CharField(max_length=45)


    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

class userChats(models.Model):
    chatId = models.IntegerField(unique=True)
    yourId = models.IntegerField()
    fromId = models.IntegerField()
    you = models.ForeignKey(User, related_name='you', on_delete=models.PROTECT, null=True)
    he = models.ForeignKey(User, related_name='he',  on_delete=models.PROTECT, null=True)
    lastMessage = models.CharField(max_length=200)
    

# class Messages(models.Model):
#     chatId = models.IntegerField(null=True)
#     senderId = models.IntegerField(null=True)
#     senderAva = models.ImageField(null=True)
#     senderName = models.CharField(max_length=200, null=True)
#     text = models.CharField(max_length=100000)
#     img = models.ImageField(null=True)
#     file = models.FileField(upload_to='files/files', null=True)
#     fileName = models.CharField(max_length=200, null=True)
#     dateAndTime = models.DateTimeField(auto_now_add=True)
class Messages(models.Model):
    chatId = models.IntegerField()
    sender = models.ForeignKey(User, on_delete=models.PROTECT, related_name='sender', null=True )
    text = models.CharField(max_length=100000)
    img = models.ImageField(null=True)
    file = models.FileField(upload_to='files/files', null=True)
    fileName = models.CharField(max_length=200, null=True)
    dateAndTime = models.DateTimeField(auto_now_add=True)