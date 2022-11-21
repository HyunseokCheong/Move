<template>
    <div class="tinder-div">
        <header>
            <h2>영화 Tinder</h2>
            <br>
            <h4>좋아하는 영화라면 오른쪽, 싫어하는 영화라면 왼쪽으로 슬라이딩 해주세요.</h4>
            <small>호감도를 바탕으로 영화 추천 서비스를 제공합니다.</small>
            <br>
            <h5>호감을 표시한 영화 : </h5>
        </header>
        <br>
        <div v-if="queue.length>0">
            <TinderMain
            ref="tinder"
            key-name="poster_path"
            :queue.sync="queue"
            :max="3"
            :offset-y="10"
            allow-down
            @submit="onSubmit"
            >
                <template
                slot-scope="scope">
                <div
                class="pic"
                :style="{
                'background-image': `url(https://image.tmdb.org/t/p/w500${scope.data.poster_path})`
                }"
                />
                </template>
            </TinderMain>
            <div class="btns">
                <img src="../../assets/images/rewind.png" @click="decide('rewind')" />
                <img src="../../assets/images/nope.png" @click="decide('nope')" />
                <img src="../../assets/images/wish.png" @click="decide('wish')" />
                <img src="../../assets/images/like.png" @click="decide('like')" />
            </div>
        </div>
        <div v-if="queue.length == 0">
            다시하기
        </div>
    </div>
</template>

<script>
import TinderMain from '@/components/tinder/TinderMain'

export default {
    name: 'TinderView',
    components: { 
        TinderMain 
    },
    data: () => ({
        queue: [],
        offset: 0,
        history: []
    }),
    created() {
    // 랜덤 무비가 있을 때 mock을 실행해야 함.
    // watch를 쓰거나, async - await를 쓰는 방법 or promise로 .then 아래에 보여주기
        //ddfdsfdfdfsd
        this.getMovie();
    },
    watch: {
    // 해결!! watch
    movies() {
        this.mock()
    }
    },
    computed: {
        movies() {
            return this.$store.state.movies;
        },
    },
    methods: {
        getMovie() {
            this.$store.dispatch("getMovie");
        },
        mock(count = 5, append = true) {
            const list = []
            for (let i = 0; i < count; i++) {
                list.push({ poster_path: this.movies[this.offset].poster_path, movie: this.movies[this.offset]})
                this.offset++
            }
            if (append) {
                this.queue = this.queue.concat(list)
            } else {
                this.queue.unshift(...list)
            }
        },
        onSubmit({ item }) {
        if (this.queue.length < 3) {
            this.mock()
        }
        this.history.push(item)
        },
        async decide(choice) {
        if (choice === 'rewind') {
            if (this.history.length) {
                this.$refs.tinder.rewind(
                    this.history.splice(-Math.ceil(Math.random() * 3))
                )
            }
        } else if (choice === 'like') {
        // 여기서는 state에 push 해주기
            this.$store.dispatch('movieLike', this.$refs.tinder.list[0].movie.id)
            this.$refs.tinder.decide(choice)
        } else if (choice === 'nope') {
        // 여기서는 pop 해주기
            this.$store.dispatch('movieDislike', this.$refs.tinder.list[0].movie.id)
            this.$refs.tinder.decide(choice)
        } else {
            this.$store.dispatch('movieWish', this.$refs.tinder.list[0].movie.id)
            this.$refs.tinder.decide(choice)
        }
        }
    }
    }
</script>

<style>

</style>
