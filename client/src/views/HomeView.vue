<template>
    <div class="home">
        <div class="col-sector">
            <SideBar />
            <div class="row-sector">
                <HeadBar msg="인기 영화1" />
                <div id="popular">
                    <carousel-3d
                        :height="400"
                        :autoplay="true"
                        :autoplay-timeout="3000"
                        :controls-visible="true"
                        :controls-prev-html="'&#x2039; '"
                        :controls-next-html="'&#x203A;'"
                        :controls-width="10"
                        :controls-height="30"
                    >
                        <slide
                            v-for="(popularmovie, i) in movies"
                            :index="i"
                            :key="i"
                        >
                            <PopularMovie
                                :popularmovie="popularmovie"
                                :index="i"
                            />
                        </slide>
                    </carousel-3d>
                </div>
                <!--  -->
                <TestMovie />
                <!--  -->
                <HeadBar msg="영화 추천" />
                <div class="cards-box">
                    <RecommendMovie
                        v-for="(movie, index) in recommends"
                        :key="index"
                        :movie="movie"
                    />
                </div>
                <HeadBar :msg="randomGenreName" />
                <div class="cards-box">
                    <Random
                        v-for="(movie, index) in randoms.genre"
                        :key="index"
                        :movie="movie"
                    />
                </div>
                <HeadBar :msg="randomDirectorName" />
                <div class="cards-box">
                    <Random
                        v-for="(movie, index) in randoms.director"
                        :key="index"
                        :movie="movie"
                    />
                </div>
                <HeadBar :msg="randomActorName" />
                <div class="cards-box">
                    <Random
                        v-for="(movie, index) in randoms.actor"
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
import RecommendMovie from "@/components/RecommendMovie";
import Random from "@/components/Random";
import SideBar from "@/components/SideBar";
import HeadBar from "@/components/HeadBar";
import { Carousel3d, Slide } from "vue-carousel-3d";
import PopularMovie from "@/components/PopularMovie";
import TestMovie from "@/components/TestMovie";

export default {
    name: "HomeView",
    components: {
        RecommendMovie,
        Random,
        SideBar,
        HeadBar,
        Carousel3d,
        Slide,
        PopularMovie,
        TestMovie,
    },
    created() {
        this.getMovie();
        this.getRecommend();
        this.getRandom();
    },
    computed: {
        movies() {
            return this.$store.state.movies;
        },
        recommends() {
            return this.$store.state.recommends;
        },
        randoms() {
            return this.$store.state.randoms;
        },
        randomGenreName() {
            return `${this.$store.state.randoms.genre_name} 장르의 영화`;
        },
        randomDirectorName() {
            return `${this.$store.state.randoms.director_name} 감독의 연출 영화`;
        },
        randomActorName() {
            return `${this.$store.state.randoms.actor_name} 배우의 출연 영화`;
        },
    },

    methods: {
        getMovie() {
            this.$store.dispatch("getMovie");
        },
        getRecommend() {
            this.$store.dispatch("getRecommend");
        },
        getRandom() {
            this.$store.dispatch("getRandom");
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
