<template>
    <router-link
        :to="{ name: 'detail', params: { id: randommovie.id } }"
    >
        <img :src="backdrop_path" id="imagemPosterSlide"/>
    </router-link>

</template>
<script>

export default {
    name: "TestMovie2",
    props: {
        randommovie: Object,
    },
    computed: {
        backdrop_path() {
            return `https://www.themoviedb.org/t/p/original${this.randommovie.backdrop_path}`;
        },
    },
};
</script>

<style></style>
