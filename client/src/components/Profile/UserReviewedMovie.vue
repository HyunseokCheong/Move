<template>
    <router-link :to="{ name: 'detail', params: { id: userReviewedMovie.id } }">
        <img :src="backdrop_path" alt="" id="imagemPosterSlide" />
    </router-link>
</template>

<script>
export default {
    name: "UserReviewedMovie",
    props: {
        userReviewedMovie: Object,
    },
    computed: {
        backdrop_path() {
            return `https://www.themoviedb.org/t/p/original${this.userReviewedMovie.backdrop_path}`;
        },
    },
};
</script>
