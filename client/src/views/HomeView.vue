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
    </div>
</template>

<script>
import RecommendRankBase from "@/components/RecommendRankBase.vue";
import SideBar from "@/components/SideBar";
import HeadBar from "@/components/HeadBar";

export default {
    name: "HomeView",
    components: {
        RecommendRankBase,
        SideBar,
        HeadBar,
    },
    created() {
        this.getMovie();
    },
    computed: {
        movies() {
            return this.$store.state.movies;
        },
    },

    methods: {
        getMovie() {
            this.$store.dispatch("getMovie");
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
