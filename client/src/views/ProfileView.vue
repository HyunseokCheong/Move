<template>
    <div id="profile">
        <div class="profile-card">
        <div class="photo" :style="{'background-image': `url(${profile_image})`}"></div>
        <div class="text-info-outer">
        <div class="text-info-inner">
        <div v-if="userName != this.$route.params.name">
            <div class="follow-button" ><h4>Follow</h4></div>
        </div>
        <h3>ㅇㄹㄴㅇ</h3>
        <h1>{{ user.profile.username }}</h1>
        <h2>리뷰 : {{ user.profile.reviews_count }}개</h2>
        <h2>팔로워 : {{ user.profile.followings.length }}명</h2>
        <div class="profile-discription">
            <p>선호하는 장르</p>
            {{user.profile.favorite_genres}}
            <div v-if="user.profile.favorite_genres">
                <span v-for="(genre, i) in user.profile.favorite_genres" :key="i">
                    <router-link
                        :to="{
                            name: 'genre',
                            params: { id: genre.id, name: genre.name },
                        }"
                    >
                        <span v-if="i != user.profile.favorite_genres.length - 1">
                            {{ genre.name }} ·
                        </span>
                        <span v-if="i == user.profile.favorite_genres.length - 1">
                            {{ genre.name }}
                        </span>
                    </router-link>
                </span>
            </div>
            <div v-if="!user.profile.favorite_genres">
                <span>없음</span>
            </div>

            <p>좋아하는 감독</p>
            <div>

            </div>
            <p>좋아하는 배우</p>
            <div>

            </div>
            <span>{{ user.profile.username }}이 리뷰한 영화목록 보기</span>
            <div v-if="userName == this.$route.params.name">
                <span>나의 위시 리스트</span>
            </div>
        </div>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
// import { Carousel as Ccarousel } from "vue-carousel";
// import { Slide as Slide2 } from "vue-carousel";
// import UserLikedMovie from "@/components/UserLikedMovie";
// import UserReviewedMovie from "@/components/UserReviewedMovie";
// import UserWishedMovie from "@/components/UserWishedMovie";

const API_URL = "http://127.0.0.1:8000";

export default {
    name: "ProfileView",
    components: {
        // Ccarousel,
        // Slide2,
        // UserLikedMovie,
        // UserReviewedMovie,
        // UserWishedMovie,
    },
    computed: {
        user() {
            return this.$store.state.profile;
        },
        profile_image() {
            return `${API_URL}${this.$store.state.profile.profile.profile_image}`
        },
        isLogin() {
            return this.$store.getters.isLogin;
        },
        userName() {
            return this.$store.state.loggedInUser;
        },
        userReviewedMovies() {
            return this.$store.state.reviewed_list;
        },
        userLikedMovies() {
            return this.$store.state.liked_list;
        },
        userWishedMovies() {
            return this.$store.state.wished_list;
        },
    },
    created() {
        this.getProfile();
        this.getUser();
        this.getLikedList();
        this.getReviewedList();
        this.getWishedlist();
    },
    methods: {
        getLikedList() {
            this.$store.dispatch("getLikedList", this.$route.params.name);
        },
        getReviewedList() {
            this.$store.dispatch("getReviewedList", this.$route.params.name);
        },
        getWishedlist() {
            this.$store.dispatch("getWishedlist", this.$route.params.name);
        },
        getProfile() {
            this.$store.dispatch("getProfile", this.$route.params.name);
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

<style scoped>
    h1,h2,h3,h4{
    font-family:'Montserrat', sans-serif;
    }
    p{
    font-family: 'Libre Baskerville', serif;
    font-size: 20px;
    }
    html,body{
    overflow:hidden;
    }

    #profile{
        padding-top: 5rem;
        position:absolute;
        width:100%;
        height:100%;
        overflow:visible;
        -webkit-transition: all 1500ms cubic-bezier(1.000, 0.000, 0.000, 1.000); 
        -moz-transition: all 1500ms cubic-bezier(1.000, 0.000, 0.000, 1.000); 
            -o-transition: all 1500ms cubic-bezier(1.000, 0.000, 0.000, 1.000); 
                transition: all 1500ms cubic-bezier(1.000, 0.000, 0.000, 1.000); /* easeInOutExpo */

        -webkit-transition-timing-function: cubic-bezier(1.000, 0.000, 0.000, 1.000); 
        -moz-transition-timing-function: cubic-bezier(1.000, 0.000, 0.000, 1.000); 
            -o-transition-timing-function: cubic-bezier(1.000, 0.000, 0.000, 1.000); 
                transition-timing-function: cubic-bezier(1.000, 0.000, 0.000, 1.000);
    }
    .follow-button {
        background-color:#7b906f;
    }

    .profile-card{
        position:absolute;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
        border-radius:20px;
        width:80%;
        max-width:1500px;
        height:90%;
        background-color:white;
        -webkit-box-shadow: 0 16px 28px 0 rgba(0,0,0,0.22),0 25px 55px 0 rgba(0,0,0,0.21);
        -moz-box-shadow: 0 16px 28px 0 rgba(0,0,0,0.22),0 25px 55px 0 rgba(0,0,0,0.21);
            box-shadow: 0 16px 28px 0 rgba(0,0,0,0.22),0 25px 55px 0 rgba(0,0,0,0.21);
    }

    .photo{
    background-position:center;
    background-size:cover;
    display:inline-block;
    float:left;
    width:40%;
    height:100%;
    border-radius: 20px 0 0 20px;
    }

    .text-info-outer{
    display:inline-block;
    width:60%;
    height:100%;
    float:left;
    }

    .text-info-inner{
        position:relative;
        height:100%;
        padding:30px;
    }
    .text-info-inner > h1{
        margin:0 0 20px 0;
        text-transform:uppercase;
        font-size:3em;
    }
    .text-info-inner > h3{
        color:grey;
        text-transform:uppercase;
        font-size:1em;
        letter-spacing:.1em;
        margin:0;
    }
    .text-info-inner > h2{
        display:inline-block;
        text-transform:uppercase;
        font-size:.8em;
        padding-right:40px;
        color:grey;
    }
    .text-info-inner > p{
        line-height:2em;
        margin-top:40px;
    }
    .text-info-inner > img{
        position: absolute;
        opacity: .08;
        max-width: 80%;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
    }
    .text-info-inner > .follow-button{
        position:absolute;
        top:40px;
        right:40px;
        border-radius:10px;
        padding: 5px 40px;
        color:white;
        cursor:pointer;
    }
    .text-info-inner > .follow-button > h4{
        text-transform:uppercase;
        letter-spacing:.1em;
    }

    .profile-discription {
        margin-top: 3rem;
        margin-left: 3rem;
        display: flex;
        flex-direction: column;
        text-align: left;
    }
</style>>

