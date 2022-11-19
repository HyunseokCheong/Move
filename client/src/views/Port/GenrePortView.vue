<template>
  <div>
    <HeadBar msg="장르" />
    <div class="cards-box">
        <GenrePort
             v-for="(movie, index) in genrePorts"
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
        genrePorts() {
            return this.$store.state.genrePorts;
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