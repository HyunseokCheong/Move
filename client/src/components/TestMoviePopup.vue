<template>
    <div>
        <div id="slide">
            <carousel
                :per-page="5"
                :navigate-to="0"
                :mouse-drag="false"
                :paginationEnabled="false"
                :navigationEnabled="true"
                :navigationClickTargetSize="9"
            >
                <slide
                    id=""
                    v-for="(movie, index) in this.recommends"
                    :key="index"
                    :movie="movie"
                >
                    <router-link
                        :to="{ name: 'detail', params: { id: movie.id } }"
                        tag="div"
                        ><img :src="movie.backdrop_path" id="imagemPosterSlide"
                    /></router-link>
                </slide>
            </carousel>
        </div>
    </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";

export default {
    name: "TestMoviePopup",
    components: {
        Carousel,
        Slide,
    },
    data() {
        return {
            infoTransition: false,
        };
    },
    created() {
        this.getRecommend();
    },
    computed: {
        recommends() {
            return this.$store.state.recommends;
        },
    },
    methods: {
        getRecommend() {
            this.$store.dispatch("getRecommend");
        },
    },
};
</script>

<style></style>
