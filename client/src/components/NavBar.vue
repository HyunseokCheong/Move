<template>
    <nav>
        <router-link to="/">MAIN</router-link> |
        <router-link to="/ranking">RANKING</router-link> |
        <router-link to="/login">LOGIN</router-link> |
        <router-link to="/signup">SIGNUP</router-link> |
        <router-link to="/mypage">MYPAGE</router-link>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
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
