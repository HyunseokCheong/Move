from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from .models import Movie, Review, Genre, Director, Actor
from accounts.models import RateMovie, User
from .serializers import MovieSerializer, ReviewSerializer
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

@api_view(['GET'])
def index(request):
    movies = Movie.objects.filter(vote_count__gte=1000, vote_average__gte=7).order_by('?')
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    me = request.user
    state = 0
    if RateMovie.objects.filter(rateuser=me.id, ratedmovie=movie).exists():
        state = RateMovie.objects.get(rateuser=me, ratedmovie=movie).state
    context = {
        'movie': serializer.data,
        'state': state
    }
    return Response(context, status=status.HTTP_200_OK)
    

@api_view(['POST'])
def review_create(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    user = request.user
    user.reviews_count += 1
    user.save()
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(reviewer=user, movies=movie)
        return Response(serializer.data)

@api_view(['POST'])
def review_delete(request, movie_pk, review_pk):
    user = request.user
    review = get_object_or_404(Review, pk=review_pk)
    if review.reviewer == user:
        review.delete()
        user.reviews_count -= 1
        user.save()
    return Response({'delete'})

@api_view(['GET'])
def reviewed_list(request, user_pk):
    user = get_object_or_404(User, pk=user_pk)
    reviews = Review.objects.filter(reviewer=user)
    movies = []
    for review in reviews:
        movies.append(review.movies.id)
    reviewd_movies = Movie.objects.filter(pk__in=movies)
    reviewd_movies_serializer = MovieSerializer(reviewd_movies, many=True)
    return Response(reviewd_movies_serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def genreport(request, genre_pk):
    # 해당장르의 인기영화
    genre_movie = Movie.objects.filter(genres=genre_pk, vote_count__gte=1000, vote_average__gte=7).order_by('?')
    genre_name = Genre.objects.get(pk=genre_pk).name
    serializer = MovieSerializer(genre_movie, many=True)
    context = {
        'movie': serializer.data,
        'name': genre_name,
    }
    return Response(context, status=status.HTTP_200_OK)

@api_view(['GET'])
def directorport(request, director_pk):
    # 감독의 연출영화
    directed_movie = Movie.objects.filter(directors=director_pk).order_by('?')
    director_name = Director.objects.get(pk=director_pk).name
    serializer = MovieSerializer(directed_movie, many=True)
    context = {
        'movie': serializer.data,
        'name': director_name,
    }
    return Response(context, status=status.HTTP_200_OK)

@api_view(['GET'])
def actorport(request, actor_pk):
    # 배우의 출연영화
    casted_movie = Movie.objects.filter(actors=actor_pk).order_by('?')
    actor_name = Actor.objects.get(pk=actor_pk).name
    serializer = MovieSerializer(casted_movie, many=True)
    context = {
        'movie': serializer.data,
        'name': actor_name,
    }
    return Response(context, status=status.HTTP_200_OK)

@api_view(['GET'])
def recommend(request):
    user = User.objects.get(pk=1)
    # user = request.user
    excepts = []
    follows = []
    actors = []
    directors = []
    recommends = []
    
    exceptmovies = RateMovie.objects.filter(rateuser=user)
    for exceptmovie in exceptmovies:
        excepts.append(exceptmovie.ratedmovie.id)
    for following in user.followings.all():
        follow_like_movies = RateMovie.objects.filter(rateuser=following,state=1)
        for fl_lk_mv in follow_like_movies:
            if fl_lk_mv.ratedmovie.id not in follows:
                follows.append(fl_lk_mv.ratedmovie.id)
    for actor in user.favorite_actors.all():
        actors.append(actor.id)
    for director in user.favorite_directors.all():
       directors.append(director.id)
    rec_movies = Movie.objects.filter(~Q(id__in=excepts) & (Q(id__in=follows) | Q(actors__in=actors) | Q(directors__in=directors))).distinct()
    rec = rec_movies.count()
    if rec < 30:
        num = 30 - rec
        for rec_movie in rec_movies:
            recommends.append(rec_movie.id)
        for leftmovie in Movie.objects.filter(~Q(id__in=excepts) & ~Q(id__in=follows) & ~Q(actors__in=actors) & ~Q(directors__in=directors)).order_by('-popularity')[:num]:
            recommends.append(leftmovie.id)
        rec_movies = Movie.objects.filter(Q(id__in=recommends)).order_by('?')
    serializer_recommend = MovieSerializer(rec_movies, many=True)
    return Response(serializer_recommend.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def search(request):
    keyword = request.data.get('keyword')
    movies = Movie.objects.filter(
        Q(title__contains=keyword) |
        Q(actors__name__contains=keyword) |
        Q(directors__name__contains=keyword)
    ).distinct().order_by('-popularity')
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
def random(request):
    random_genre = Genre.objects.order_by('?')[0]
    # 연출한 영화가 6개 이상인 감독중 무작위
    random_directors = []
    for director in Director.objects.all():
        if director.movies.count() >= 6:
            random_directors.append(director.id)
    random_director = Director.objects.filter(id__in=random_directors).order_by('?')[0]
    # 출연한 영화가 6개 이상인 배우중 무작위
    random_actors = []
    for actor in Actor.objects.all():
        if actor.movies.count() >= 6:
            random_actors.append(actor.id)
    random_actor = Actor.objects.filter(id__in=random_actors).order_by('?')[0]

    genre_random = Movie.objects.filter(genres=random_genre).order_by('?')[:10]
    director_random = Movie.objects.filter(directors=random_director).order_by('?')
    actor_random = Movie.objects.filter(actors=random_actor).order_by('?')
    genre_serializer = MovieSerializer(genre_random, many=True)
    director_serializer = MovieSerializer(director_random, many=True)
    actor_serializer = MovieSerializer(actor_random, many=True)
    context = {
        'genre': genre_serializer.data,
        'genre_name': random_genre.name,
        'director': director_serializer.data,
        'director_name': random_director.name,   
        'actor': actor_serializer.data,
        'actor_name': random_actor.name,  
    }
    return Response(context, status=status.HTTP_200_OK)

