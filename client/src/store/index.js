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
        token: null,
        loggedInUser: null,
        users: [],
        movies: [],
        movie: null,
        recommends: [],
        genrePorts: [],
        directorPorts: [],
        actorPorts: [],
        searchData: [],
        randoms: [],
        reviewed_list: [],
        liked_list: [],
        wish_list: [],
        detail_page_user: null,
    },
    getters: {
        isLogin(state) {
            return state.token ? true : false;
        },
    },
    mutations: {
        SAVE_TOKEN(state, token) {
            state.token = token;
            router.push({ name: "home" });
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_MOVIES(state, movies) {
            state.movies = movies.slice(0, 30);
        },
        SET_MOVIE_DETAIL(state, movie) {
            state.movie = movie;
        },
        SET_RECOMMENDS(state, movies) {
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
            state.randoms = randoms;
        },
        GET_REVIEWEDLIST(state, reviewed_list) {
            state.reviewed_list = reviewed_list;
        },
        GET_LIKEDLIST(state, liked_list) {
            state.liked_list = liked_list;
        },
        GET_WISHLIST(state, wish_list) {
            state.wish_list = wish_list;
        },
    },
    actions: {
        getWishList(context) {
            axios({
                url: `${API_URL}/accounts/wishlist/`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then((res) => {
                    context.commit("GET_WISHLIST", res.data);
                })
                .catch((err) => console.log(err));
        },
        getLikedList(context, payload) {
            axios({
                url: `${API_URL}/accounts/userlist/`,
            })
                .then((res1) => {
                    for (let i = 0; i < res1.data.length; i++) {
                        if (res1.data[i].username == payload) {
                            let temp_userId = i + 1;
                            axios({
                                url: `${API_URL}/accounts/likemovie_list/${temp_userId}/`,
                                headers: {
                                    Authorization: `Token ${this.state.token}`,
                                },
                            })
                                .then((res) => {
                                    context.commit("GET_LIKEDLIST", res.data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            break;
                        }
                    }
                })
                .catch((err) => console.log(err));
        },
        getReviewedList(context, payload) {
            axios({
                url: `${API_URL}/accounts/userlist/`,
            })
                .then((res1) => {
                    for (let i = 0; i < res1.data.length; i++) {
                        if (res1.data[i].username == payload) {
                            let temp_userId = i + 1;
                            axios({
                                url: `${API_URL}/movies/reviewed_list/${temp_userId}`,
                                headers: {
                                    Authorization: `Token ${this.state.token}`,
                                },
                            })
                                .then((res) => {
                                    context.commit(
                                        "GET_REVIEWEDLIST",
                                        res.data
                                    );
                                })
                                .catch((err) => {
                                    console.log(err);
                                });

                            break;
                        }
                    }
                })
                .catch((err) => console.log(err));
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
        getMovieDetail(context, id) {
            axios({
                url: `${API_URL}/movies/${id}`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then((res) => {
                    context.commit("SET_MOVIE_DETAIL", res.data);
                })
                .catch((err) => {
                    console.log(err);
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
        movieLike(context, id) {
            axios({
                method: "post",
                url: `${API_URL}/accounts/likemovie/${id}/`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then(() => {
                    console.log("like");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        movieDislike(context, id) {
            axios({
                method: "post",
                url: `${API_URL}/accounts/dislikemovie/${id}/`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then(() => {
                    console.log("dislike");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        movieWish(context, id) {
            axios({
                method: "post",
                url: `${API_URL}/accounts/wishmovie/${id}/`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then(() => {
                    console.log("wish");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    modules: {},
});
