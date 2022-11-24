<template>
    <div class="nav">
        <span>
            <router-link to="/home" class="nav-font">
                <span style="color: red">M</span>
                <span style="color: white">ove</span>
            </router-link>
        </span>
        <span
            ><router-link to="/ranking" class="nav-font">랭킹</router-link>
        </span>
        <span>
            <router-link to="/recommend" class="nav-font">추천</router-link>
        </span>
        <input
            v-model="keyword"
            id="keyword"
            @keypress.enter="search(keyword)"
            type="search"
            placeholder="검색"
            class="searchInput"
        />
        <img @click="search(keyword)" type="submit" class="searchButton" />
        <span>
            <router-link
                :to="{
                    name: 'profile',
                    params: { name: userName },
                }"
                class="nav-font-right"
                >{{ userName }}</router-link
            ></span
        >
        <span @click="logOut" class="nav-font-right">로그아웃</span>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            windowTop: 0,
            keyword: null,
        };
    },
    mounted() {
        let that = this;
        window.addEventListener("scroll", function () {
            that.windowTop = this.window.scrollY;
        });
    },
    computed: {
        isLogin() {
            return this.$store.getters.isLogin;
        },
        userName() {
            return this.$store.state.loggedInUser;
        },
    },
    methods: {
        logOut() {
            this.$store.state.token = null;
            this.$store.state.userName = null;
            localStorage.removeItem("vuex");
            this.$router.push("/");
        },
        search(keyword) {
            this.$router.push(`/search/${keyword}`);
        },
    },
};
</script>

<style></style>
