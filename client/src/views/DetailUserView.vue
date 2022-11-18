<template>
    <div>
        <div v-if="user">
            <p>
                {{ user.profile.username }}
            </p>
            <p>{{ user }}</p>
            <div v-for="review in user.reviews" :key="review.id">
                <div v-for="movie in movies" :key="movie.id">
                    <div v-if="movie.id == review.movies">
                        <router-link
                            :to="{
                                name: 'detail',
                                params: { id: review.movies },
                            }"
                            >{{ movie.title }}</router-link
                        >
                        {{ review }}
                    </div>
                </div>
            </div>
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
    computed: {
        movies() {
            return this.$store.state.movies;
        },
    },
    created() {
        this.getUserDetail();
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
