<template>
    <div id="profile">
        <div class="profile-card">
        <div class="photo" :style="{'background-image': `url(${profile_image})`}"></div>
        <div class="text-info-outer">
        <div class="text-info-inner">
        <div v-if="userName != this.$route.params.name">
            <div class="follow-button" v-if="is_following==0" @click="userFollow"><h4>Follow</h4></div>
            <div class="follow-button" v-if="is_following==1" @click="userFollow"><h4>UnFollow</h4></div>
        </div>
        <div v-if="userName == this.$route.params.name">
            <router-link
                :to="{
                    name: 'wishlist',
                    params: { name: this.$route.params.name },
                }"
            >
                <div class="wish-button" ><h4>Wish List</h4></div>
            </router-link>
        </div>
        <h1>{{ user.profile.username }}</h1>
        <h2>리뷰 : {{ user.profile.reviews_count }}개</h2>
        <h2>팔로워 : {{ user.profile.followings.length }}명</h2>
        <div class="profile-discription">
            <div class="profile-discription-genres">
                <p>선호하는 장르</p>
                <div v-if="user.profile.favorite_genres.length > 0">
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
                <div v-if="user.profile.favorite_genres.length == 0">
                    <span>없음</span>
                </div>
            </div>
            <div class="profile-discription-directors">
                <p>좋아하는 감독</p>
                <div v-if="user.profile.favorite_directors.length > 0">
                    <span v-for="(director, i) in user.profile.favorite_directors" :key="i">
                        <router-link
                            :to="{
                                name: 'director',
                                params: { id: director.id, name: director.name },
                            }"
                        >
                            <span v-if="i != user.profile.favorite_directors.length - 1">
                                {{ director.name }} ·
                            </span>
                            <span v-if="i == user.profile.favorite_directors.length - 1">
                                {{ director.name }}
                            </span>
                        </router-link>
                    </span>
                </div>
                <div v-if="user.profile.favorite_directors.length == 0">
                    <span>없음</span>
                </div>
            </div>
            <div class="profile-discription-actors">
                <p>좋아하는 배우</p>
                <div v-if="user.profile.favorite_actors.length > 0">
                    <span v-for="(actor, i) in user.profile.favorite_actors" :key="i">
                        <router-link
                            :to="{
                                name: 'actor',
                                params: { id: actor.id, name: actor.name },
                            }"
                        >
                            <span v-if="i != user.profile.favorite_actors.length - 1">
                                {{ actor.name }} ·
                            </span>
                            <span v-if="i == user.profile.favorite_actors.length - 1">
                                {{ actor.name }}
                            </span>
                        </router-link>
                    </span>
                </div>
                <div v-if="user.profile.favorite_actors.length == 0">
                    <span>없음</span>
                </div>
            </div>
            <div class="user-review-list">
                <div class="user-review-list-header">
                    {{ user.profile.username }}이 리뷰한 영화
                </div>
                <div class="user-review-list-body-empty" v-if="userReviewedMovies.length == 0">
                    <span>없음</span>
                    
                </div>
                <div class="user-review-list-body" v-if="userReviewedMovies.length > 0">
                    <ccarousel
                        :per-page="3"
                        :navigate-to="0"
                        :mouse-drag="false"
                        :paginationEnabled="false"
                        :navigationEnabled="true"
                        :navigationClickTargetSize="9"
                    >
                        <slide2
                            v-for="userReviewedMovie in userReviewedMovies"
                            :key="`00-${userReviewedMovie.id}`"
                            :userReviewedMovie="userReviewedMovie"
                        >
                            <UserReviewedMovie
                                :userReviewedMovie="userReviewedMovie"
                            />
                        </slide2>
                    </ccarousel>
                </div>
            </div>
            <div class="user-like-list">
                <div class="user-like-list-header">
                    {{ user.profile.username }}이 좋아하는 영화
                </div>
                <div class="user-like-list-body-empty" v-if="userLikedMovies.length == 0">
                    <span>없음</span>
                </div>
                <div class="user-like-list-body" v-if="userLikedMovies.length != 0">
                    <ccarousel
                        :per-page="3"
                        :navigate-to="0"
                        :mouse-drag="false"
                        :paginationEnabled="false"
                        :navigationEnabled="true"
                        :navigationClickTargetSize="9"
                    >
                        <slide2
                            v-for="userLikedMovie in userLikedMovies"
                            :key="`00-${userLikedMovie.id}`"
                            :userLikedMovie="userLikedMovie"
                        >
                            <UserLikedMovie
                                :userLikedMovie="userLikedMovie"
                            />
                        </slide2>
                    </ccarousel>
                </div>  
            </div>
            <div v-if="userName == this.$route.params.name" class="user-profile-update">
                <p v-if="!update_image" @click="imageToggle">프로필 사진 변경하기</p>
                <div v-if="update_image">
                    <input type="file" accept="image/*" @change="imageChange"/>
                    <p @click="imageUpdate">버튼</p>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
import { Carousel as Ccarousel } from "vue-carousel";
import { Slide as Slide2 } from "vue-carousel";
import UserLikedMovie from "@/components/Profile/UserLikedMovie";
import UserReviewedMovie from "@/components/Profile/UserReviewedMovie";

const API_URL = "http://127.0.0.1:8000";

export default {
    name: "ProfileView",
    components: {
        Ccarousel,
        Slide2,
        UserLikedMovie,
        UserReviewedMovie,
    },
    data() {
        return {
            update_image: false,
            file: null,
        }
    },
    computed: {
        user() {
            return this.$store.state.profile;
        },
        is_following() {
            return this.$store.state.is_following
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
    },
    created() {
        this.getProfile();
        this.getLikedList();
        this.getReviewedList();
    },
    methods: {
        getLikedList() {
            this.$store.dispatch("getLikedList", this.$route.params.name);
        },
        getReviewedList() {
            this.$store.dispatch("getReviewedList", this.$route.params.name);
        },
        getProfile() {
            this.$store.dispatch("getProfile", this.$route.params.name);
        },
        userFollow() {
            this.$store.dispatch("userFollow", this.$route.params.name);
        },
        imageToggle() {
            this.update_image = true;
        },
        imageChange(e) {
            const file = e.target.files;
            this.file = file
            },
        imageUpdate() {
            if (this.file == null) {
                alert("선택된 파일이 없습니다.")
            }
            else {
                const profile_image = new FormData()
                profile_image.append('profile_image', this.file[0])
                this.$store.dispatch("imageUpdate", profile_image);
                this.file = null;
                this.update_image = false;
                setTimeout(() => {
                this.$router.go();
                }, 1000);
            }

            
        }
    },
}
</script>

<style scoped>
    h1,h2,h3,h4{
    }

    p{
    font-size: 20px;
    }
    html,body{
    overflow:hidden;
    }

    #profile{
        display: flex;
        flex-wrap: wrap;
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
        position:absolute;
        top:40px;
        right:40px;
        border-radius:10px;
        padding: 5px 40px;
        background-color:#7b906f;
        cursor:pointer;
    }
    .wish-button {
        position:absolute;
        top:40px;
        right:40px;
        border-radius:10px;
        padding: 5px 40px;
        background-color:#7b906f;
        cursor:pointer;
    }

    .profile-card{
        display: flex;
        flex-wrap: wrap;
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
        padding-left: 0rem;
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
    .text-info-inner > .follow-button > h4{
        text-transform:uppercase;
        letter-spacing:.1em;
    }

    .profile-discription {
        margin-left: 3rem;
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    .profile-discription-genres {
        margin-bottom: 1rem;
    }
    .profile-discription-directors {
        margin-bottom: 1rem;
    }
    .profile-discription-actors {
        margin-bottom: 1rem;
    }
    .user-review-list-body-empty {
        margin-top: 1rem;
        margin-bottom: 7rem;
    }

</style>>

