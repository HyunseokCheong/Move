from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer
from movies.serializers import ReviewSerializer
from movies.models import Review, Actor, Director, Genre




@api_view(['GET'])
def profile(request, username):
    User = get_user_model()
    person = User.objects.get(username=username)
    serializer = UserSerializer(person)
    review = Review.objects.filter(reviewer=person.pk)
    review_serializer = ReviewSerializer(review, many=True)
    context = {
        'profile': serializer.data,
        'reviews': review_serializer.data,
    }
    return Response(context)

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
    return redirect('accounts:login')

@api_view(['GET'])
def like_actor(request, actor_pk):
    me = request.user
    actor = Actor.objects.get(pk=actor_pk)
    if me.favorite_actors.filter(pk=actor.pk).exists():
        me.favorite_actors.remove(actor)
    else:
        me.favorite_actors.add(actor)
    return redirect('accounts:profile', me.username)

@api_view(['GET'])
def like_director(request, director_pk):
    me = request.user
    director = Director.objects.get(pk=director_pk)
    if me.favorite_directors.filter(pk=director.pk).exists():
        me.favorite_directors.remove(director)
    else:
        me.favorite_directors.add(director)
    return redirect('accounts:profile', me.username)

@api_view(['GET'])
def like_genre(request, genre_pk):
    me = request.user
    genre = Genre.objects.get(pk=genre_pk)
    if me.favorite_genres.filter(pk=genre.pk).exists():
        me.favorite_genres.remove(genre)
    else:
        me.favorite_genres.add(genre)
    return redirect('accounts:profile', me.username)



