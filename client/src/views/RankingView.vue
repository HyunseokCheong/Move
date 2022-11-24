<template>
    <div class="Ranking">
        <div class="col-sector">
            <SideBar />
            <div class="row-sector ranking-box">
                <hr />
                <div class="col-sector">
                    <span class="ranking-left ranking-index">랭킹</span>
                    <span class="ranking-mid ranking-index">ID</span>
                    <span class="ranking-right ranking-index">리뷰</span>
                </div>
                <hr />
                <UserRank
                    v-for="(user, index) in rankings"
                    :key="index"
                    :index="index"
                    :user="user"
                />
            </div>
            <SideBar />
        </div>
        <Footer/>
    </div>
</template>

<script>
import UserRank from "@/components/UserRank";
import SideBar from "@/components/SideBar";
import Footer from '@/components/Footer';

export default {
    name: "RankingView",
    components: {
        SideBar,
        UserRank,
        Footer,
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
