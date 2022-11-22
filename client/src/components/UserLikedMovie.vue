<template>
    <div>
        <!-- {{ movie.title }} -->
        <!-- {{ userLikedMovie }} -->
        <!-- <img :src="poster_path" alt="..." /> -->
    </div>
</template>

<script>
export default {
    name: "UserLikedMovie",
    props: {
        userLikedMovie: Object,
    },
    computed: {
        poster_path() {
            return `https://www.themoviedb.org/t/p/original${this.movie.poster_path}`;
        },
    },
};
</script>

<style></style>
