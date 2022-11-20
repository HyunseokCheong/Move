<template>
    <div :class="windowTop > 0 ? 'navActive' : 'nav'">
        <div class="items">
            <div class="left">
                <div :class="windowTop > 0 ? 'routersActive' : 'routers'">
                    <router-link to="/" class="router">MAIN</router-link>
                    <router-link to="/ranking" class="router"
                        >RANKING</router-link
                    >
                </div>
            </div>
            <div class="right">
                <div :class="windowTop > 0 ? 'routersActive' : 'routers'">
                    <div class="router">
                        <input
                            v-model="keyword"
                            id="keyword"
                            @keypress.enter="search(keyword)"
                            class="searchInput"
                            type="search"
                            placeholder="Search"
                        />
                        <img
                            v-if="windowTop == 0"
                            src="../assets/images/search_black.png"
                            alt="..."
                            @click="search(keyword)"
                            class="searchButton"
                            type="submit"
                        />
                        <img
                            v-if="windowTop != 0"
                            src="../assets/images/search_white.png"
                            alt="..."
                            @click="search(keyword)"
                            class="searchButton"
                            type="submit"
                        />
                    </div>
                    <router-link
                        v-if="isLogin"
                        :to="{
                            name: 'detailuser',
                            params: { name: userName },
                        }"
                        class="router"
                        >{{ userName }}</router-link
                    >
                    <p v-if="isLogin" @click="logOut" class="router">LOGOUT</p>
                    <router-link v-if="!isLogin" to="/login" class="router"
                        >LOGIN</router-link
                    >
                    <router-link v-if="!isLogin" to="/signup" class="router"
                        >SIGNUP</router-link
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
            this.$router.go();
        },
        search(keyword) {
            this.$router.push(`/search/${keyword}`);
        },
    },
};
</script>

<style></style>
