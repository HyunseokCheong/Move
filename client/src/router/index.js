import Vue from "vue";
import VueRouter from "vue-router";
import IndexView from "@/views/IndexView";
import HomeView from "@/views/HomeView";
import DetailMovieView from "@/views/DetailMovieView";
import ProfileView from "@/views/ProfileView";
import RankingView from "@/views/RankingView";
import RecommendView from "@/views/Tinder/RecommendView";
import GenrePortView from "@/views/Tinder/GenrePortView";
import DirectorPortView from "@/views/Tinder/DirectorPortView";
import ActorPortView from "@/views/Tinder/ActorPortView";
import WishListView from "@/views/Tinder/WishListView";
import SearchView from "@/views/Tinder/SearchView";
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
        component: DetailMovieView,
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
        name: "profile",
        component: ProfileView,
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
        path: "/recommend",
        name: "recommend",
        component: RecommendView,
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
    {
        path: '/wishlist/:name',
        name: 'wishlist',
        component: WishListView,
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
