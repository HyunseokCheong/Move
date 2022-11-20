<template>
  <img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="posterpath">
</template>

<script>
export default {
    name: "PopularMovie",
    props: {
        popularmovie: Object
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