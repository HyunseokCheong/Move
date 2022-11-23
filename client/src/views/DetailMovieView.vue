<template>
    <div>
        <div class="movie-detail">
            <DetailMovie />
        </div>
        <div class="movie-review-detail">
            <DetailReviewForm />
            <DetailReviewList />
        </div>
    </div>
</template>

<script>
import DetailMovie from "@/components/Detail/DetailMovie";
import DetailReviewList from "@/components/Detail/DetailReviewList";
import DetailReviewForm from "@/components/Detail/DetailReviewForm";

export default {
    name: "DatailMovieView",
    components: {
        DetailMovie,
        DetailReviewList,
        DetailReviewForm,
    },
};
</script>

<style></style>
