from django.http import JsonResponse, HttpResponse
import requests, urllib.request, json
from .models import Genre, Movie, Actor, Director

API_KEY = '2f838d7eacf38adb7504971b083228bf'
GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list'
POPULAR_MOVIE_URL = 'https://api.themoviedb.org/3/movie/popular'
CLIENT_ID = 'xmDJGcXpIFNrLeWkL49T'
CLIENT_SECRET = 'ztZxi3PlsI'

def translation(word):      # 네이버 파파고 api를 이용한 영어 -> 한글 번역
    encText = urllib.parse.quote(word)
    data = "source=en&target=ko&text=" + encText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",CLIENT_ID)
    request.add_header("X-Naver-Client-Secret",CLIENT_SECRET)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read()
        res = json.loads(response_body.decode('utf-8'))['message']['result']['translatedText']
        return res
    else:
        return ("Error Code:" + rescode)

def tmdb_genres():
    response = requests.get(
        GENRE_URL,
        params={
            'api_key': API_KEY,
            'language': 'ko-KR',            
        }
    ).json()    
    for genre in response.get('genres'):
        if Genre.objects.filter(pk=genre['id']).exists(): continue        
        Genre.objects.create(
            id=genre['id'],
            name=genre['name'],
        )
    return JsonResponse(response)
def get_youtube_key(movie_dict):    
    movie_id = movie_dict.get('id')
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}/videos',
        params={
            'api_key': API_KEY
        }
    ).json()
    for video in response.get('results'):
        if video.get('site') == 'YouTube':
            return video.get('key')    
    return 'nothing'

def movie_data(page=1):
    response = requests.get(
        POPULAR_MOVIE_URL,
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',     
            'page': page,       
        }
    ).json()

    for movie_dict in response.get('results'):
        if not movie_dict.get('release_date'): continue # 없는 필드 skip
        if not movie_dict.get('backdrop_path'): continue
        # 유투브 key 조회
        youtube_key = get_youtube_key(movie_dict)
        if youtube_key == 'nothing': continue
        if not Movie.objects.filter(id=movie_dict.get('id')).exists():
            movie = Movie.objects.create(
                id=movie_dict.get('id'),
                title=movie_dict.get('title'),
                release_date=movie_dict.get('release_date'),
                popularity=movie_dict.get('popularity'),
                vote_count=movie_dict.get('vote_count'),
                vote_average=movie_dict.get('vote_average'),
                overview=movie_dict.get('overview'),
                poster_path=movie_dict.get('poster_path'),
                backdrop_path=movie_dict.get('backdrop_path'),
                youtube_key=youtube_key, 
            )
            for genre_id in movie_dict.get('genre_ids', []):
                movie.genres.add(genre_id)

            # 제작진 저장
            get_cast(movie)
            print('>>>', movie.title, '==>', movie.youtube_key) 

def get_cast(movie):
    movie_id = movie.id
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}/credits',
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',
        }
    ).json()
    
    for person in response.get('cast'):
        if person.get('known_for_department') == 'Acting': 
            actor_id = person.get('id')
            if not Actor.objects.filter(pk=actor_id).exists():
                actor = Actor.objects.create(
                    id=person.get('id'),
                    # name=person.get('name'),
                    name=translation(person.get('name')),   # 배우 이름 번역
                )
            movie.actors.add(actor_id)
            if movie.actors.count() == 5:       # 5명의 배우 정보만 저장
                break
    for person in response.get('crew'):
        if person.get('job') == 'Director': 
            director_id = person.get('id')
            if not Director.objects.filter(pk=director_id).exists():
                director = Director.objects.create(
                    id=person.get('id'),
                    # name=person.get('name'),
                    name=translation(person.get('name')),   # 감독 이름 번역
                )
            movie.directors.add(director_id)

       
def tmdb_data(request):
    # Genre.objects.all().delete()
    # Actor.objects.all().delete()
    # Director.objects.all().delete()
    # Movie.objects.all().delete()
    tmdb_genres()
    for i in range(1, 60):
        movie_data(i)
    return HttpResponse('OK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')