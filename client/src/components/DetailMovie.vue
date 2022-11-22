<template>
    <div>
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
        <div v-if="movie">
            <p>제목 : {{ movie.movie.title }}</p>
            <p>개봉일 : {{ movie.movie.release_date }}</p>
            <img :src="poster_path" alt="poster" />
            <img :src="backdrop_path" alt="backdrop" />
            <p>내용 : {{ movie.movie.overview }}</p>
            <div>
                <span>감독</span>
                <div v-for="director in directors" :key="director.id">
                    <router-link
                        :to="{
                            name: 'director',
                            params: { id: director.id, name: director.name },
                        }"
                        tag="span"
                    >
                        {{ director.name }}
                    </router-link>
                </div>
            </div>
            <div>
                <span>장르</span>
                <div v-for="genre in genres" :key="genre.id">
                    <router-link
                        :to="{ name: 'genre', params: { id: genre.id } }"
                        tag="span"
                    >
                        {{ genre.name }}
                    </router-link>
                </div>
            </div>
            <div>
                <span>배우</span>
                <div v-for="actor in actors" :key="actor.id">
                    <router-link
                        :to="{ name: 'actor', params: { id: actor.id } }"
                        tag="span"
                    >
                        {{ actor.name }}
                    </router-link>
                </div>
            </div>
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
        backdrop_path() {
            return `https://www.themoviedb.org/t/p/original${this.movie.movie.backdrop_path}`;
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
            this.$store.dispatch("getMovieDetail", this.$route.params.id)
        },
        like() {
            console.log(this.$route.params.id)
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
