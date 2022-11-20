<template>
    <div class="home">
        <div class="col-sector">
            <SideBar />
            <div class="row-sector">
                <HeadBar msg="인기 영화1" />
                <div id="popular">
                    <carousel-3d 
                    :height="400"
                    :autoplay="true" :autoplay-timeout="3000" 
                    :controls-visible="true" 
                    :controls-prev-html="'&#x2039; '" :controls-next-html="'&#x203A;'"  :controls-width="10" :controls-height="30" 
                    :clickable="false">
                        <slide v-for="(popularmovie, i) in movies" :index="i" :key="i">
                            <PopularMovie 
                                :popularmovie="popularmovie"
                            />
                        </slide>
                    </carousel-3d>
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
import RecommendMovie from "@/components/RecommendMovie.vue";
import SideBar from "@/components/SideBar";
import HeadBar from "@/components/HeadBar";
import { Carousel3d, Slide } from 'vue-carousel-3d';
import PopularMovie from '@/components/PopularMovie';

export default {
    name: "HomeView",
    components: {
        RecommendMovie,
        SideBar,
        HeadBar,
        Carousel3d,
        Slide,
        PopularMovie
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
        posterpath() {
            return `https://www.themoviedb.org/t/p/original${this.slidemovie.poster_path}`;
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
