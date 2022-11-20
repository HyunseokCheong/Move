<template>
    <div>
        <HeadBar :msg="genreName" />
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
import HeadBar from "@/components/HeadBar";
import GenrePort from "@/components/Port/GenrePort";

export default {
    name: "GenrePortView",
    data() {
        return { genreName: null };
    },
    components: {
        HeadBar,
        GenrePort,
    },
    created() {
        this.getGenrePort();
        this.getGenreName();
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
        getGenreName() {
            let genrePorts = this.$store.state.genrePorts;
            for (let i = 0; i < genrePorts[0].genres.length; i++) {
                if (genrePorts[0].genres[i].id == this.$route.params.id) {
                    this.genreName = genrePorts[0].genres[i].name;
                    break;
                }
            }
        },
    },
};
</script>

<style></style>
