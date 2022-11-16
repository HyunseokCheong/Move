<template>
    <div class="Ranking">
        <div class="col-sector">
            <SideBar />
            <div class="row-sector">
                <UserRank
                    v-for="(user, index) in users"
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
        this.getUser();
    },
    computed: {
        users() {
            return this.$store.state.users;
        },
    },
    methods: {
        getUser() {
            this.$store.dispatch("getUser");
        },
    },
};
</script>

<style></style>
