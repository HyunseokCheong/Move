<template>
    <div>
        <!-- {{ userLikedMovie }} -->
        <div v-if="movie">
            {{ movie }}
        </div>
    </div>
    <!-- <div v-if="movie">
        {{ userLikedMovie }}
        {{ movie }}
    </div> -->
</template>

<script>
export default {
    name: "UserLikedMovie",
    data() {
        return { movie: null };
    },
    props: {
        userLikedMovie: Object,
        movies: Array,
        recommend: Array,
    },
    created() {
        this.getMovie();
    },
    methods: {
        getMovie() {
            for (let i = 0; i < this.movies.length; i++) {
                if (this.userLikedMovie.ratedmovie == this.movies[i].id) {
                    this.movie = this.movies[i];
                    break;
                }
            }
            // for (let j = 0; j < this.recommend.length; j++) {
            //     if (this.userLikedMovie.ratedmovie == this.recommend[j].id) {
            //         this.movie = this.recommend[j];
            //         break;
            //     }
            // }
        },
    },
};
</script>
