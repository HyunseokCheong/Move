<template>
    <router-link :to="{ name: 'detail', params: { id: movieObj.id } }">
        <div class="popupBox">
            <img class="popupImage" :src="backdrop_path" alt="" />
            <div class="popupContent">
                <small>{{ movieObj.title }}</small
                ><br />
                <small>{{ overview }}</small>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "PopUp",
    props: {
        movieObj: Object,
    },
    computed: {
        overview() {
            if (this.movieObj.overview.length >= 80) {
                return this.movieObj.overview.slice(0, 80) + "...";
            }
            return this.movieObj.overview;
        },
        backdrop_path() {
            return `https://www.themoviedb.org/t/p/original${this.movieObj.backdrop_path}`;
        },
    },
};
</script>

<style></style>
