<template>
    <div class="movie-review-area">
        <div class="movie-reviews-box">
            <div class="movie-reviews">
                <div
                    v-for="review in reviews.slice().reverse()"
                    :key="`01-${review.id}`"
                >
                    <DetailReview
                        :review="review"
                    />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import DetailReview from "@/components/Detail/DetailReview"

export default {
    name: "DetailReviewList",
    components: {
        DetailReview,
    },
    computed: {
        reviews() {
            return this.$store.state.movie.movie.reviews;
        },
    },
    created() {
        this.getMovieDetail(this.$route.params.id);
    },
    methods: {
        getMovieDetail() {
            this.$store.dispatch("getMovieDetail", this.$route.params.id);
        },
    },
};
</script>

<style></style>
