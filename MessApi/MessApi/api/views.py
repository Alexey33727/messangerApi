from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.request import Request
from django.contrib.auth import authenticate, logout
from rest_framework import permissions
import numpy as np



from . import models
from . import srerializers
from . import tokens

# Create your views here.

class setAvaOrName(generics.UpdateAPIView):
    def post(self, request:Request):
        id = request.data.get('id')
        username = request.data.get('username')
        photo = request.FILES.get('photo')
        
        you = models.User.objects.get(pk=id)
        if username != None:
            you.username = username
        if photo != None:
            you.photo = photo
        you.save()

        res = {
            "message": "avatar and username have been successfully updated"
        }
        return Response(data=res, status=status.HTTP_200_OK)

class createChatView(APIView):
    def post(self, request:Request):
        yourId = request.data.get('yourId')
        fromId = request.data.get('fromId')
        lastMessage = request.data.get('lastMessage')
        chatId = yourId + fromId
        chat = models.userChats.objects.create(
            chatId=chatId, 
            yourId=yourId, 
            fromId=fromId, 
            lastMessage=lastMessage,
            you_id=yourId,
            he_id=fromId
            )
        chat.save()
        chatRes = srerializers.userChatsSerializers(chat,  many=False)
        return Response(data=chatRes.data, status=status.HTTP_201_CREATED)

class userChatView(generics.ListAPIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        userchats1 = models.userChats.objects.filter(yourId=pk)
        userchats2 = models.userChats.objects.filter(fromId=pk)
        userchats = np.concatenate([userchats1, userchats2])
        srerializer = srerializers.userChatsSerializers(userchats,  many=True)
        return Response(data=srerializer.data, status=status.HTTP_200_OK)


class getMessagesView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        mess = models.Messages.objects.filter(chatId=pk)
        srerializer = srerializers.MessagesSerializers(mess, many=True)
        return Response(data=srerializer.data, status=status.HTTP_200_OK)
    def post(self, request:Request, pk):
        chatId = pk
        sender = request.data.get('sender') 
        file = request.data.get('file')
        fileName = request.data.get('fileName')
        text = request.data.get('text')
        img = request.data.get('img')
        message = models.Messages.objects.create( fileName=fileName, file=file, img=img, chatId=chatId, sender_id=sender, text=text)
        message.save()
        mess = {
            "header":"Message created successfully",
            "sender":str(sender),
            "img":str(img),
            "file": str(file),
            "fileName": str(fileName),
            "chatId":str(chatId),
        }
        return Response(data=mess, status=status.HTTP_201_CREATED)


class getUsers(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    def post(self, request:Request):
        finder = request.data.get('finder')
        found = models.User.objects.filter(username=finder)
        srerializer = srerializers.UserSerializers(found, many=True)
        return Response(srerializer.data, status=status.HTTP_200_OK)
        
    


class SignUpView(generics.GenericAPIView):
    serializer_class = srerializers.SignUpSerializer
    permission_classes = []

    def post(self, request: Request):
        data = request.data

        srerializer = self.serializer_class(data=data)

        if srerializer.is_valid():
            srerializer.save()

            response = {
                "message": "User Created Successfully",
                "data": srerializer.data
            }

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=srerializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = []

    def post(self, request: Request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)

        if user is not None:
            token = tokens.create_jwt_pair_for_user(user)
            response = {
                "message":"Login Successfull",
                "token": token
            }
            return Response(data=response, status=status.HTTP_200_OK)
        else: 
            return Response(data={"message":"Invalid email or password"})

    def get(self, request: Request):
        if request.auth != None:
            content = {
                "user_email": str(request.user.email),
                "user_photo": f"media/{request.user.photo}",
                "user_id": str(request.user.id),
                "user_name": str(request.user.username),
                "user_is_super":request.user.is_superuser,
                "auth": str(request.auth),
            }
        else:
            content = {
                "user": str(request.user),
                "auth": str(request.auth),
            }
        return Response(data=content, status=status.HTTP_200_OK)



# class AddMessage(generics.GenericAPIView):
#     serializer_class = srerializers.AddMessageSerializer
