<template>
    <div class="tinder-div">
        <header>
            <h2>{{genreName}}</h2>
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
                slot-scope="scope"
                >
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
                <img src="../../assets/images/wish.png" @click="decide('go')"/>
                <img src="../../assets/images/wish.png" @click="decide('wish')" />
                <img src="../../assets/images/like.png" @click="decide('like')" />
            </div>
        </div>
        <div v-if="queue.length == 0">
            <img @click="refresh" src="../../assets/images/rewind.png" />
            <router-link
                :to="{ name: 'home'}"
            >
                <h1>집이미지</h1>
            </router-link>
        </div>
    </div>
</template>
<script>
import TinderMain from '@/components/tinder/TinderMain'

export default {
    name: "GenrePortView",
    components: {
        TinderMain,
    },
    data: () => ({
        queue: [],
        offset: 0,
        history: []
    }),
    created() {
        this.getGenrePort();
    },
    watch: {
    genrePorts() {
        this.mock()
    }
    },
    computed: {
        genrePorts() {
            return this.$store.state.genrePorts;
        },
        genreName() {
            return `${this.$store.state.genrePorts.name} 장르의 인기 영화`;
        },
    },

    methods: {
        refresh() {
            this.$router.go();
        },
        getGenrePort() {
            this.$store.dispatch("getGenrePort", this.$route.params.id);
        },
        mock(count = 5, append = true) {
            if (this.genrePorts.movie.length < 5){
                count = this.genrePorts.movie.length
            }
            const list = []
            for (let i = 0; i < count; i++) {
                list.push({ poster_path: this.genrePorts.movie[this.offset].poster_path, movie: this.genrePorts.movie[this.offset]})
                this.offset++
                console.log(list[0].movie.id)
            }
            if (append) {
                this.queue = this.queue.concat(list)
            } else {
                this.queue.unshift(...list)
            }
        },
        onSubmit({ item }) {
            if (this.queue.length < 3) {
                if (!(this.genrePorts.movie.length < 3)) {
                    this.mock()
                }   
            }
            this.history.push(item)
        },
        async decide(choice) {
            if (choice === 'rewind') {
                console.log(this.history.length)
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
            } else if (choice == 'wish') {
                this.$store.dispatch('movieWish', this.$refs.tinder.list[0].movie.id)
                this.$refs.tinder.decide(choice)
            } else {
                console.log(this.$refs.tinder.list[0].movie.id)
                this.$router.push(`/movies/${this.$refs.tinder.list[0].movie.id}`)
            }
        }
    },
};
</script>

<style></style>
