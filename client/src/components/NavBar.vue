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
    },
};
</script>

<style></style>
