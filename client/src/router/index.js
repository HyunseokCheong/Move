import Vue from "vue";
import VueRouter from "vue-router";
import IndexView from "@/views/IndexView";
import HomeView from "@/views/HomeView";
import DetailView from "@/views/DetailView";
import DetailUserView from "@/views/DetailUserView";
import RankingView from "@/views/RankingView";
import GenrePortView from "@/views/Port/GenrePortView";
import DirectorPortView from "@/views/Port/DirectorPortView";
import ActorPortView from "@/views/Port/ActorPortView";
import SearchView from "@/views/SearchView";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "index",
        component: IndexView,
    },
    {
        path: "/home",
        name: "home",
        component: HomeView,
        beforeEnter(to, from, next){
            if(store.getters['isLogin'] === true){
                next()
            }else{
                next('/login')
            }
        },
    },
    {
        path: "/movies/:id",
        name: "detail",
        component: DetailView,
        beforeEnter(to, from, next){
            if(store.getters['isLogin'] === true){
                next()
            }else{
                next('/login')
            }
        },
    },
    {
        path: "/accounts/profile/:name",
        name: "detailuser",
        component: DetailUserView,
        beforeEnter(to, from, next){
            if(store.getters['isLogin'] === true){
                next()
            }else{
                next('/login')
            }
        },
    },
    {
        path: "/ranking",
        name: "ranking",
        component: RankingView,
        beforeEnter(to, from, next){
            if(store.getters['isLogin'] === true){
                next()
            }else{
                next('/login')
            }
        },
    },
    {
        path: "/genre/:id",
        name: "genre",
        component: GenrePortView,
        beforeEnter(to, from, next){
            if(store.getters['isLogin'] === true){
                next()
            }else{
                next('/login')
            }
        },
    },
    {
        path: "/director/:id/:name",
        name: "director",
        component: DirectorPortView,
        beforeEnter(to, from, next){
            if(store.getters['isLogin'] === true){
                next()
            }else{
                next('/login')
            }
        },
    },
    {
        path: "/actor/:id",
        name: "actor",
        component: ActorPortView,
        beforeEnter(to, from, next){
            if(store.getters['isLogin'] === true){
                next()
            }else{
                next('/login')
            }
        },
    },
    {
        path: '/search/:keyword',
        name: 'Search',
        component: SearchView,
        beforeEnter(to, from, next){
            if(store.getters['isLogin'] === true){
                next()
            }else{
                next('/login')
            }
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
