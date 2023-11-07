from django.urls import path
from .views import *




urlpatterns = [
    path('userchats/<int:pk>', userChatView.as_view()),
    path('messages/<int:pk>', getMessagesView.as_view()),
    path('signup/', SignUpView.as_view()),
    path('login', LoginView.as_view()),
    path("createchat", createChatView.as_view() ),
    path("update/avaorusername", setAvaOrName.as_view() ),
    path('finduser', getUsers.as_view())
]
