<template>
    <div>
        <HeadBar msg="영화 추천" />
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
import HeadBar from "@/components/HeadBar";
import DirectorPort from "@/components/Port/DirectorPort";

export default {
    name: "PortView",

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

<style></style>
