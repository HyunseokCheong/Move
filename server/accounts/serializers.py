from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.serializers import GenreSerializer, ActorSerializer, DirectorSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    favorite_genres = GenreSerializer(many=True)
    favorite_actors = ActorSerializer(many=True)
    favorite_directors = DirectorSerializer(many=True)
    
    class Meta:
        model = User
        fields = ('username', 'date_of_birth', 'followings', 'favorite_genres', 'favorite_actors', 'favorite_directors')





