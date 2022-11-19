<template>
    <div :class="windowTop > 0 ? 'navActive' : 'nav'">
        <div class="items">
            <div class="left">
                <router-link to="/">MAIN</router-link> |
                <router-link to="/ranking">RANKING</router-link> |
            </div>
            <div class="right">
                <div v-if="isLogin">
                    <router-link
                        :to="{ name: 'detailuser', params: { name: userName } }"
                        >{{ userName }}</router-link
                    >
                    <button @click="logOut">로그아웃버튼</button>
                </div>
                <div v-if="!isLogin">
                    <router-link to="/login">LOGIN</router-link> |
                    <router-link to="/signup">SIGNUP</router-link> |
                </div>
                <div class="form-inline my-2 my-lg-0">
                    <input v-model="keyword" id="keyword" @keypress.enter="search(keyword)" class="form-control mr-sm-2" type="search" placeholder="Search">
                    <button @click="search(keyword)" class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
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
            this.$router.push(`/search/${keyword}`)
        },
        
    },
};
</script>

<style></style>
