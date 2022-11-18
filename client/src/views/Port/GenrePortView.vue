<template>
  <div>
    <HeadBar msg="장르" />
    <div class="cards-box">
        <GenrePort
             v-for="(movie, index) in genreports"
            :key="index"
            :movie="movie"
        />
    </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar';
import GenrePort from "@/components/Port/GenrePort";

export default {
    name: 'GenrePortView',

    components: {
        HeadBar,
        GenrePort,
    },
    created() {
        this.getGenrePort();
    },
    computed: {
        genreports() {
            return this.$store.state.genreports;
        },
    },

    methods: {
        getGenrePort() {
            this.$store.dispatch("getGenrePort", this.$route.params.id);
        },
    },
};
</script>

<style>

</style>