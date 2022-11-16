import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const API_URL = "http://127.0.0.1:8000";

export default new Vuex.Store({
    state: {
        movies: [],
        movies1: [],
        movies2: [],
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
    getters: {},
    mutations: {
        SET_MOVIES(state, movies) {
            state.movies = movies.slice(0, 30);
        },
        SET_MOVIES1(state, movies) {
            state.movies1 = movies.slice(0, 30);
        },
        SET_MOVIES2(state, movies) {
            state.movies2 = movies.slice(0, 30);
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
        getMovie1(context) {
            axios({
                url: `${API_URL}/movies/`,
            })
                .then((res) => {
                    context.commit("SET_MOVIES1", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getMovie2(context) {
            axios({
                url: `${API_URL}/movies/`,
            })
                .then((res) => {
                    context.commit("SET_MOVIES2", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getUser(context) {
            context.commit("SET_USERS");
        },
    },
    modules: {},
});
