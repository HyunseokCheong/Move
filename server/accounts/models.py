from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Genre, Actor, Director
# Create your models here.
class User(AbstractUser):
    date_of_birth = models.DateField(blank=True, null=True)
    rank = models.IntegerField(default=1)
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    favorite_genres = models.ManyToManyField(Genre, blank=True, symmetrical=False, related_name='user')
    favorite_actors = models.ManyToManyField(Actor, blank=True, symmetrical=False, related_name='user')
    favorite_directors = models.ManyToManyField(Director, blank=True, symmetrical=False, related_name='user')
    