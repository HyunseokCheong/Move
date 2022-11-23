<template>
    <div class="col-sector d-flex justify-content-between">
        <p>{{ index + 1 }}</p>
        <router-link
            :to="{ name: 'profile', params: { name: user.username } }"
        >
            {{ user.username }}</router-link
        >
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
