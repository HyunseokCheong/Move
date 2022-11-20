<template>
    <div>
        <HeadBar :msg="genreName" />
        <div class="cards-box">
            <GenrePort
                v-for="(movie, index) in genrePorts.movie"
                :key="index"
                :movie="movie"
            />
        </div>
    </div>
</template>

<script>
import HeadBar from "@/components/HeadBar";
import GenrePort from "@/components/Port/GenrePort";

export default {
    name: "GenrePortView",
    components: {
        HeadBar,
        GenrePort,
    },
    created() {
        this.getGenrePort();
    },
    computed: {
        genrePorts() {
            console.log(this.$store.state.genrePorts.name)
            return this.$store.state.genrePorts;
        },
        genreName() {
            return `${this.$store.state.genrePorts.name} 장르의 영화`;
        },
    },

    methods: {
        getGenrePort() {
            this.$store.dispatch("getGenrePort", this.$route.params.id);
        },
    },
};
</script>

<style></style>
