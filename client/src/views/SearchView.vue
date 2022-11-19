<template>
    <div>
        {{searchData}}
    </div>
</template>

<script>
export default {
  name: 'SearchView',
  methods: {
        getSearchData() {
            console.log(this.$route.params.keyword)
            this.$store.dispatch("getSearchData", this.$route.params.keyword);
        },
  },
  computed: {
        searchData() {
            return this.$store.state.searchData;
        },
  },
  created() {
    this.getSearchData();
  },
}
</script>

<style>

</style>