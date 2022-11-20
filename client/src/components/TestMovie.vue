<template>
    <div>
        <div id="slide">
            <carousel
                :per-page="8"
                :navigate-to="0"
                :mouse-drag="true"
                :paginationEnabled="false"
                :navigationEnabled="true"
                :navigationClickTargetSize="9"
            >
                <slide
                    id=""
                    v-for="(movie, index) in movies"
                    :key="index"
                    :movie="movie"
                >
                    {{ movie }}
                </slide>
            </carousel>
        </div>
    </div>
</template>
<script>
// https://www.themoviedb.org/t/p/original${movie.backdrop_path}
import { Carousel, Slide } from "vue-carousel";

export default {
    name: "TestMovie",
    components: {
        Carousel,
        Slide,
    },
    created() {
        this.getRecommend();
    },
    computed: {
        movies() {
            return this.$store.state.movies;
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
