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
                    v-for="(movie, index) in this.randoms"
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
    name: "TestMovie",
    components: {
        Carousel,
        Slide,
    },
    created() {
        this.getRandom();
    },
    computed: {
        randoms() {
            return this.$store.state.randoms.actor;
        },
    },
    methods: {
        getRandom() {
            this.$store.dispatch("getRandom");
        },
    },
};
</script>

<style></style>
