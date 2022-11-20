<template>
    <div>
        <HeadBar :msg="directorName" />
        <div class="cards-box">
            <DirectorPort
                v-for="(movie, index) in directorPorts.movie"
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
        directorPorts() {
            return this.$store.state.directorPorts;
        },
        directorName() {
            return `${this.$store.state.directorPorts.name} 감독의 연출 영화`;
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
