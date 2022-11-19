<template>
    <div>
        <HeadBar msg="배우" />
        <div class="cards-box">
            <ActorPort
                v-for="(movie, index) in actorports"
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
        actorports() {
            return this.$store.state.actorports;
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
