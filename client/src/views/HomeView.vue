<template>
    <div class="home">
        <div class="col-sector">
            <SideBar />
            <div class="row-sector">
                <HeadBar msg="인기 영화" />
                <div class="cards-box">
                    <RecommendRankBase
                        v-for="(movie, index) in movies"
                        :key="index"
                        :movie="movie"
                    />
                </div>
                <HeadBar msg="영화 추천" />
                <div class="cards-box">
                    <RecommendMovie
                        v-for="(movie, index) in recommends"
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
import RecommendMovie from "@/components/RecommendMovie.vue";
import SideBar from "@/components/SideBar";
import HeadBar from "@/components/HeadBar";

export default {
    name: "HomeView",
    components: {
        RecommendRankBase,
        RecommendMovie,
        SideBar,
        HeadBar,
    },
    created() {
        this.getMovie();
        this.getRecommend();
    },
    computed: {
        movies() {
            return this.$store.state.movies;
        },
        recommends() {
            return this.$store.state.recommends;
        },
    },

    methods: {
        getMovie() {
            this.$store.dispatch("getMovie");
        },
        getRecommend() {
            this.$store.dispatch("getRecommend");
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
