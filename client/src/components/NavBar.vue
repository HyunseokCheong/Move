<template>
    <nav>
        <router-link to="/">MAIN</router-link> |
        <router-link to="/ranking">RANKING</router-link> |
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
    </nav>
</template>

<script>
export default {
    name: "NavBar",
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
            console.log("logout");
        },
    },
};
</script>

<style>
nav {
    width: 90%;
    height: 60px;
    /*  */
    border: solid 1px black;
    /* 정렬 */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
