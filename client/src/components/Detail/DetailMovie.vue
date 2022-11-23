<template>
    <div class="movie-detail-card">
        <div class="movie-detail-upbody">
            <h1>logo</h1>
        </div>
        <div class="movie-detail-downbody">
            <div class="movie-detail-poster">
                <img id="poster" :src="poster_path" alt="poster" />
            </div>
            <div class="movie-detail-descriptions">
                <div class="movie-detail-descriptions-top">
                    <div class="movie-detail-descriptions-top-left">
                        <div class="movie-detail-title">
                            {{ movie.movie.title }}
                            <div class="titie-star-rate">
                                <span class="fa fa-star movie-star"></span>
                                <span style="margin-left: 10px">
                                    {{ movie.movie.vote_average }}
                                </span>
                            </div>
                        </div>
                        <div class="movie-genres">
                            <span class="movie-sub">개요</span>
                            <span v-for="(genre, i) in genres" :key="i">
                                <router-link
                                    :to="{
                                        name: 'genre',
                                        params: {
                                            id: genre.id,
                                            name: genre.name,
                                        },
                                    }"
                                >
                                    <span v-if="i != genres.length - 1">
                                        {{ genre.name }} ·
                                    </span>
                                    <span v-if="i == genres.length - 1">
                                        {{ genre.name }}
                                    </span>
                                </router-link>
                            </span>
                        </div>
                        <div class="movie-release-date">
                            <span class="movie-sub">개봉</span>
                            {{ movie.movie.release_date }}
                        </div>
                        <div class="movie-directors">
                            <span class="movie-sub">감독</span>
                            <span v-for="(director, i) in directors" :key="i">
                                <router-link
                                    :to="{
                                        name: 'director',
                                        params: {
                                            id: director.id,
                                            name: director.name,
                                        },
                                    }"
                                >
                                    <span v-if="i != directors.length - 1">
                                        {{ director.name }} ·
                                    </span>
                                    <span v-if="i == directors.length - 1">
                                        {{ director.name }}
                                    </span>
                                </router-link>
                            </span>
                        </div>
                        <div class="movie-actors">
                            <span class="movie-sub">출연</span>
                            <span v-for="(actor, i) in actors" :key="i">
                                <router-link
                                    :to="{
                                        name: 'actor',
                                        params: {
                                            id: actor.id,
                                            name: actor.name,
                                        },
                                    }"
                                >
                                    <span v-if="i != actors.length - 1">
                                        {{ actor.name }} ·
                                    </span>
                                    <span v-if="i == actors.length - 1">
                                        {{ actor.name }}
                                    </span>
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="movie-detail-descriptions-overviews">
                    <div class="movie-sub">줄거리</div>
                    <div class="movie-detail-overview-body">
                        {{ movie.movie.overview }}
                    </div>
                </div>
            </div>
        </div>

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
    </div>
</template>

<script>
export default {
    name: "DetailMovie",
    computed: {
        movie() {
            return this.$store.state.movie;
        },
        genres() {
            return this.$store.state.movie.movie.genres;
        },
        directors() {
            return this.$store.state.movie.movie.directors;
        },
        actors() {
            return this.$store.state.movie.movie.actors;
        },
        state() {
            return this.$store.state.movie.state;
        },
        poster_path() {
            return `https://www.themoviedb.org/t/p/original${this.movie.movie.poster_path}`;
        },
        isLogin() {
            return this.$store.getters.isLogin;
        },
        userName() {
            return this.$store.state.loggedInUser;
        },
    },
    created() {
        this.getMovieDetail();
    },
    methods: {
        getMovieDetail() {
            this.$store.dispatch("getMovieDetail", this.$route.params.id);
        },
        like() {
            console.log(this.$route.params.id);
            this.$store.dispatch("movieLike", this.$route.params.id);
            this.$router.go();
        },
        dislike() {
            this.$store.dispatch("movieDislike", this.$route.params.id);
            this.$router.go();
        },
        addWishList() {
            this.$store.dispatch("movieWish", this.$route.params.id);
            this.$router.go();
        },
    },
};
</script>

<style></style>
