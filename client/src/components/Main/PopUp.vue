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
            <div class="popup-content-top">
                <router-link
                    :to="{ name: 'detail', params: { id: movieObj.id } }"
                >
                    <span class="popup-content-title">{{
                        movieObj.title
                    }}</span>
                </router-link>
                <span
                    class="popup-content-genre"
                    v-for="(genre, i) in movieObj.genres"
                    :key="i"
                >
                    {{ genre.name }}
                </span>
            </div>
            <div v-if="state == 0" class="popup-content-bottom">
                <img
                    src="./../../assets/images/like_white.png"
                    alt=""
                    @click="like()"
                    style="height: 40px"
                />
                <img
                    src="./../../assets/images/dislike_white.png"
                    alt=""
                    @click="dislike()"
                    style="height: 40px; margin-left: 10px; margin-right: 10px"
                />
                <img
                    src="./../../assets/images/bookmark_white.png"
                    alt=""
                    @click="addWishList()"
                    style="height: 40px"
                />
            </div>
            <div v-if="state == 1" class="buttons-box">
                <img
                    src="./../../assets/images/likeActive_color.png"
                    alt=""
                    @click="like()"
                    style="height: 40px"
                />
                <img
                    src="./../../assets/images/dislike_white.png"
                    alt=""
                    @click="dislike()"
                    style="height: 40px; margin-left: 10px; margin-right: 10px"
                />
                <img
                    src="./../../assets/images/bookmark_white.png"
                    alt=""
                    @click="addWishList()"
                    style="height: 40px"
                />
            </div>
            <div v-if="state == 2" class="buttons-box">
                <img
                    src="./../../assets/images/like_white.png"
                    alt=""
                    @click="like()"
                    style="height: 40px"
                />
                <img
                    src="./../../assets/images/dislikeActive_color.png"
                    alt=""
                    @click="dislike()"
                    style="height: 40px; margin-left: 10px; margin-right: 10px"
                />
                <img
                    src="./../../assets/images/bookmark_white.png"
                    alt=""
                    @click="addWishList()"
                    style="height: 40px"
                />
            </div>
            <div v-if="state == 3" class="buttons-box">
                <img
                    src="./../../assets/images/like_white.png"
                    alt=""
                    @click="like()"
                    style="height: 40px"
                />
                <img
                    src="./../../assets/images/dislike_white.png"
                    alt=""
                    @click="dislike()"
                    style="height: 40px; margin-left: 10px; margin-right: 10px"
                />
                <img
                    src="./../../assets/images/removeBookmark_color.png"
                    alt=""
                    @click="addWishList()"
                    style="height: 40px"
                />
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
            set: function () {},
            get: function () {
                return this.$store.state.state;
            },
        },
    },
    methods: {
        getMovieDetail() {
            this.$store.dispatch("getMovieDetail", this.movieObj.id);
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
