<template slot-scope="scope">
  <div
    class="pic"
    :style="{
      'background-image': `url(https://cn.bing.com//th?id=OHR.${scope.data.id}_UHD.jpg&pid=hp&w=720&h=1280&rs=1&c=4&r=0)`
    }"
  />
</template>

<script>
export default {

}
</script>

<style>
.vue-tinder {
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.v-move {
  transition: none !important;
}
.pointer-wrap {
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.tinder-card.nope .nope-pointer-wrap,
.tinder-card.like .like-pointer-wrap,
.tinder-card.super .super-pointer-wrap,
.tinder-card.down .down-pointer-wrap {
  opacity: 1 !important;
}
.tinder-card.nope .rewind-pointer-wrap,
.tinder-card.like .rewind-pointer-wrap,
.tinder-card.super .rewind-pointer-wrap,
.tinder-card.down .rewind-pointer-wrap {
  display: none;
}
</style>