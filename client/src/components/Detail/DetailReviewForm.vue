<template>
    <div class="movie-review-form-box">
        <form @submit.prevent class="movie-review-form">
            <div id="myform" class="movie-review-form-rate">
                <fieldset>
                    <input
                        type="radio"
                        name="rating"
                        value="5"
                        id="rate1"
                        v-model="rate"
                    /><label for="rate1">
                        <span class="fa fa-star"></span>
                    </label>
                    <input
                        type="radio"
                        name="rating"
                        value="4"
                        id="rate2"
                        v-model="rate"
                    /><label for="rate2">
                        <span class="fa fa-star"></span
                    ></label>
                    <input
                        type="radio"
                        name="rating"
                        value="3"
                        id="rate3"
                        v-model="rate"
                    /><label for="rate3">
                        <span class="fa fa-star"></span
                    ></label>
                    <input
                        type="radio"
                        name="rating"
                        value="2"
                        id="rate4"
                        v-model="rate"
                    /><label for="rate4">
                        <span class="fa fa-star"></span
                    ></label>
                    <input
                        type="radio"
                        name="rating"
                        value="1"
                        id="rate5"
                        v-model="rate"
                    /><label for="rate5">
                        <span class="fa fa-star"></span
                    ></label>
                </fieldset>
            </div>
            <div class="movie-review-form-bottom">
                <textarea
                    class="movie-review-form-content"
                    cols="30"
                    rows="1"
                    v-model="content"
                    placeholder="리뷰를 입력하세요"
                ></textarea>
                <img
                    src="./../../assets/images/enter_black.png"
                    @click="createReview()"
                />
            </div>
        </form>
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
