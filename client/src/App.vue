<template>
    <div id="app">
        <div v-if="$store.state.token !== null">
            <NavBar />
            <div class="tmp"></div>
        </div>
        <router-view />
        <Footer />
    </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default {
    name: "App",
    components: {
        NavBar,
        Footer,
    },
};
</script>
<style>
@import "./assets/styles/root.css";
@import "./assets/styles/navbar.css";
@import "./assets/styles/footer.css";
@import "./assets/styles/movieslider.css";
@import "./assets/styles/tinder.css";
@import "./assets/styles/navbar.css";
@import "./assets/styles/popup.css";
@import "./assets/styles/app.css";
@import "./assets/styles/navbar.css";
@import "./assets/styles/popup.css";
@import "./assets/styles/movieslider.css";
</style>
