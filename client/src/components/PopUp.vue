<template>
    <div class="popupBox">
        <p>{{ movieObj.title }}</p>
    </div>
</template>

<script>
export default {
    name: "PopUp",
    props: {
        movieObj: Object,
    },
};
</script>

<style></style>
