<template>
    <router-link :to="{ name: 'detail', params: { id: randommovie.id } }">
        <img
            :src="backdrop_path"
            id="imagemPosterSlide"
            @mouseover="openPopup($event)"
        />
    </router-link>
</template>
<script>
export default {
    name: "RandomRandom",
    props: {
        randommovie: Object,
        popupView: Boolean,
    },
    data() {
        return {
            propPopupView: this.popupView,
            xPosition: null,
            yPosition: null,
            movieObj: this.randommovie,
        };
    },
    methods: {
        openPopup(event) {
            if (this.popupView == false) {
                this.propPopupView = true;
                this.xPosition =
                    window.pageXOffset +
                    event.currentTarget.getBoundingClientRect().left -
                    62.5 +
                    "px";
                this.yPosition =
                    window.pageYOffset +
                    event.currentTarget.getBoundingClientRect().top -
                    86.75 +
                    "px";
                let bag = [
                    this.propPopupView,
                    this.xPosition,
                    this.yPosition,
                    this.movieObj,
                ];
                this.$emit("booleanFromChild", bag);
            }
        },
    },
    computed: {
        backdrop_path() {
            return `https://www.themoviedb.org/t/p/original${this.randommovie.backdrop_path}`;
        },
    },
};
</script>

<style></style>
