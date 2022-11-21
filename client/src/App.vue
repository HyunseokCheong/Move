<template>
    <div id="app">
        <div v-if="$store.state.token !== null">
            <NavBar />
            <div class="tmp"></div>
        </div>
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
@import "./assets/styles/app.css";
@import "./assets/styles/navbar.css";
@import "./assets/styles/movieslider.css";
@import "./assets/styles/tinder.css";
@import "./assets/styles/navbar.css";
@import "./assets/styles/popup.css";
</style>
