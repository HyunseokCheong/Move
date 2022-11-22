<template>
    <router-link :to="{ name: 'detail', params: { id: userSearchedMovie.id } }">
        <img :src="backdrop_path" alt="" id="imagemPosterSlide" />
    </router-link>
</template>

<script>
export default {
    name: "UserSearchedMovie",
    props: {
        userSearchedMovie: Object,
    },
    computed: {
        backdrop_path() {
            return `https://www.themoviedb.org/t/p/original${this.userSearchedMovie.backdrop_path}`;
        },
    },
};
</script>
