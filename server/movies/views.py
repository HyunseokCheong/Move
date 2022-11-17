from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from .models import Movie, Review
from accounts.models import RateMovie, User
from .serializers import MovieSerializer, ReviewSerializer
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def index(request):
    movies = Movie.objects.order_by('-popularity')
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def review_create(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    user = request.user
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(reviewer=user, movies=movie)
        user.reviews_count += 1
        return Response(serializer.data)

@api_view(['POST'])
def review_delete(request, movie_pk, review_pk):
    user = request.user
    review = get_object_or_404(Review, pk=review_pk)
    if review.reviewer == user:
        review.delete()
        user.reviews_count -= 1
    return Response({'delete'})

@api_view(['GET'])
def actorport(request, actor_pk):
    # 배우의 출연영화
    casted_movie = Movie.objects.filter(actors=actor_pk).order_by('-popularity')
    serializer = MovieSerializer(casted_movie, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def directorport(request, director_pk):
    # 감독의 연출영화
    directed_movie = Movie.objects.filter(directors=director_pk).order_by('-popularity')
    serializer = MovieSerializer(directed_movie, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def genreport(request, genre_pk):
    # 해당장르의 인기영화
    directed_movie = Movie.objects.filter(genrers=genre_pk).order_by('-popularity')
    serializer = MovieSerializer(directed_movie, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def test(request):
    review = Review.objects.all()
    serializer_reviews = ReviewSerializer(review, many=True)
    return Response(serializer_reviews.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def recommend(request):
    user = User.objects.get(pk=1)
    # user = request.user
    recommendmovies = []
    cnt = 0
    exceptmovies = RateMovie.objects.filter(rateuser=user)
    for movie in Movie.objects.order_by('-popularity'):
        if movie not in exceptmovies:
            recommendmovies.append(movie)
            cnt + 1
        if cnt > 10:
            break
    print(recommendmovies)
