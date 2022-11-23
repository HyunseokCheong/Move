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
            <div class="popup-content-bottom">
                <router-link
                    :to="{ name: 'detail', params: { id: movieObj.id } }"
                >
                    <span class="popup-content-title">{{
                        movieObj.title
                    }}</span>
                </router-link>
                <!-- 공간 부족 : 장르 빼야하나 -->
                <!-- <br />
                <span
                    class="popup-content-genre"
                    v-for="(genre, i) in movieObj.genres"
                    :key="i"
                >
                    {{ genre.name }}
                </span> -->
            </div>

            <div v-if="state == 0" class="buttons-box">
                <img
                    src="./../../assets/images/like_black.png"
                    alt=""
                    @click="like()"
                />
                <img
                    src="./../../assets/images/dislike_black.png"
                    alt=""
                    @click="dislike()"
                />
                <img
                    src="./../../assets/images/bookmark_black.png"
                    alt=""
                    @click="addWishList()"
                />
            </div>
            <div v-if="state == 1" class="buttons-box">
                <img
                    src="./../../assets/images/likeActive_color.png"
                    alt=""
                    @click="like()"
                />
                <img
                    src="./../../assets/images/dislike_black.png"
                    alt=""
                    @click="dislike()"
                />
                <img
                    src="./../../assets/images/bookmark_black.png"
                    alt=""
                    @click="addWishList()"
                />
            </div>
            <div v-if="state == 2" class="buttons-box">
                <img
                    src="./../../assets/images/like_black.png"
                    alt=""
                    @click="like()"
                />
                <img
                    src="./../../assets/images/dislikeActive_color.png"
                    alt=""
                    @click="dislike()"
                />
                <img
                    src="./../../assets/images/bookmark_black.png"
                    alt=""
                    @click="addWishList()"
                />
            </div>
            <div v-if="state == 3" class="buttons-box">
                <img
                    src="./../../assets/images/like_black.png"
                    alt=""
                    @click="like()"
                />
                <img
                    src="./../../assets/images/dislike_black.png"
                    alt=""
                    @click="dislike()"
                />
                <img
                    src="./../../assets/images/removeBookmark_black.png"
                    alt=""
                    @click="addWishList()"
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
