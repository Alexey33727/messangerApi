from rest_framework import serializers
from rest_framework.validators import ValidationError
from rest_framework.authtoken.models import Token



from .models import *

class SenderSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'photo')

class userChatsSerializers(serializers.ModelSerializer):
    """Список чатов"""

    you = SenderSerializers( many=False, read_only=True )
    he = SenderSerializers( many=False, read_only=True )

    class Meta:
        model = userChats
        fields = '__all__'




#! User Serializer
class UserSerializers(serializers.ModelSerializer):
    """Список users"""
    class Meta:
        model = User
        fields = '__all__'

class MessagesSerializers(serializers.ModelSerializer):
    """Список сообщений"""

    sender = SenderSerializers( many=False, read_only=True )

    class Meta:
        model = Messages
        fields = '__all__'



#! Add

# class AddMessageSerializer(serializers.ModelSerializer):
#     chatId = serializers.IntegerField()
#     senderId = serializers.IntegerField()
#     senderAva = serializers.ImageField()
#     senderName = serializers.CharField(max_length=200)
#     text = serializers.CharField(max_length=100000)


#     class Meta:
#         model = Messages
#         fields = ['chatId', 'senderId', 'senderAva', 'senderName', 'text']






#! Register Serializer
class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.CharField( max_length=254)
    username = serializers.CharField(max_length=45)
    password = serializers.CharField(min_length=8, write_only=True)
    photo = serializers.ImageField()


    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'photo']

    def validate(self, attrs):

        email_exists=User.objects.filter(email=attrs['email']).exists()

        if email_exists:
            raise ValidationError('Email has already been used')

        return super().validate(attrs)
    def create(self, validated_data):
        password = validated_data.pop("password")

        user = super().create(validated_data)

        user.set_password(password)

        user.save()

        Token.objects.create(user=user)

        return user
