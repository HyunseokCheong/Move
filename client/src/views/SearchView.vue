<template>
    <div class="col-sector">
        <SideBar />
        <div class="row-sector">
            <ccarousel
                :per-page="6"
                :navigate-to="0"
                :mouse-drag="false"
                :paginationEnabled="false"
                :navigationEnabled="true"
                :navigationClickTargetSize="9"
            >
                <slide2
                    v-for="userSearchedMovie in userSearchedMovies"
                    :key="`00-${userSearchedMovie.id}`"
                    :userSearchedMovie="userSearchedMovie"
                >
                    <UserSearchedMovie :userSearchedMovie="userSearchedMovie" />
                </slide2>
            </ccarousel>
        </div>
        <SideBar />
    </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import { Carousel as Ccarousel } from "vue-carousel";
import { Slide as Slide2 } from "vue-carousel";
import UserSearchedMovie from "@/components/UserSearchedMovie";

export default {
    name: "SearchView",
    components: {
        SideBar,
        Ccarousel,
        Slide2,
        UserSearchedMovie,
    },
    methods: {
        getSearchData() {
            console.log(this.$route.params.keyword);
            this.$store.dispatch("getSearchData", this.$route.params.keyword);
        },
    },
    computed: {
        userSearchedMovies() {
            return this.$store.state.searchData;
        },
    },
    created() {
        this.getSearchData();
    },
};
</script>

<style></style>
