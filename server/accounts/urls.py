from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('profile/<str:username>/', views.profile, name='profile'),
    path('wishlist/', views.wishlist, name='wishlist'),
    path('<int:user_pk>/follow/', views.follow, name='follow'),
    path('likemovie/<int:movie_pk>/', views.like_movie, name='like_movie'),
    path('dislikemovie/<int:movie_pk>/', views.dislike_movie, name='dislike_movie'),
    path('wishmovie/<int:movie_pk>/', views.wish_movie, name='wish_movie'),
    path('ranking/', views.ranking, name='ranking'),
    path('userlist/', views.userlist, name='userlist')
]