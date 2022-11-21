<template>
    <div class="home">
        <div v-if="isLoaded">
            <div class="col-sector">
                <SideBar />
                <div class="row-sector">
                    <HeadBar msg="인기 영화1" />
                    <div id="popular">
                        <carousel-3d
                            :height="510"
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
                    <HeadBar :msg="randomGenreName" />
                    <div id="slide">
                        <ccarousel
                            :per-page="6"
                            :navigate-to="0"
                            :mouse-drag="false"
                            :paginationEnabled="false"
                            :navigationEnabled="true"
                            :navigationClickTargetSize="9"
                        >
                            <slide2
                                v-for="(randommovie, index) in randoms.genre"
                                :key="index"
                                :randommovie="randommovie"
<<<<<<< HEAD
                            >
                                <Random
                                    :randommovie="randommovie"
                                    :popupView="popupView"
                                    @booleanFromChild="booleanChange"
                                />
                            </slide2>
                        </ccarousel>
                    </div>
                    <HeadBar :msg="randomDirectorName" />
                    <div id="slide">
                        <ccarousel
                            :per-page="5"
                            :navigate-to="0"
                            :mouse-drag="false"
                            :paginationEnabled="false"
                            :navigationEnabled="true"
                            :navigationClickTargetSize="9"
=======
                            />
                        </slide2>
                    </ccarousel>
                </div>
                <HeadBar msg="test" />
                <div>
                    <HeadBar :msg="randomDirectorName" />
                    <TinderView/>
                </div>
                <div id="slide">
                    <ccarousel
                        :per-page="5"
                        :navigate-to="0"
                        :mouse-drag="false"
                        :paginationEnabled="false"
                        :navigationEnabled="true"
                        :navigationClickTargetSize="9"
                    >
                        <slide2
                            v-for="(randommovie, index) in randoms.director"
                            :key="index"
                            :randommovie="randommovie"
>>>>>>> 7438bf45b5867d1ddb0bf1efa314cb7fd99f8b98
                        >
                            <slide2
                                v-for="(randommovie, index) in randoms.director"
                                :key="index"
                                :randommovie="randommovie"
                            >
                                <Random :randommovie="randommovie" />
                            </slide2>
                        </ccarousel>
                    </div>
                    <HeadBar :msg="randomActorName" />
                    <div id="slide">
                        <ccarousel
                            :per-page="5"
                            :navigate-to="0"
                            :mouse-drag="false"
                            :paginationEnabled="false"
                            :navigationEnabled="true"
                            :navigationClickTargetSize="9"
                        >
                            <slide2
                                v-for="(randommovie, index) in randoms.actor"
                                :key="index"
                                :randommovie="randommovie"
                            >
                                <Random :randommovie="randommovie" />
                            </slide2>
                        </ccarousel>
                    </div>
                </div>
                <div
                    class="popup-view"
                    :class="{ popupActive: popupView }"
                    :style="{ left: xPosition, top: yPosition }"
                    @mouseout="closePopup()"
                >
                    <PopUp :movieObj="movieObj" />
                </div>
                <SideBar />
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import HeadBar from "@/components/HeadBar";
import { Carousel3d, Slide } from "vue-carousel-3d";
import { Carousel as Ccarousel } from "vue-carousel";
import { Slide as Slide2 } from "vue-carousel";
import PopularMovie from "@/components/PopularMovie";
import Random from "@/components/Random";
<<<<<<< HEAD
import PopUp from "@/components/PopUp";
=======
import TinderView from '@/views/TinderView';
>>>>>>> 7438bf45b5867d1ddb0bf1efa314cb7fd99f8b98

export default {
    name: "HomeView",
    components: {
        SideBar,
        HeadBar,
        Carousel3d,
        Ccarousel,
        Slide,
        Slide2,
        PopularMovie,
        Random,
<<<<<<< HEAD
        PopUp,
    },
    data() {
        return {
            isLoaded: false,
            popupView: false,
            xPosition: null,
            yPosition: null,
            movieObj: {},
        };
=======
        TinderView
>>>>>>> 7438bf45b5867d1ddb0bf1efa314cb7fd99f8b98
    },
    created() {
        this.getMovie();
        this.getRecommend();
        this.getRandom();
        setTimeout(() => {
            this.load();
        }, 3000);
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
        load() {
            this.isLoaded = true;
        },
        getMovie() {
            this.$store.dispatch("getMovie");
        },
        getRecommend() {
            this.$store.dispatch("getRecommend");
        },
        getRandom() {
            this.$store.dispatch("getRandom");
        },
        booleanChange(popupView) {
            this.popupView = popupView[0];
            this.xPosition = popupView[1];
            this.yPosition = popupView[2];
            this.movieObj = popupView[3];
        },
        closePopup: function () {
            this.popupView = false;
        },
    },
};
</script>
