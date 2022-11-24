<template>
    <div>
        <div class="col-sector">
            <div v-if="index == 0" class="ranking-left">
                <img src="../assets/images/goldMedal.png" height="35" />
            </div>
            <div v-else-if="index == 1" class="ranking-left">
                <img src="../assets/images/silverMedal.png" height="35" />
            </div>
            <div v-else-if="index == 2" class="ranking-left">
                <img src="../assets/images/bronzeMedal.png" height="35" />
            </div>
            <div v-else class="ranking-left">
                <span>{{ index + 1 }}</span>
            </div>
            <router-link
                class="ranking-mid"
                :to="{ name: 'profile', params: { name: user.username } }"
            >
                {{ user.username }}</router-link
            >
            <span class="ranking-right">{{ user.reviews_count }}</span>
        </div>
        <hr />
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
