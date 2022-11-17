<template>
    <div class="col-sector d-flex justify-content-between">
        <p>{{ index + 1 }}</p>
        <p>{{ user }}</p>
    </div>
</template>

<script>
export default {
    name: "UserRank",
    props: {
        user: Object,
        index: Number,
    },
};
</script>

<style></style>
