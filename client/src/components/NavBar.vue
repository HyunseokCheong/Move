<template>
    <nav>
        <div v-if="isLogin">
            <p>안녕하세요{{ userName }}</p>
            <button @click="logOut">로그아웃버튼</button>
        </div>
        <div v-if="!isLogin">
            <router-link to="/login">LOGIN</router-link> |
            <router-link to="/signup">SIGNUP</router-link> |
        </div>
        <router-link to="/">MAIN</router-link> |
        <router-link to="/ranking">RANKING</router-link> |
        <!-- 디테일 페이지인데 로그인 된 유저 아이디 값을 변수로 -->
        <router-link :to="{ name: 'detailuser', params: { name: 'admin' } }"
            >admin</router-link
        >
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
            return this.$store.state.userName;
        },
    },
    methods: {
        logOut() {
            this.$store.state.token = null;
            this.$store.state.userName = null;
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
