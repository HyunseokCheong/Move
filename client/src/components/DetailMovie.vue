<template>
    <div>
        <div v-if="movie">
            <p>제목 : {{ movie.title }}</p>
            <p>개봉일 : {{ movie.release_date }}</p>
            <img :src="poster_path" alt="..." />
            <p>내용 : {{ movie.overview }}</p>
            <div v-for="director in directors" :key="director.id">
                {{ director.name }}
            </div>
            <div v-for="genre in genres" :key="genre.id">
                {{ genre.name }}
            </div>
            <div v-for="actor in actors" :key="actor.id">
                {{ actor.name }}
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
            movie: null,
            directors: [],
            genres: [],
            actors: [],
        };
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
                    this.movie = res.data;
                    this.reviews = res.data.reviews;
                    this.directors = res.data.directors;
                    this.genres = res.data.genres;
                    this.actors = res.data.actors;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    computed: {
        poster_path() {
            return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${this.movie.poster_path}`;
        },
    },
};
</script>

<style></style>
