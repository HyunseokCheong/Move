<template>
    <router-link :to="{ name: 'detail', params: { id: userLikedMovie.id } }">
        <img :src="backdrop_path" alt="" id="imagemPosterSlide" />
    </router-link>
</template>

<script>
export default {
    name: "UserLikedMovie",
    props: {
        userLikedMovie: Object,
    },
    computed: {
        backdrop_path() {
            return `https://www.themoviedb.org/t/p/original${this.userLikedMovie.backdrop_path}`;
        },
    },
};
</script>
