from rest_framework import serializers
from .models import User, RateMovie
from movies.serializers import GenreSerializer, ActorSerializer, DirectorSerializer, MovieSerializer

class UserSerializer(serializers.ModelSerializer):
    favorite_genres = GenreSerializer(many=True)
    favorite_actors = ActorSerializer(many=True)
    favorite_directors = DirectorSerializer(many=True)
    
    class Meta:
        model = User
        fields = ('username', 'date_of_birth', 'followings', 'favorite_genres', 'favorite_actors', 'favorite_directors', 'reviews_count')

class RateMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = RateMovie
        fields = '__all__'
