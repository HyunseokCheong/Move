from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('profile/<str:username>/', views.profile, name='profile'),
    # path('<int:user_pk>/recommend/', views.recommend, name='recommend'),
    path('<int:user_pk>/follow/', views.follow, name='follow'),
]
