<!--
  name : 健康计划
  user : jusck
-->
<template>
  <div class="menus">
    <div class="title">
      <h1>{{ pageName }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      pageName: "",
    };
  },
  methods: {
    init() {},
    input() {},
  },
  mounted() {
    this.pageName = this.$route.name;
    this.init();
  },
};
</script>
<style scoped lang='stylus'>
.menus
  height 100%
  background #fff
  .title
    background #fff
    text-align center
    h1
      font-size 20px
      color #939e9f
</style>