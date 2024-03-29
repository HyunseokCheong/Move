from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
User = settings.AUTH_USER_MODEL

class Genre(models.Model):
    name = models.CharField(max_length=50)

class Actor(models.Model):
    name = models.CharField(max_length=50)

class Director(models.Model):
    name = models.CharField(max_length=50)

class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    vote_average = models.FloatField()
    overview = models.TextField(blank=True)
    poster_path = models.CharField(max_length=200)
    backdrop_path = models.CharField(max_length=200)
    youtube_key = models.CharField(max_length=100)
    genres = models.ManyToManyField(Genre, blank=True, related_name='movies')
    actors = models.ManyToManyField(Actor, blank=True, related_name='movies')
    directors = models.ManyToManyField(Director, blank=True, related_name='movies')

class Review(models.Model):
    movies = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rate = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])