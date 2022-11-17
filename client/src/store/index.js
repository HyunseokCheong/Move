import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);
const API_URL = "http://127.0.0.1:8000";

export default new Vuex.Store({
    state: {
        movies: [],
        token: null,
        users: [
            {
                id: 1,
                name: "CHS",
                cnt: 10,
            },
            {
                id: 2,
                name: "KWW",
                cnt: 5,
            },
            {
                id: 3,
                name: "JJY",
                cnt: 100,
            },
        ],
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
        SET_USERS(state) {
            state.users.sort(function compare(a, b) {
                return b.cnt - a.cnt;
            });
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
                .then((res) => context.commit("SAVE_TOKEN", res.data.key))
                .catch((err) => console.log(err));
        },
        logIn(context, payload) {
            axios({
                method: "post",
                url: `${API_URL}/api/login/`,
                data: {
                    username: payload.username,
                    password: payload.password,
                },
            }).then((res) => {
                context.commit("SAVE_TOKEN", res.data.key);
            });
        },
        getUser(context) {
            context.commit("SET_USERS");
        },
    },
    modules: {},
});
