<!--
  name : 健康信息科普维护
  user : jusck
-->
<template>
  <div class="name">
    <h1>
      这是
      <span style="color:red">{{ pageName }}</span> 页面
    </h1>
  </div>
</template>
<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      pageName: "",
    };
  },
  methods: {},
  mounted() {
    this.pageName = this.$route.name;
  },
};
</script>
<style scoped lang='stylus'></style>