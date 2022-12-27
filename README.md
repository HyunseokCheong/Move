# MOVE

## 목차

1. [개요](#1.개요)
2. [프로젝트 기간](#2.프로젝트_기간)
3. [기술 스택](#3.기술_스택)
4. [팀원](#4.팀원)
5. [DataBase 설계](#5.DataBase_설계)
6. [주요 기능](#6.주요_기능)

 <hr>

## 1. 개요

-   유저의 취향을 기반으로 영화 추천 서비스 제공
-   팔로우한 유저를 기반으로 영화 추천 서비스 제공
-   작성한 리뷰의 개수로 랭킹을 부여하는 커뮤니티 서비스 제공

## 2. 프로젝트 기간

-   2022년 11월 17일 ~ 2022년 11월 24일

## 3. 기술 스택

-   Framework : [Django 3.2.13](https://docs.djangoproject.com/en/4.1/releases/3.2.13/)
-   Framework : [Vue 2.7.14](https://github.com/vuejs/vue/releases)
-   API : [Naver Papago 번역](https://developers.naver.com/products/papago/nmt/nmt.md)
-   API : [TMDB 영화 조회](https://developers.themoviedb.org/3/movies/get-movie-details)
-   Language : [Python 3.10.6](https://www.python.org/downloads/release/python-3106/)
-   Database : [sqlite](https://www.sqlite.org/index.html)

## 4. 팀원

-   정현석 (팀장)
    -   Front-End
    -   화면 및 데이터 설계
-   김원웅 (팀원)
    -   Back-End
    -   DB 및 API 설계

## 5. DataBase 설계

![ERD](./readme_assets/ERD.png)

## 6. 주요 기능

-   로그인 / 회원가입
    ![로그인](./readme_assets/%0801_%EB%A1%9C%EA%B7%B8%EC%9D%B8.png)
    ![회원가입](./readme_assets/02_%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.png)
-   메인 페이지
    -   팝업
    ![메인](./readme_assets/03_%EB%A9%94%EC%9D%B8.png)
    ![팝업](./readme_assets/04_%EB%A9%94%EC%9D%B8_%ED%8C%9D%EC%97%85.png)
    -   팝업 좋아요/싫어요/찜하기
    ![팝업](./readme_assets/05_%EB%A9%94%EC%9D%B8_%ED%8C%9D%EC%97%85_%EC%A2%8B%EC%95%84%EC%9A%94.png)
    -   무비 디테일
    ![디테일](./readme_assets/06_%EB%94%94%ED%85%8C%EC%9D%BC.png)
    -   무비 디테일 좋아요/싫어요/찜하기
    -   무비 디테일 리뷰
    ![디테일](./readme_assets/07_%EB%94%94%ED%85%8C%EC%9D%BC_%EB%8C%93%EA%B8%80_%EC%9E%91%EC%84%B1.png)
    ![디테일](./readme_assets/08_%EB%94%94%ED%85%8C%EC%9D%BC_%EB%8C%93%EA%B8%80.png)
    -   무비 디테일 틴더로 이동
-   틴더
    -   틴더 좋아요/싫어요/찜하기
    ![틴더](./readme_assets/09_%EA%B0%90%EB%8F%85_%ED%8B%B4%EB%8D%94.png)
    -   틴더 선호 장르/배우/감독
-   랭킹
    ![랭킹](./readme_assets/10_%EB%9E%AD%ED%82%B9.png)
    -   유저 디테일로 이동
    -   팔로우
-   추천
    -   좋아요/싫어요/찜하기/롤백
    -   선호 장르 추가
-   마이 페이지로 이동
    ![마이페이지](./readme_assets/11_%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.png)
    -   프로필 사진 변경
    ![마이페이지](./readme_assets/12_%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80_%EC%82%AC%EC%A7%84%EB%B3%80%EA%B2%BD.png)
