<template>
    <router-link :to="{ name: 'detail', params: { id: userWishedMovie.id } }">
        <img :src="backdrop_path" alt="" id="imagemPosterSlide" />
    </router-link>
</template>

<script>
export default {
    name: "UserLikedMovie",
    props: {
        userWishedMovie: Object,
    },
    computed: {
        backdrop_path() {
            return `https://www.themoviedb.org/t/p/original${this.userWishedMovie.backdrop_path}`;
        },
    },
};
</script>
