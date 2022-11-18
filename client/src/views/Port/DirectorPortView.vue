<template>
  <div>
    <HeadBar msg= '감독' />
    <div class="cards-box">
        <DirectorPort
             v-for="(movie, index) in directorports"
            :key="index"
            :movie="movie"
        />
    </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar';
import DirectorPort from "@/components/Port/DirectorPort";

export default {
    name: 'DirectorPortView',

    components: {
        HeadBar,
        DirectorPort,
    },
    created() {
        this.getDirectorPort();
    },
    computed: {
        directorports() {
            return this.$store.state.directorports;
        },
    },

    methods: {
        getDirectorPort() {
            this.$store.dispatch("getDirectorPort", this.$route.params.id);
        },
    },
};
</script>

<style>

</style>