<template>
    <div>
        <div v-if="movie">
            <!-- <p>제목 : {{ movie.title }}</p>
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
            </div> -->
            <hr />
            <div>
                <h1>리뷰 작성</h1>
                <form @submit.prevent="createReview">
                    <label for="content">내용: </label>
                    <textarea
                        id="content"
                        cols="30"
                        rows="10"
                        v-model="content"
                    ></textarea>
                    <label for="rate">평점 : 0 ~ 5</label>
                    <input
                        type="number"
                        min="0"
                        max="5"
                        id="rate"
                        v-model="rate"
                    />
                    <input type="submit" value="제출" />
                </form>
            </div>
            <div v-for="review in reviews" :key="review.id" class="col-sector">
                {{ review }}
                <br />
                {{ review.reviewer[0].username }}
                {{ review.content }}
                {{ review.rate }}
            </div>
        </div>
        <router-link :to="{ name: 'home' }">뒤로가기</router-link>
    </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
    name: "DetailView",
    data() {
        return {
            movie: null,
            directors: [],
            genres: [],
            actors: [],
            reviews: [],
            reviewer: null,
            content: null,
            rate: null,
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
        createReview() {
            //
            const movies = this.movie;
            const reviewer = this.reviewer;
            const content = this.content;
            const rate = this.rate;
            console.log(`Token ${this.$store.state.token}`);
            if (!content) {
                alert("내용을 입력해주세요");
                return;
            } else if (!rate) {
                alert("평점을 입력해주세요");
                return;
            }
            axios({
                method: "post",
                url: `${API_URL}/movies/${this.movie.id}/create/`,
                data: {
                    //
                    movies: movies,
                    reviewer: reviewer,
                    content: content,
                    rate: rate,
                },
                headers: {
                    Authorization: `Token ${this.$store.state.token}`,
                },
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.log(err));
        },
    },
    computed: {
        poster_path() {
            return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${this.movie.poster_path}`;
        },
    },
};
</script>
