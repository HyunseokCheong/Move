<template>
    <div class="movie-review-area">
        <div class="movie-reviews-box">
            <div class="movie-reviews">
                <div
                    class="movie-review"
                    v-for="review in reviews.slice().reverse()"
                    :key="`01-${review.id}`"
                >
                    <div class="movie-review-left">
                        <img
                            :src="profile_image"
                            alt="..."
                            width="40"
                            height="40"
                            class="rounded-circle"
                        />
                    </div>
                    <div class="movie-review-right">
                        <div class="movie-review-top">
                            <div class="movie-review-top-username">
                                <span>{{ review.reviewer.username }}</span>
                            </div>
                            <div class="movie-review-top-star">
                                <div
                                    v-for="star in review.rate"
                                    :key="`02-${star}`"
                                >
                                    <span class="fa fa-star checked"></span>
                                </div>
                                <div
                                    v-for="star in 5 - review.rate"
                                    :key="`03-${star}`"
                                >
                                    <span class="fa fa-star unchecked"></span>
                                </div>
                            </div>
                        </div>
                        <div class="movie-review-bottom">
                            {{ review.content }}
                        </div>
                    </div>
                    <div v-if="review.reviewer.username == loggedInUser">
                        <button @click="DeleteReview(review.id)">X</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
    name: "DetailReviewList",
    computed: {
        reviews() {
            return this.$store.state.movie.movie.reviews;
        },
        loggedInUser() {
            return this.$store.state.loggedInUser;
        },
        profile_image() {
            return `${API_URL}${this.$store.state.profile.profile.profile_image}`;
        },
    },
    created() {
        this.getMovieDetail(this.$route.params.id);
    },
    methods: {
        getMovieDetail() {
            this.$store.dispatch("getMovieDetail", this.$route.params.id);
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
