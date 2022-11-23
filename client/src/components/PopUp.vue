<template>
    <div class="popupBox" @mouseenter="getMovieDetail" @mouseleave="closePopup">
        <div class="video-frame">
            <div class="video">
                <iframe
                    width="50%"
                    :src="youtube"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
        </div>
        <div class="popupContent">
            <router-link :to="{ name: 'detail', params: { id: movieObj.id } }">
                <h2>{{ movieObj.title }}</h2>
            </router-link>
            <span v-for="(genre, i) in movieObj.genres" :key="i">
                {{ genre.name }}
            </span>
            
            <div v-if="state == 0">
                <button @click="like()">좋아요</button>
                <button @click="dislike()">싫어요</button>
                <button @click="addWishList()">찜하기</button>
            </div>
            <div v-if="state == 1">
                <button @click="like()">좋아요 취소</button>
                <button @click="dislike()">싫어요</button>
                <button @click="addWishList()">찜하기</button>
            </div>
            <div v-if="state == 2">
                <button @click="like()">좋아요</button>
                <button @click="dislike()">싫어요 취소</button>
                <button @click="addWishList()">찜하기</button>
            </div>
            <div v-if="state == 3">
                <button @click="like()">좋아요</button>
                <button @click="dislike()">싫어요</button>
                <button @click="addWishList()">찜하기 취소</button>
            </div>
            <br />
        </div>
    </div>
</template>

<script>
export default {
    name: "PopUp",
    props: {
        movieObj: Object,
    },
    computed: {
        youtube() {
            return `https://www.youtube.com/embed/${this.movieObj.youtube_key}?autoplay=1&mute=1`;
        },
        state: {
            set: function () {
            },
            get: function () {
                return this.$store.state.state
            }
        },
    },
    methods: {
        getMovieDetail() {
            this.$store.dispatch("getMovieDetail", this.movieObj.id)
        },
        closePopup() {
            this.state = null;
        },
        like() {
            this.$store.dispatch("movieLike", this.movieObj.id);
        },
        dislike() {
            this.$store.dispatch("movieDislike", this.movieObj.id);
        },
        addWishList() {
            this.$store.dispatch("movieWish", this.movieObj.id);
        },
    },
};
</script>

<style></style>
