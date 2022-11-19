<template>
    <div>
        <HeadBar msg="배우" />
        <div class="cards-box">
            <ActorPort
                v-for="(movie, index) in actorPorts"
                :key="index"
                :movie="movie"
            />
        </div>
    </div>
</template>

<script>
import HeadBar from "@/components/HeadBar";
import ActorPort from "@/components/Port/ActorPort";

export default {
    name: "ActorPortView",

    components: {
        HeadBar,
        ActorPort,
    },
    created() {
        this.getActorPort();
    },
    computed: {
        actorPorts() {
            return this.$store.state.actorPorts;
        },
    },

    methods: {
        getActorPort() {
            this.$store.dispatch("getActorPort", this.$route.params.id);
        },
    },
};
</script>

<style></style>
