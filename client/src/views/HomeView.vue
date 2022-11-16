<template>
    <div class="home">
        <div class="col-sector">
            <SideBar />
            <div class="row-sector">
                <HeadBar msg="순위 기반 영화 추천" />
                <div class="cards-box">
                    <RecommendRankBase
                        v-for="(movie, index) in movies"
                        :key="index"
                        :movie="movie"
                    />
                </div>
            </div>
            <SideBar />
        </div>
        <div class="col-sector">
            <SideBar />
            <div class="row-sector">
                <HeadBar msg="로그인 계정 기반 영화 추천" />
                <div class="cards-box">
                    <RecommendAccountBase
                        v-for="(movie, index) in movies1"
                        :key="index"
                        :movie="movie"
                    />
                </div>
            </div>
            <SideBar />
        </div>
        <div class="col-sector">
            <SideBar />
            <div class="row-sector">
                <HeadBar msg="팔로우 기반 영화 추천" />
                <div class="cards-box">
                    <RecommendFollowBase
                        v-for="(movie, index) in movies2"
                        :key="index"
                        :movie="movie"
                    />
                </div>
            </div>
            <SideBar />
        </div>
    </div>
</template>

<script>
import RecommendRankBase from "@/components/RecommendRankBase.vue";
import RecommendAccountBase from "@/components/RecommendAccountBase.vue";
import RecommendFollowBase from "@/components/RecommendFollowBase.vue";
import SideBar from "@/components/SideBar";
import HeadBar from "@/components/HeadBar";

export default {
    name: "HomeView",
    components: {
        RecommendRankBase,
        RecommendAccountBase,
        RecommendFollowBase,
        SideBar,
        HeadBar,
    },
    created() {
        this.getMovie();
        this.getMovie1();
        this.getMovie2();
    },
    computed: {
        movies() {
            return this.$store.state.movies;
        },
        movies1() {
            return this.$store.state.movies1;
        },
        movies2() {
            return this.$store.state.movies1;
        },
    },

    methods: {
        getMovie() {
            this.$store.dispatch("getMovie");
        },
        getMovie1() {
            this.$store.dispatch("getMovie1");
        },
        getMovie2() {
            this.$store.dispatch("getMovie2");
        },
    },
};
</script>
<style>
.cards-box {
    width: 100%;
    /* 가로스크롤 */
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
}
.card {
    flex: 0 0 auto;
    width: 270px;
    height: 460px;
    border: solid 1px black;
    margin: 5px;
}
</style>
