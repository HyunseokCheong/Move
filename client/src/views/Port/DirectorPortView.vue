<template>
    <div>
        <HeadBar :msg="directorName" />
        <div class="cards-box">
            <DirectorPort
                v-for="(movie, index) in directorPorts"
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
    data() {
        return { directorName: null };
    },
    components: {
        HeadBar,
        DirectorPort,
    },
    created() {
        this.getDirectorPort();
        this.getDirectorName();
    },
    computed: {
        directorPorts() {
            return this.$store.state.directorPorts;
        },
    },

    methods: {
        getDirectorPort() {
            this.$store.dispatch("getDirectorPort", this.$route.params.id);
        },
        getDirectorName() {
            let directorPorts = this.$store.state.directorPorts;
            for (let i = 0; i < directorPorts[0].directors.length; i++) {
                if (directorPorts[0].directors[i].id == this.$route.params.id) {
                    this.directorName = directorPorts[0].directors[i].name;
                    break;
                }
            }
        },
    },
};
</script>

<style></style>
