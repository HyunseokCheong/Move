<template>
    <div class="col-sector">
        <SideBar />
        <div class="row-sector">
            <div v-if="user">
                <p>이름 : {{ user.profile.username }}</p>
                <div v-if="userName != this.$route.params.name">
                    <button @click="follow">팔로우</button>
                </div>
                <!-- 틴더에서 구현 후 v-for로 구현 -->
                <!-- <p>선호 장르 : {{ user.profile.favorite_genres }}</p> -->
                <!-- <p>선호 감독 : {{ user.profile.favorite_genres }}</p> -->
                <!-- <p>선호 배우 : {{ user.profile.favorite_genres }}</p> -->
                {{ userLikedMovies }}
                <hr />
                <!--  -->
                <ccarousel
                    :per-page="6"
                    :navigate-to="0"
                    :mouse-drag="false"
                    :paginationEnabled="false"
                    :navigationEnabled="true"
                    :navigationClickTargetSize="9"
                >
                    <slide2
                        v-for="userLikedMovie in userLikedMovies"
                        :key="`1-${userLikedMovie.id}`"
                        :userLikedMovie="userLikedMovie"
                    >
                        <UserLikedMovie :userLikedMovie="userLikedMovie" />
                    </slide2>
                </ccarousel>
                <!--  -->
                <!-- <div v-for="movie in userLikedMovie" :key="`1-${movie.id}`">
                {{ movie.title }}
            </div> -->
                <hr />
                <h3>좋아요 누른 영화들</h3>
                <h3>리뷰 남긴 영화들</h3>
                <div v-for="movie in userReviewMovie" :key="`2-${movie.id}`">
                    {{ movie.title }}
                </div>
                <hr />
                <div v-if="userName == this.$route.params.name">
                    <h3>위시리스트</h3>
                    <div v-for="movie in userWishMovie" :key="`3-${movie.id}`">
                        {{ movie.title }}
                    </div>
                </div>
                <div v-else>본인이면 위시리스트 보임</div>
                <!-- 팔로우 관련 -->
                <!-- <p>현재 팔로워 수 : {{ user.profile.followings.length }}</p>
            <p>현재 팔로워 :</p>
            <div v-for="follower in user.profile.followings" :key="follower.id">
                <router-link
                    :to="{
                        name: 'detailuser',
                        params: { name: users[follower - 1].username },
                    }"
                >
                    <div>
                        {{ users[follower - 1].username }}
                    </div>
                </router-link>
            </div> -->
            </div>
        </div>

        <SideBar />
    </div>
</template>

<script>
import axios from "axios";
import SideBar from "@/components/SideBar";
import { Carousel as Ccarousel } from "vue-carousel";
import { Slide as Slide2 } from "vue-carousel";
import UserLikedMovie from "@/components/UserLikedMovie";

const API_URL = "http://127.0.0.1:8000";

export default {
    name: "DetailUserView",
    components: {
        SideBar,
        Ccarousel,
        Slide2,
        UserLikedMovie,
    },
    data() {
        return { user: null, userId: null, wishlist: null };
    },
    computed: {
        users() {
            return this.$store.state.users;
        },
        movies() {
            return this.$store.state.movies;
        },
        isLogin() {
            return this.$store.getters.isLogin;
        },
        userName() {
            return this.$store.state.loggedInUser;
        },
        userReviewMovie() {
            return this.$store.state.reviewed_list;
        },
        userLikedMovies() {
            return this.$store.state.liked_list;
        },
        userWishMovie() {
            return this.$store.state.wish_list;
        },
    },
    created() {
        this.getUserDetail();
        this.getUser();
        this.getReviewedList();
        this.getLikedList();
        this.getWishlist();
    },
    methods: {
        getReviewedList() {
            this.$store.dispatch("getReviewedList", this.$route.params.name);
        },
        getLikedList() {
            this.$store.dispatch("getLikedList", this.$route.params.name);
        },
        getWishlist() {
            this.$store.dispatch("getWishList");
        },
        getUserDetail() {
            axios({
                url: `${API_URL}/accounts/profile/${this.$route.params.name}`,
            })
                .then((res) => {
                    this.user = res.data;
                })
                .catch((err) => console.log(err));
        },
        follow() {
            axios({
                url: `${API_URL}/accounts/${this.userId}/follow/`,
                headers: {
                    Authorization: `Token ${this.$store.state.token}`,
                },
            })
                .then(() => {
                    this.$router.go();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getUser() {
            axios({
                url: `${API_URL}/accounts/userlist/`,
            })
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].username == this.$route.params.name) {
                            this.userId = i + 1;
                            break;
                        }
                    }
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style></style>
