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
    fromAva = models.ImageField()
    yourAva = models.ImageField()
    lastMessage = models.CharField(max_length=200)
    fromName = models.CharField(max_length=200)
    yourName = models.CharField(max_length=200)
    

class Messages(models.Model):
    chatId = models.IntegerField()
    senderId = models.IntegerField()
    senderAva = models.ImageField()
    senderName = models.CharField(max_length=200)
    text = models.CharField(max_length=100000)
    dateAndTime = models.DateTimeField(auto_now_add=True)