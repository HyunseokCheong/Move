from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('profile/<str:username>/', views.profile, name='profile'),
    path('follow/<str:username>/', views.follow, name='follow'),
    path('likegenre/<int:genre_pk>/', views.like_genre, name="likegenre"),
    path('likedirector/<int:director_pk>/', views.like_director, name="likedirector"),
    path('likeactor/<int:actor_pk>/', views.like_actor, name="likeactor"),
    path('likemovie/<int:movie_pk>/', views.like_movie, name='like_movie'),
    path('dislikemovie/<int:movie_pk>/', views.dislike_movie, name='dislike_movie'),
    path('wishmovie/<int:movie_pk>/', views.wish_movie, name='wish_movie'),
    path('ranking/', views.ranking, name='ranking'),
]