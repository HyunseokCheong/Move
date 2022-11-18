<template>
    <div>
        <div v-for="review in reviews" :key="review.id" class="col-sector">
            <router-link
                :to="{
                    name: 'detailuser',
                    params: { name: review.reviewer.username },
                }"
            >
                {{ review.reviewer.username }}</router-link
            >
            <p>{{ review }}</p>
            <div v-if="review.reviewer.username == loggedInUser">
                <button v-on:click="DeleteReview(review.id)">X</button>
            </div>
            <br />
        </div>
    </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
    name: "DetailReviewList",
    data() {
        return {
            reviews: [],
        };
    },
    created() {
        this.getMovieDetail(this.$route.params.id);
    },
    computed: {
        loggedInUser() {
            return this.$store.state.loggedInUser;
        },
    },
    methods: {
        getMovieDetail() {
            axios({
                url: `${API_URL}/movies/${this.$route.params.id}`,
            })
                .then((res) => {
                    this.reviews = res.data.movie.reviews;
                })
                .catch((err) => {
                    console.log(err);
                });
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
