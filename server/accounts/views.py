from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import RateMovie, User
from .serializers import UserSerializer, RateMovieSerializer
from movies.serializers import ReviewSerializer
from movies.models import Review, Actor, Director, Genre, Movie
from rest_framework import status

@api_view(['GET'])
def profile(request, username):
    User = get_user_model()
    person = User.objects.get(username=username)
    serializer = UserSerializer(person)
    review = Review.objects.filter(reviewer=person.pk)
    person.reviews_count = review.count()
    review_serializer = ReviewSerializer(review, many=True)
    likemovie = RateMovie.objects.filter(rateuser=person, state=1)
    lm_serializer = RateMovieSerializer(likemovie)
    context = {
        'profile': serializer.data,
        'reviews': review_serializer.data,
        'likemovies': lm_serializer.data,
    }
    return Response(context, status=status.HTTP_200_OK)

@api_view(['GET'])
def follow(request, user_pk):
    if request.user.is_authenticated:
        User = get_user_model()
        me = request.user
        you = User.objects.get(pk=user_pk)
        if me != you:
            # 내가(request.user) 그 사람의 팔로워 목록에 있다면
            # if me in you.followers.all():
            if you.followers.filter(pk=me.pk).exists():
                # 언팔로우
                you.followers.remove(me)
            else:
                # 팔로우
                you.followers.add(me)
        return redirect('accounts:profile', you.username)
    return Response({'follow'})

@api_view(['GET'])
def like_actor(request, actor_pk):
    me = request.user
    actor = Actor.objects.get(pk=actor_pk)
    if me.favorite_actors.filter(pk=actor.pk).exists():
        me.favorite_actors.remove(actor)
    else:
        me.favorite_actors.add(actor)
    return Response({'like actor'})

@api_view(['GET'])
def like_director(request, director_pk):
    me = request.user
    director = Director.objects.get(pk=director_pk)
    if me.favorite_directors.filter(pk=director.pk).exists():
        me.favorite_directors.remove(director)
    else:
        me.favorite_directors.add(director)
    return Response({'like director'})

@api_view(['GET'])
def like_genre(request, genre_pk):
    me = request.user
    genre = Genre.objects.get(pk=genre_pk)
    if me.favorite_genres.filter(pk=genre.pk).exists():
        me.favorite_genres.remove(genre)
    else:
        me.favorite_genres.add(genre)
    return Response({'like genre'})

@api_view(['GET'])
def like_movie(request, movie_pk):
    me = User.objects.get(pk=1)
    movie = Movie.objects.get(pk=movie_pk)
    if RateMovie.objects.filter(rateuser=me, ratedmovie=movie).exists():
        ratemovie = RateMovie.objects.get(rateuser=me, ratedmovie=movie)
        ratemovie.delete()
        return Response({'like delete'})
    else:
        rate_movie = RateMovie.objects.create(
            rateuser = me,
            ratedmovie = movie,
            title = movie.title,
            state = 1
        )
        print(rate_movie)
        return Response({'like add'})

@api_view(['GET'])
def dislike_movie(request, movie_pk):
    me = User.objects.get(pk=1)
    movie = Movie.objects.get(pk=movie_pk)
    if RateMovie.objects.filter(rateuser=me, ratedmovie=movie).exists():
        ratemovie = RateMovie.objects.get(rateuser=me, ratedmovie=movie)
        ratemovie.delete()
        return Response({'dislike delete'})
    else:
        rate_movie = RateMovie.objects.create(
            rateuser = me,
            ratedmovie = movie,
            title = movie.title,
            state = 2
        )
        print(rate_movie)
        return Response({'dislike add'})

def ranking(request):
    users = User.objects.order_by('-reviews_count')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)