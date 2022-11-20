<template>
    <div>
        <HeadBar :msg="actorName" />
        <div class="cards-box">
            <ActorPort
                v-for="(movie, index) in actorPorts.movie"
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
        actorName() {
            return `${this.$store.state.actorPorts.name} 배우의 출연 영화`;
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
