<template>
    <div>
        <div v-if="user">
            <p>
                {{ user.profile.username }}
            </p>
            {{ user }}
        </div>
    </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";
export default {
    name: "DetailUserView",
    data() {
        return { user: null };
    },
    created() {
        this.getUserDetail(this.$route.params.name);
    },
    methods: {
        getUserDetail() {
            axios({
                url: `${API_URL}/accounts/profile/${this.$route.params.name}`,
            })
                .then((res) => {
                    this.user = res.data;
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style></style>
