<template>
    <div class="movie-review">
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
            <img
                src="../../assets/images/delete_black.png"
                @click="DeleteReview(review.id)"
                alt=""
                height="40"
            />
        </div>
    </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default {
    name: 'DetailReview',
    props: {
        review: Object,
    },
    computed: {
        loggedInUser() {
            return this.$store.state.loggedInUser;
        },
        profile_image() {
            return `${API_URL}${this.review.reviewer.profile_image}`;
        },
    },
    created() {
        this.getReviewerProfileImage
    },
    methods: {
        getReviewerProfileImage() {
            console.log(this.review.reviewer)
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
    }
}
</script>

<style>

</style>