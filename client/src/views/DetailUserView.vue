<template>
    <div>
        <div v-if="user">
            {{ user }}
            <hr />
            <p>리뷰 작성한 영화</p>
            <div v-for="review in user.reviews" :key="review.id">
                <router-link
                    :to="{ name: 'detail', params: { id: review.movies } }"
                >
                    {{ review.movies }}
                </router-link>
            </div>
            <hr />
            <p>위시리스트 / 팔로우</p>
            <p>현재 팔로워 수 : {{ user.profile.followings.length }}</p>
            <p>현재 팔로워 :</p>
            <div v-for="follower in user.profile.followings" :key="follower.id">
                <router-link
                    @click.native="getUserDetail()"
                    :to="{
                        name: 'detailuser',
                        params: { name: users[follower - 1].username },
                    }"
                >
                    <div @click="getUserDetail()">
                        {{ users[follower - 1].username }}
                    </div>
                </router-link>
            </div>

            <div v-if="userName == this.$route.params.name">
                <p>위시리스트</p>
                <div v-if="wishlist">
                    <p>{{ wishlist }}</p>
                </div>
            </div>
            <div v-else>
                <button @click="follow">팔로우</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";
export default {
    name: "DetailUserView",
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
    },
    created() {
        this.getUserDetail();
        this.getUserWishlist();
        this.getUser();
    },
    methods: {
        getUserDetail() {
            axios({
                url: `${API_URL}/accounts/profile/${this.$route.params.name}`,
            })
                .then((res) => {
                    this.user = res.data;
                })
                .catch((err) => console.log(err));
        },
        getUserWishlist() {
            if (this.isLogin) {
                axios({
                    url: `${API_URL}/accounts/wishlist/`,
                    headers: {
                        Authorization: `Token ${this.$store.state.token}`,
                    },
                })
                    .then((res) => {
                        this.wishlist = res.data;
                    })
                    .catch((err) => console.log(err));
            }
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
