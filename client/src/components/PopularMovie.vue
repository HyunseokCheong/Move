<template >
    <router-link
        :to="{ name: 'detail', params: { id: popularmovie.id } }"
    >
        <img :data-index="index" :src="posterpath">
    </router-link>
</template>

<script>
export default {
    name: "PopularMovie",
    props: {
        popularmovie: Object,
        index: Number,
    },
    computed: {
        posterpath() {
            return `https://www.themoviedb.org/t/p/original${this.popularmovie.poster_path}`;
        },
    },

}
</script>

<style>

</style>