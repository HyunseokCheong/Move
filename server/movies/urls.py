from django.urls import path
from . import views_tmdb, views

app_name = 'movies'
urlpatterns = [
    path('tmdb/', views_tmdb.tmdb_data),
    path('', views.index),
    path('<int:movie_pk>/', views.detail, name="detail"),
    path('<int:movie_pk>/create/', views.review_create, name="review_create"),
    path('<int:movie_pk>/delete/<int:review_pk>/', views.review_delete, name="review_delete"),
    path('actor/<int:actor_pk>/', views.actorport, name="actorport"),
    path('director/<int:director_pk>/', views.directorport, name="directorport"),
    path('genre/<int:genre_pk>/', views.genreport, name="genreport"),
    path('recommend/', views.recommend, name="recommend"),
    path('search/', views.search, name="search"),
    path('random/', views.random, name="random"),
    path('liked_list/<str:username>/', views.liked_list, name="liked_list"),
    path('reviewed_list/<str:username>/', views.reviewed_list, name="reviewed_list"),
    path('wishlist/', views.wishlist, name='wishlist')
]

