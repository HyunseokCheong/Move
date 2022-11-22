<template>
    <div class="movie-review-area">
        <!-- 리뷰목록
        <hr>                            
        <div class="movie-reviews">
            <div class="movie-review" v-for="review in movie.movie.reviews" :key="review.reviewer">
                {{review.rate}}
                <img id="movie-star" src="@/assets/images/star.png">
                {{review.content}}
                <span>작성자 {{review.reviewer.username}}</span>
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
    name: "DetailReviewList",
    computed: {
        movie() {
            return this.$store.state.movie;
        },
        loggedInUser() {
            return this.$store.state.loggedInUser;
        },
    },
    created() {
        this.getMovieDetail(this.$route.params.id);
    },
    methods: {
        getMovieDetail() {
            this.$store.dispatch("getMovieDetail", this.$route.params.id)
        },
        DeleteReview(id) {
            axios({
                method: "post",
                url: `${API_URL}/movies/${this.$route.params.id}/delete/${id}/`,
                headers: {
                    Authorization: `Token ${this.$store.state.token}`,
                },
            })
                .then(() => {
                    this.$router.go();
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style></style>
