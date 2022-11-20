<template>
    <div>
        <HeadBar :msg="actorName" />
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
    data() {
        return { actorName: null };
    },
    components: {
        HeadBar,
        ActorPort,
    },
    created() {
        this.getActorPort();
        this.getActorName();
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
        getActorName() {
            let actorPorts = this.$store.state.actorPorts;
            for (let i = 0; i < actorPorts[0].actors.length; i++) {
                if (actorPorts[0].actors[i].id == this.$route.params.id) {
                    this.actorName = actorPorts[0].actors[i].name;
                    break;
                }
            }
        },
    },
};
</script>

<style></style>
