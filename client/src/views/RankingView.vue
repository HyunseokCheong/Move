<template>
    <div class="Ranking">
        <div class="col-sector">
            <SideBar />
            <div class="row-sector">
                <UserRank
                    v-for="(user, index) in rankings"
                    :key="index"
                    :index="index"
                    :user="user"
                />
            </div>
            <SideBar />
        </div>
    </div>
</template>

<script>
import UserRank from "@/components/UserRank";
import SideBar from "@/components/SideBar";

export default {
    name: "RankingView",
    components: {
        SideBar,
        UserRank,
    },
    created() {
        this.getRanking();
    },
    computed: {
        rankings() {
            return this.$store.state.rankings;
        },
    },
    methods: {
        getRanking() {
            this.$store.dispatch("getRanking");
        },
    },
};
</script>

<style></style>
