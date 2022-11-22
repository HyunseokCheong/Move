<template>
    <div class="popupBox" @mouseenter="getMovieDetail" @mouseleave="closePopup">
        <router-link :to="{ name: 'detail', params: { id: movieObj.id } }">
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
        </router-link>
        <div class="popupContent">
            <small>{{ state }}</small>

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
            <small>{{ movieObj.title }}</small
            ><br />
            <small>{{ movieObj.overview }}</small>
        </div>
    </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default {
    name: "PopUp",
    data() {
        return {
            state: null,
        };
    },
    props: {
        movieObj: Object,
    },
    computed: {
        youtube() {
            return `https://www.youtube.com/embed/${this.movieObj.youtube_key}?autoplay=1&mute=1`;
        },
    },
    methods: {
        getMovieDetail() {
            axios({
                url: `${API_URL}/movies/${this.movieObj.id}`,
                headers: {
                    Authorization: `Token ${this.$store.state.token}`,
                },
            })
                .then((res) => {
                    this.state = res.data.state;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        closePopup() {
            this.state = null;
        },
        like() {
            this.$store.dispatch("movieLike", this.movieObj.id);
            if (this.state == 1) {
                this.state = 0;
            } else {
                this.state = 1;
            }
        },
        dislike() {
            this.$store.dispatch("movieDislike", this.movieObj.id);
            if (this.state == 2) {
                this.state = 0;
            } else {
                this.state = 2;
            }
        },
        addWishList() {
            this.$store.dispatch("movieWish", this.movieObj.id);
            if (this.state == 3) {
                this.state = 0;
            } else {
                this.state = 3;
            }
        },
    },
};
</script>
