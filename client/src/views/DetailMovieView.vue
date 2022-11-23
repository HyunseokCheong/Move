<template>
    <div>
        <!--  -->
        <!--  -->
        <div class="movie-detail">
            <DetailMovie />
        </div>
        <div class="movie-review-detail">
            <hr />
            <h1>리뷰</h1>
            <hr />
            <DetailReviewForm />
            <hr />
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
