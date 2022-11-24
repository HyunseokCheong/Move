<template>
    <div class="profile-card">
        <div class="profile">
            <div class="profile-left">
                <img class="profile-left-photo" :src="profile_image" alt="" />
            </div>
            <div class="profile-right">
                <div class="profile-right-top">
                    <div class="profile-right-top-left">
                        <span style="font-size: var(--header-font-size)">{{ user.profile.username }}</span
                        ><br />
                        <span style="color: var(--paragraph-text-color); font-size: var(--paragraph-font-size); margin-right: 5px">리뷰 : {{ user.profile.reviews_count }}개 ·</span>
                        <span style="color: var(--paragraph-text-color); font-size: var(--paragraph-font-size); margin-left: 5px">팔로워 : {{ user.profile.followings.length }}명</span>
                    </div>
                    <!-- 로그인 유저와 페이지 유저 불일치 -->
                    <div v-if="userName != this.$route.params.name" class="profile-right-top-right">
                        <div class="profile-right-top-right-1">
                            <button class="profile-button" v-if="is_following == 0" @click="userFollow">팔로우</button>
                            <button class="profile-button" v-else @click="userFollow">언팔로우</button>
                        </div>
                    </div>
                    <!-- 로그인 유저와 페이지 유저 일치 -->
                    <div v-if="userName == this.$route.params.name" class="profile-right-top-right">
                        <!-- 위시 -->
                        <div class="profile-right-top-right-1">
                            <button class="profile-button">
                                <router-link
                                    :to="{
                                        name: 'wishlist',
                                        params: {
                                            name: this.$route.params.name,
                                        },
                                    }"
                                    style="color: white"
                                    >위시리스트</router-link
                                >
                            </button>
                        </div>
                        <!-- 프사 -->
                        <div class="profile-right-top-right-2">
                            <button class="profile-button" v-if="!update_image" @click="imageToggle">프로필변경</button>
                            <div v-if="update_image">
                                <input type="file" accept="image/*" @change="imageChange" style="width: 100%; font-size: 15px; margin-bottom: 10px" />
                                <button class="profile-button" @click="imageUpdate">제출</button>
                                <button class="profile-button" @click="imageToggle">취소</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 장르, 감독, 배우 -->
                <div class="profile-right-mid">
                    <!-- 장르 -->
                    <span class="profile-mid-text">선호하는 장르</span><br />
                    <div v-if="user.profile.favorite_genres.length > 0">
                        <span v-for="(genre, i) in user.profile.favorite_genres" :key="i">
                            <router-link
                                :to="{
                                    name: 'genre',
                                    params: { id: genre.id, name: genre.name },
                                }"
                            >
                                <span class="profile-small-text" v-if="i != user.profile.favorite_genres.length - 1">{{ genre.name }} · </span>
                                <span class="profile-small-text" v-if="i == user.profile.favorite_genres.length - 1">{{ genre.name }}</span>
                            </router-link>
                        </span>
                    </div>
                    <div v-else><span class="profile-small-text">없음</span></div>
                    <!-- 감독 -->
                    <span class="profile-mid-text">좋아하는 감독</span><br />
                    <div v-if="user.profile.favorite_directors.length > 0">
                        <span v-for="(director, i) in user.profile.favorite_directors" :key="i">
                            <router-link :to="{ name: 'director', params: { id: director.id, name: director.name } }">
                                <span class="profile-small-text" v-if="i != user.profile.favorite_directors.length - 1"> {{ director.name }} · </span>
                                <span class="profile-small-text" v-if="i == user.profile.favorite_directors.length - 1"> {{ director.name }} </span>
                            </router-link>
                        </span>
                    </div>
                    <div v-else><span class="profile-small-text">없음</span></div>
                    <!-- 배우 -->
                    <span class="profile-mid-text">좋아하는 배우</span><br />
                    <div v-if="user.profile.favorite_actors.length > 0">
                        <span v-for="(actor, i) in user.profile.favorite_actors" :key="i">
                            <router-link :to="{ name: 'actor', params: { id: actor.id, name: actor.name } }">
                                <span class="profile-small-text" v-if="i != user.profile.favorite_actors.length - 1"> {{ actor.name }} · </span>
                                <span class="profile-small-text" v-if="i == user.profile.favorite_actors.length - 1"> {{ actor.name }} </span>
                            </router-link>
                        </span>
                    </div>
                    <div v-else><span class="profile-small-text">없음</span></div>
                </div>
                <!-- 캐로젤2개 -->
                <div class="profile-right-bottom">
                    <!-- 리뷰 남긴 영화 -->
                    <div class="user-review-list">
                        <div class="profile-mid-text">{{ user.profile.username }}이 리뷰한 영화</div>
                        <div class="user-review-list-body-empty" v-if="userReviewedMovies.length == 0">
                            <span>없음</span>
                        </div>
                        <div class="user-review-list-body" v-if="userReviewedMovies.length > 0">
                            <ccarousel :per-page="3" :navigate-to="0" :mouse-drag="false" :paginationEnabled="false" :navigationEnabled="true" :navigationClickTargetSize="9">
                                <slide2 v-for="userReviewedMovie in userReviewedMovies" :key="`00-${userReviewedMovie.id}`" :userReviewedMovie="userReviewedMovie">
                                    <UserReviewedMovie :userReviewedMovie="userReviewedMovie" />
                                </slide2>
                            </ccarousel>
                        </div>
                    </div>
                    <!-- 좋아요 누른 영화 -->
                    <div class="user-like-list">
                        <div class="profile-mid-text">{{ user.profile.username }}이 좋아하는 영화</div>
                        <div class="user-like-list-body-empty" v-if="userLikedMovies.length == 0">
                            <span>없음</span>
                        </div>
                        <div class="user-like-list-body" v-if="userLikedMovies.length != 0">
                            <ccarousel :per-page="3" :navigate-to="0" :mouse-drag="false" :paginationEnabled="false" :navigationEnabled="true" :navigationClickTargetSize="9">
                                <slide2 v-for="userLikedMovie in userLikedMovies" :key="`00-${userLikedMovie.id}`" :userLikedMovie="userLikedMovie">
                                    <UserLikedMovie :userLikedMovie="userLikedMovie" />
                                </slide2>
                            </ccarousel>
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
        };
    },
    computed: {
        user() {
            return this.$store.state.profile;
        },
        is_following() {
            return this.$store.state.is_following;
        },
        profile_image() {
            return `${API_URL}${this.$store.state.profile.profile.profile_image}`;
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
            this.update_image = !this.update_image;
        },
        imageChange(e) {
            const file = e.target.files;
            this.file = file;
        },
        imageUpdate() {
            if (this.file == null) {
                alert("선택된 파일이 없습니다.");
            } else {
                const profile_image = new FormData();
                profile_image.append("profile_image", this.file[0]);
                this.$store.dispatch("imageUpdate", profile_image);
                this.file = null;
                this.update_image = false;
                setTimeout(() => {
                    this.$router.go();
                }, 1000);
            }
        },
    },
};
</script>

<style scoped>
p {
    font-size: 20px;
}
html,
body {
    overflow: hidden;
}

#profile {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: visible;
    -webkit-transition: all 1500ms cubic-bezier(1, 0, 0, 1);
    -moz-transition: all 1500ms cubic-bezier(1, 0, 0, 1);
    -o-transition: all 1500ms cubic-bezier(1, 0, 0, 1);
    transition: all 1500ms cubic-bezier(1, 0, 0, 1); /* easeInOutExpo */

    -webkit-transition-timing-function: cubic-bezier(1, 0, 0, 1);
    -moz-transition-timing-function: cubic-bezier(1, 0, 0, 1);
    -o-transition-timing-function: cubic-bezier(1, 0, 0, 1);
    transition-timing-function: cubic-bezier(1, 0, 0, 1);
}
.follow-button {
    position: absolute;
    top: 40px;
    right: 40px;
    border-radius: 10px;
    padding: 5px 40px;
    background-color: #7b906f;
    cursor: pointer;
}
.wish-button {
    position: absolute;
    top: 40px;
    right: 40px;
    border-radius: 10px;
    padding: 5px 40px;
    background-color: #7b906f;
    cursor: pointer;
}

/* .photo {
    background-position: center;
    background-size: cover;
    display: inline-block;
    float: left;
    width: 40%;
    height: 100%;
    border-radius: 20px 0 0 20px;
}

.text-info-outer {
    display: inline-block;
    width: 60%;
    height: 100%;
    float: left;
}

.text-info-inner {
    position: relative;
    height: 100%;
    padding: 30px;
    padding-left: 0rem;
}
.text-info-inner > h1 {
    margin: 0 0 20px 0;
    text-transform: uppercase;
    font-size: 3em;
}
.text-info-inner > h3 {
    color: grey;
    text-transform: uppercase;
    font-size: 1em;
    letter-spacing: 0.1em;
    margin: 0;
}
.text-info-inner > h2 {
    display: inline-block;
    text-transform: uppercase;
    font-size: 0.8em;
    padding-right: 40px;
    color: grey;
}
.text-info-inner > p {
    line-height: 2em;
    margin-top: 40px;
}
.text-info-inner > img {
    position: absolute;
    opacity: 0.08;
    max-width: 80%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
}
.text-info-inner > .follow-button > h4 {
    text-transform: uppercase;
    letter-spacing: 0.1em;
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
} */
</style>
