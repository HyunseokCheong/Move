<template>
    <div class="nav">
        <div class="items">
            <div class="left">
                <div class="routers">
                    <router-link to="/home" class="router">MAIN</router-link>
                    <router-link to="/ranking" class="router">RANKING</router-link>
                    <router-link to="/recommend" class="router">추천 영화</router-link>
                </div>
            </div>
            <div class="right">
                <div class="routers">
                    <input
                        v-model="keyword"
                        id="keyword"
                        @keypress.enter="search(keyword)"
                        class="searchInput"
                        type="search"
                        placeholder="Search"
                    />
                    <img
                        class="searchButton"
                        @click="search(keyword)"
                        type="submit"
                    />
                    <router-link
                        v-if="isLogin"
                        :to="{
                            name: 'profile',
                            params: { name: userName },
                        }"
                        class="router"
                        >{{ userName }}</router-link
                    >
                    <p v-if="isLogin" @click="logOut" class="router">LOGOUT</p>
                    <router-link v-if="!isLogin" to="/" class="router"
                        >LOGIN</router-link
                    >
                </div>
            </div>
        </div>
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
