<template>
    <div class="movie-detail-card">
            <DetailMovie />
            <DetailReviewForm movie="" />
            <DetailReviewList />
            <router-link :to="{ name: 'home' }">뒤로가기</router-link>
    </div>
</template>

<script>
import DetailMovie from "@/components/DetailMovie";
import DetailReviewForm from "@/components/DetailReviewForm";
import DetailReviewList from "@/components/DetailReviewList";

export default {
    name: "DetailView",
    components: {
        DetailMovie,
        // DetailReviewForm,
        // DetailReviewList,
    },
};
</script>
