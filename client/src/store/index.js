import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "@/router";

Vue.use(Vuex);
const API_URL = "http://127.0.0.1:8000";

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        movies: [],
        token: null,
        loggedInUser: null,
        users: [],
        recommends: [],
        genrePorts: [],
        directorPorts: [],
        actorPorts: [],
        searchData: [],
        randoms: [],
    },
    getters: {
        isLogin(state) {
            return state.token ? true : false;
        },
    },
    mutations: {
        SET_MOVIES(state, movies) {
            state.movies = movies.slice(0, 30);
        },
        SAVE_TOKEN(state, token) {
            state.token = token;
            router.push({ name: "home" });
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_RECOMMENDS(state, movies) {
            for (let i = 0; i < movies.length; i++) {
                let temp_poster_path = movies[i].backdrop_path;
                movies[i].temp_poster_path =
                    "https://www.themoviedb.org/t/p/original" +
                    temp_poster_path;
                let temp_backdrop_path = movies[i].backdrop_path;
                movies[i].backdrop_path =
                    "https://www.themoviedb.org/t/p/original" +
                    temp_backdrop_path;
            }
            state.recommends = movies;
        },
        SET_GENREPORT(state, movies) {
            state.genrePorts = movies;
        },
        SET_DIRECTORPORT(state, movies) {
            state.directorPorts = movies;
        },
        SET_ACTORPORT(state, movies) {
            state.actorPorts = movies;
        },
        SET_SEARCH(state, searchData) {
            state.searchData = searchData;
        },
        SET_RANDOMS(state, randoms) {
            // actor
            for (let i = 0; i < randoms.actor.length; i++) {
                let temp_backdrop_path = randoms.actor[i].backdrop_path;
                randoms.actor[i].backdrop_path =
                    "https://www.themoviedb.org/t/p/original" +
                    temp_backdrop_path;
                let temp_poster_path = randoms.actor[i].poster_path;
                randoms.actor[i].poster_path =
                    "https://www.themoviedb.org/t/p/original" +
                    temp_poster_path;
            }
            // director
            for (let i = 0; i < randoms.director.length; i++) {
                let temp_backdrop_path = randoms.director[i].backdrop_path;
                randoms.director[i].backdrop_path =
                    "https://www.themoviedb.org/t/p/original" +
                    temp_backdrop_path;
                let temp_poster_path = randoms.director[i].poster_path;
                randoms.director[i].poster_path =
                    "https://www.themoviedb.org/t/p/original" +
                    temp_poster_path;
            }
            // genre
            for (let i = 0; i < randoms.genre.length; i++) {
                let temp_backdrop_path = randoms.genre[i].backdrop_path;
                randoms.genre[i].backdrop_path =
                    "https://www.themoviedb.org/t/p/original" +
                    temp_backdrop_path;
                let temp_poster_path = randoms.genre[i].poster_path;
                randoms.genre[i].poster_path =
                    "https://www.themoviedb.org/t/p/original" +
                    temp_poster_path;
            }
            state.randoms = randoms;
        },
    },
    actions: {
        getMovie(context) {
            axios({
                url: `${API_URL}/movies/`,
            })
                .then((res) => {
                    context.commit("SET_MOVIES", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        signUp(context, payload) {
            axios({
                method: "post",
                url: `${API_URL}/api/signup/`,
                data: {
                    username: payload.username,
                    password1: payload.password1,
                    password2: payload.password2,
                },
            })
                .then((res) => {
                    this.state.loggedInUser = payload.username;
                    context.commit("SAVE_TOKEN", res.data.key);
                })
                .catch(() => alert("이미 있는 아이디입니다."));
        },
        logIn(context, payload) {
            axios({
                method: "post",
                url: `${API_URL}/api/login/`,
                data: {
                    username: payload.username,
                    password: payload.password,
                },
            })
                .then((res) => {
                    this.state.loggedInUser = payload.username;
                    context.commit("SAVE_TOKEN", res.data.key);
                })
                .catch(() => alert("회원가입 정보가 일치하지 않습니다."));
        },
        getUser(context) {
            axios({
                method: "get",
                url: `${API_URL}/accounts/ranking/`,
            }).then((res) => {
                context.commit("SET_USERS", res.data);
            });
        },
        getRecommend(context) {
            axios({
                url: `${API_URL}/movies/recommend/`,
            })
                .then((res) => {
                    context.commit("SET_RECOMMENDS", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getGenrePort(context, id) {
            axios({
                url: `${API_URL}/movies/genre/${id}`,
            })
                .then((res) => {
                    context.commit("SET_GENREPORT", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getDirectorPort(context, id) {
            axios({
                url: `${API_URL}/movies/director/${id}`,
            })
                .then((res) => {
                    context.commit("SET_DIRECTORPORT", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getActorPort(context, id) {
            axios({
                url: `${API_URL}/movies/actor/${id}`,
            })
                .then((res) => {
                    context.commit("SET_ACTORPORT", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getSearchData(context, keyword) {
            axios({
                method: "post",
                url: `${API_URL}/movies/search/`,
                data: {
                    keyword: keyword,
                },
            })
                .then((res) => {
                    context.commit("SET_SEARCH", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getRandom(context) {
            axios({
                url: `${API_URL}/movies/random/`,
            })
                .then((res) => {
                    context.commit("SET_RANDOMS", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    modules: {},
});
