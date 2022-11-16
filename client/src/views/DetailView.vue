<template>
    <div>
        <h1>Detail</h1>
        <p>글 번호 : {{ movie?.id }}</p>
        <p>제목 : {{ movie?.title }}</p>
        <p>개봉일 : {{ movie?.release_date }}</p>
        <div v-if="movie">
            <img :src="poster_path" alt="..." />
        </div>
        <p>내용 : {{ movie?.overview }}</p>
        <hr />
        <div v-if="movie">
            <div
                v-for="(review, index) in movie.reviews"
                :key="index"
                :review="review"
            >
                {{ review.reviewer[0].username }} : {{ review.content }} :
                {{ review.rate }}
            </div>
        </div>

        <router-link :to="{ name: 'home' }">뒤로가기</router-link>
    </div>
</template>

<script>
export default {
    name: "DetailView",
    data() {
        return { movie: null };
    },
    computed: {
        movies() {
            return this.$store.state.movies;
        },
        poster_path() {
            return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${this.movie.poster_path}`;
            // return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.movie.poster_path}`;
        },
    },
    methods: {
        getMovieById(id) {
            for (const movie of this.movies) {
                if (movie.id === Number(id)) {
                    this.movie = movie;
                    break;
                }
            }
            // if (this.movie === null) {
            //     this.$router.push({ name: "NotFound404" });
            // }
        },
    },
    created() {
        this.getMovieById(this.$route.params.id);
    },
};
</script>
