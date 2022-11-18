<template>
    <router-link
        :to="{ name: 'detail', params: { id: movie.id } }"
        tag="div"
        class="card"
    >
        <img :src="poster_path" class="card-img-top" alt="..." />
        <div class="card-body">
            <p class="card-text">{{ movie.title }}/{{ movie.id }}</p>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "RecommendMovie",
    props: {
        movie: Object,
    },
    computed: {
        poster_path() {
            return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${this.movie.poster_path}`;
        },
    },
};
</script>
<style scoped></style>