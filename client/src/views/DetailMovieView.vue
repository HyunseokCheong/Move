<template>
  <div class="movie-detail">
        <DetailMovie/>
        <DetailReviewList/>
        <DetailReviewForm/>
        <!-- <SideBar/> -->
  </div>
</template>

<script>
// import SideBar from '@/components/SideBar'
import DetailMovie from '@/components/Detail/DetailMovie'
import DetailReviewList from '@/components/Detail/DetailReviewList'
import DetailReviewForm from '@/components/Detail/DetailReviewForm'

export default {
    name: 'DatailMovieView',
    components: {
        // SideBar,
        DetailMovie,
        DetailReviewList,
        DetailReviewForm
    }
}
</script>

<style>
</style>