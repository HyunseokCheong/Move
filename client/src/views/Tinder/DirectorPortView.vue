<template>
    <div class="tinder-div">
        <header class="tinder-div-header" @click="likeDirector">
            {{directorName}}
            <img v-if="portState==1" src="../../assets/images/likeActive_color.png"/>
            <img v-if="portState==0" src="../../assets/images/like_black.png"/>
            <br>
        </header>
        <br>
        <div v-if="queue.length>0">
            <div class="tinder-card-header">
                {{queue[0].movie.title}}
            </div>
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
                <img src="../../assets/images/upArrow_black.png" @click="decide('go')"/>
                <img src="../../assets/images/wish.png" @click="decide('wish')" />
                <img src="../../assets/images/like.png" @click="decide('like')" />
            </div>
        </div>
        <div class="end-tinder" v-if="queue.length == 0">
            <img @click="refresh" src="../../assets/images/rewind.png" />
            <router-link
                :to="{ name: 'home'}"
            >
                <img src="../../assets/images/home.png" />
            </router-link>
        </div>
    </div>
</template>
<script>
import TinderMain from '@/components/Tinder/TinderMain'

export default {
    name: "DirectorPortView",
    components: {
        TinderMain,
    },
    data: () => ({
        queue: [],
        offset: 0,
        history: []
    }),
    created() {
        this.getDirectorPort();
    },
    watch: {
    directorPorts() {
        this.mock()
    }
    },
    computed: {
        directorPorts() {
            return this.$store.state.directorPorts;
        },
        directorName() {
            return `${this.$store.state.directorPorts.name} 감독이 연출한 영화`;
        },
        portState() {
            return this.$store.state.directorstate;
        },
    },

    methods: {
        refresh() {
            this.$router.go();
        },
        getDirectorPort() {
            this.$store.dispatch("getDirectorPort", this.$route.params.id);
        },
        likeDirector() {
            this.$store.dispatch("likeDirector", this.$route.params.id);
        },
        mock(count = 5, append = true) {
            if (this.directorPorts.movie.length < 5){
                count = this.directorPorts.movie.length
            }
            const list = []
            for (let i = 0; i < count; i++) {
                list.push({ poster_path: this.directorPorts.movie[this.offset].poster_path, movie: this.directorPorts.movie[this.offset]})
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
                if (!(this.directorPorts.movie.length < 3)) {
                    this.mock()
                }   
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
            } else if (choice == 'wish') {
                this.$store.dispatch('movieWish', this.$refs.tinder.list[0].movie.id)
                this.$refs.tinder.decide(choice)
            } else {
                this.$router.push(`/movies/${this.$refs.tinder.list[0].movie.id}`)
            }
        }
    },
};
</script>

<style></style>
