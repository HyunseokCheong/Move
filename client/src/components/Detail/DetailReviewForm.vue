<template>
    <div>
        <!-- <form @submit.prevent="createReview">
            <label for="content">내용: </label>
            <textarea
                id="content"
                cols="30"
                rows="10"
                v-model="content"
            ></textarea>
            <label for="rate">평점 : 0 ~ 5</label>
            <input type="number" min="0" max="5" id="rate" v-model="rate" />
            <input type="submit" value="제출" />
        </form> -->
    </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
    name: "DetailReviewForm",
    data() {
        return {
            movie: this.$route.params.id,
            reviews: [],
            reviewer: null,
            content: null,
            rate: null,
        };
    },
    methods: {
        createReview() {
            const movies = this.movie;
            const content = this.content;
            const rate = this.rate;
            if (!content) {
                alert("내용을 입력해주세요");
                return;
            } else if (!rate) {
                alert("평점을 입력해주세요");
                return;
            }
            axios({
                method: "post",
                url: `${API_URL}/movies/${this.movie}/create/`,
                data: {
                    movies: movies,
                    content: content,
                    rate: rate,
                },
                headers: {
                    Authorization: `Token ${this.$store.state.token}`,
                },
            })
                .then(() => {
                    console.log("done");
                    this.$router.go();
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style></style>
