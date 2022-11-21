<template>
    <div>
        <div v-if="isLogin">
            <div v-if="state == 0">
                <button @click="like()">좋아요</button>
                <button @click="dislike()">싫어요</button>
                <button @click="addWishList()">찜하기</button>
            </div>
            <div v-if="state == 1">
                <button @click="like()">좋아요 취소</button>
                <button @click="dislike()">싫어요</button>
                <button @click="addWishList()">찜하기</button>
            </div>
            <div v-if="state == 2">
                <button @click="like()">좋아요</button>
                <button @click="dislike()">싫어요 취소</button>
                <button @click="addWishList()">찜하기</button>
            </div>
            <div v-if="state == 3">
                <button @click="like()">좋아요</button>
                <button @click="dislike()">싫어요</button>
                <button @click="addWishList()">찜하기 취소</button>
            </div>
        </div>
        <div v-else>로그인해서 영화 평가하기</div>
        <div v-if="movie">
            <p>제목 : {{ movie.title }}</p>
            <p>개봉일 : {{ movie.release_date }}</p>
            <img :src="poster_path" alt="poster" />
            <img :src="backdrop_path" alt="backdrop" />
            <p>내용 : {{ movie.overview }}</p>
            <div>
                <span>감독</span>
                <div v-for="director in directors" :key="director.id">
                    <router-link
                        :to="{
                            name: 'director',
                            params: { id: director.id, name: director.name },
                        }"
                        tag="span"
                    >
                        {{ director.name }}
                    </router-link>
                </div>
            </div>
            <div>
                <span>장르</span>
                <div v-for="genre in genres" :key="genre.id">
                    <router-link
                        :to="{ name: 'genre', params: { id: genre.id } }"
                        tag="span"
                    >
                        {{ genre.name }}
                    </router-link>
                </div>
            </div>
            <div>
                <span>배우</span>
                <div v-for="actor in actors" :key="actor.id">
                    <router-link
                        :to="{ name: 'actor', params: { id: actor.id } }"
                        tag="span"
                    >
                        {{ actor.name }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default {
    name: "DetailMovie",
    data() {
        return {
            state: null,
            movie: null,
            directors: [],
            genres: [],
            actors: [],
        };
    },
    computed: {
        poster_path() {
            return `https://www.themoviedb.org/t/p/original${this.movie.poster_path}`;
        },
        backdrop_path() {
            return `https://www.themoviedb.org/t/p/original${this.movie.backdrop_path}`;
        },
        isLogin() {
            return this.$store.getters.isLogin;
        },
        userName() {
            return this.$store.state.loggedInUser;
        },
    },
    created() {
        this.getMovieDetail(this.$route.params.id);
    },
    methods: {
        getMovieDetail() {
            axios({
                url: `${API_URL}/movies/${this.$route.params.id}`,
            })
                .then((res) => {
                    this.movie = res.data.movie;
                    this.reviews = res.data.movie.reviews;
                    this.directors = res.data.movie.directors;
                    this.genres = res.data.movie.genres;
                    this.actors = res.data.movie.actors;
                    this.state = res.data.state;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        like() {
            this.$store.dispatch("movieLike", this.movie.id);
            this.$router.go();
        },
        dislike() {
            this.$store.dispatch("movieDislike", this.movie.id);
            this.$router.go();
        },
        addWishList() {
            this.$store.dispatch("movieWish", this.movie.id);
            this.$router.go();
        },
    },
};
</script>

<style></style>
