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
        profile: null,
        rankings: [],
        popularMovies: [],
        movie: null,
        recommends: [],
        genrePorts: [],
        directorPorts: [],
        actorPorts: [],
        searchDatas: [],
        randoms: [],
        liked_list: [],
        reviewed_list: [],
        wish_list: [],
        detail_page_user: null,
        is_following: null,
        state: null,
        genrestate: null,
        directorstate: null,
        actorstate: null,
        
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
        SET_PROFILE(state, profile) {
            state.profile = profile
        },
        SET_RANKINGS(state, rankings) {
            state.rankings = rankings;
        },
        SET_POPULAR_MOVIES(state, movies) {
            state.popularMovies = movies.slice(0, 30);
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
            state.searchDatas = searchData;
        },
        SET_RANDOMS(state, randoms) {
            state.randoms = randoms;
        },
        SET_LIKEDLIST(state, liked_list) {
            state.liked_list = liked_list;
        },
        SET_REVIEWEDLIST(state, reviewed_list) {
            state.reviewed_list = reviewed_list;
        },
        SET_WISHLIST(state, movies) {
            state.wish_list = movies;
        },

    },
    actions: {
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
        getProfile(context, name) {
            axios({
                method: "get",
                url: `${API_URL}/accounts/profile/${name}`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            }).then((res) => {
                this.state.is_following = res.data.is_following
                context.commit("SET_PROFILE", res.data);
            });
        },
        imageUpdate(context, formdata) {
            axios.post(`${API_URL}/accounts/image_update/`, formdata, {
                headers: {
                    Authorization: `Token ${this.state.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(res.data)
            });
        },
        userFollow(context, name) {
            axios({
                method: "get",
                url: `${API_URL}/accounts/follow/${name}/`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then(() => {
                    if (this.state.is_following == 1) {
                        this.state.is_following = 0
                    }
                    else {
                        this.state.is_following = 1
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getRanking(context) {
            axios({
                method: "get",
                url: `${API_URL}/accounts/ranking/`,
            }).then((res) => {
                context.commit("SET_RANKINGS", res.data);
            });
        },
        getPopularMovie(context) {
            axios({
                url: `${API_URL}/movies/popularmovie/`,
            })
                .then((res) => {
                    
                    context.commit("SET_POPULAR_MOVIES", res.data);
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
                    this.state.state = res.data.state
                    context.commit("SET_MOVIE_DETAIL", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getRecommend(context) {
            axios({
                url: `${API_URL}/movies/recommend/`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then((res) => {
                    console.log(1)
                    context.commit("SET_RECOMMENDS", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getGenrePort(context, id) {
            axios({
                url: `${API_URL}/movies/genre/${id}`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then((res) => {
                    console.log(res.data.port_state)
                    this.state.genrestate = res.data.port_state
                    context.commit("SET_GENREPORT", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getDirectorPort(context, id) {
            axios({
                url: `${API_URL}/movies/director/${id}`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then((res) => {
                    console.log(res.data.port_state)
                    this.state.directorstate = res.data.port_state
                    context.commit("SET_DIRECTORPORT", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getActorPort(context, id) {
            axios({
                url: `${API_URL}/movies/actor/${id}`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then((res) => {
                    console.log(res.data.port_state)
                    this.state.actorstate = res.data.port_state
                    context.commit("SET_ACTORPORT", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        likeGenre(context, id) {
            axios({
                url: `${API_URL}/accounts/likegenre/${id}`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
            .then(() => {
                if (this.state.genrestate == 1) {
                    this.state.genrestate = 0
                }  else {
                    this.state.genrestate = 1
                }
            })
        },
        likeDirector(context, id) {
            axios({
                url: `${API_URL}/accounts/likedirector/${id}`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
            .then(() => {
                if (this.state.directorstate == 1) {
                    this.state.directorstate = 0
                }  else {
                    this.state.directorstate = 1
                }
            })
        },
        likeActor(context, id) {
            axios({
                url: `${API_URL}/accounts/likeactor/${id}`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
            .then(() => {
                if (this.state.actorstate == 1) {
                    this.state.actorstate = 0
                }  else {
                    this.state.actorstate = 1
                }
                console.log(this.state.actorstate)
            })
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
                    if (this.state.state == 1) {
                        this.state.state = 0;
                    } else {
                        this.state.state = 1;
                    }
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
                    if (this.state.state == 2) {
                        this.state.state = 0;
                    } else {
                        this.state.state = 2;
                    }
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
                    if (this.state.state == 3) {
                        this.state.state = 0;
                    } else {
                        this.state.state = 3;
                    }
                    console.log("wish");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getWishList(context) {
            axios({
                method: "get",
                url: `${API_URL}/movies/wishlist/`,
                headers: {
                    Authorization: `Token ${this.state.token}`,
                },
            })
                .then((res) => {
                context.commit("SET_WISHLIST", res.data);
            });
        },
        getLikedList(context, name) {
            axios({
                url: `${API_URL}/movies/liked_list/${name}/`,
            })
                .then((res) => {
                context.commit("SET_LIKEDLIST", res.data);
            });
        },
        getReviewedList(context, name) {
            axios({
                url: `${API_URL}/movies/reviewed_list/${name}/`,
            })
                .then((res) => {
                context.commit("SET_REVIEWEDLIST", res.data);
            });
        },
    },
    modules: {},
});
