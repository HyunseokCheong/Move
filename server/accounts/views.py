from django.shortcuts import get_object_or_404
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
    me = request.user
    person = User.objects.get(username=username)
    serializer = UserSerializer(person)
    review = Review.objects.filter(reviewer=person.pk)
    review_serializer = ReviewSerializer(review, many=True)
    likemovie = RateMovie.objects.filter(rateuser=person, state=1)
    lm_serializer = RateMovieSerializer(likemovie, many=True)
    is_following = 0
    if me.followings.filter(pk=person.pk).exists():
        is_following = 1
    context = {
        'profile': serializer.data,
        'reviews': review_serializer.data,
        'likemovies': lm_serializer.data,
        'is_following': is_following,
    }
    print(is_following)
    return Response(context, status=status.HTTP_200_OK)

@api_view(['GET'])
def follow(request, username):
    me = request.user
    person = User.objects.get(username=username)
    if me != person:
        if me.followings.filter(pk=person.pk).exists():
            # 언팔로우
            me.followings.remove(person)
        else:
            # 팔로우
            me.followings.add(person)
    return Response('okay')

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

@api_view(['POST'])
def like_movie(request, movie_pk):
    me = request.user
    print(me)
    print(movie_pk)
    movie = Movie.objects.get(pk=movie_pk)
    if RateMovie.objects.filter(rateuser=me, ratedmovie=movie).exists():
        ratemovie = RateMovie.objects.get(rateuser=me, ratedmovie=movie)
        if ratemovie.state == 1:
            ratemovie.delete()
            return Response({'like delete'})
        else:
            ratemovie.state = 1
            ratemovie.save()
            return Response({'like add'})
    else:
        rate_movie = RateMovie.objects.create(
            rateuser = me,
            ratedmovie = movie,
            title = movie.title,
            state = 1
        )
        return Response({'like add'})

@api_view(['POST'])
def dislike_movie(request, movie_pk):
    me = request.user
    movie = Movie.objects.get(pk=movie_pk)
    if RateMovie.objects.filter(rateuser=me, ratedmovie=movie).exists():
        ratemovie = RateMovie.objects.get(rateuser=me, ratedmovie=movie)
        if ratemovie.state == 2:
            ratemovie.delete()
            return Response({'dislike delete'})
        else:
            ratemovie.state = 2
            ratemovie.save()
            return Response({'dislike add'})
    else:
        rate_movie = RateMovie.objects.create(
            rateuser = me,
            ratedmovie = movie,
            title = movie.title,
            state = 2
        )
        return Response({'dislike add'})

@api_view(['POST'])
def wish_movie(request, movie_pk):
    me = request.user
    movie = Movie.objects.get(pk=movie_pk)
    if RateMovie.objects.filter(rateuser=me, ratedmovie=movie).exists():
        ratemovie = RateMovie.objects.get(rateuser=me, ratedmovie=movie)
        if ratemovie.state == 3:
            ratemovie.delete()
            return Response({'wish delete'})
        else:
            ratemovie.state = 3
            ratemovie.save()
            return Response({'wish add'})
    else:
        rate_movie = RateMovie.objects.create(
            rateuser = me,
            ratedmovie = movie,
            title = movie.title,
            state = 3
        )
        return Response({'wish add'})

@api_view(['GET'])
def ranking(request):
    users = User.objects.order_by('-reviews_count')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def userlist(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

