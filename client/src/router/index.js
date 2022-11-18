import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView";
import DetailView from "@/views/DetailView";
import SignupView from "@/views/SignupView";
import LoginView from "@/views/LoginView";
import DetailUserView from "@/views/DetailUserView";
import RankingView from "@/views/RankingView";
import GenrePortView from '@/views/Port/GenrePortView'
import DirectorPortView from '@/views/Port/DirectorPortView';
import ActorPortView from '@/views/Port/ActorPortView';

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/movies/:id",
        name: "detail",
        component: DetailView,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignupView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/accounts/profile/:name",
        name: "detailuser",
        component: DetailUserView,
    },
    {
        path: "/ranking",
        name: "ranking",
        component: RankingView,
    },
    {
        path: "/genre/:id",
        name: "genre",
        component: GenrePortView,
    },
    {
        path: "/director/:id",
        name: "director",
        component: DirectorPortView,
    },
    {
        path: "/actor/:id",
        name: "actor",
        component: ActorPortView,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
