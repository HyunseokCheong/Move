<template>
    <div id="app">
        <header>
            <NavBar />
        </header>
        <router-view />
    </div>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
    name: "App",
    components: {
        NavBar,
    },
};
</script>
<style>
@import "./assets/styles/navbar.css";
/* 전체 */
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*  */
    z-index: 2;
}
/* 현재 페이지 강조 */
nav a.router-link-exact-active {
    color: #42b983;
}
/* nav 정렬 */
header {
    display: flex;
    flex-direction: column;
    align-items: center;

    border: solid 1px black;
}
.col-sector {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;

    border: solid 1px black;
}
.row-sector {
    width: 90%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    border: solid 1px black;
}
</style>
