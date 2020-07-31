<!--
  name : 主页
  user : jusck
-->
<template>
  <div class="home">
    <el-container>
      <el-header>
        <header-title></header-title>
      </el-header>
      <el-container>
        <el-aside :width="width" ref="leftNav">
          <left-nav @changeStyle="unfold" @changeStyleClose="close"></left-nav>
        </el-aside>
        <el-main :class="marginTop">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import leftNav from "../components/leftNav";
import headerTitle from "../components/headerTitle";
export default {
  name: "Home",
  components: {
    leftNav,
    headerTitle,
  },
  data: function () {
    return {
      width: "220px",
      marginTop: "big",
    };
  },
  methods: {
    unfold() {
      this.width = "220px";
      this.marginTop = "big";
    },
    close() {
      this.width = "50px";
      this.marginTop = "small";
    },
  },
};
</script>
<style lang="stylus">
.el-header
  position fixed
  top 0
  left 0
  z-index 99
  width 100%
  height 50px !important
  background-color #B3C0D1
  color #333
  line-height 50px
.el-aside
  position fixed
  top 0
  left 0
  z-index 98
  height 100%
  padding-top 50px
  background-color #D3DCE6
  color #333
  text-align left
  overflow visible !important
.el-main
  width 100vw
  height 100vh
  padding 50px 0 0 50px !important
  box-sizing border-box
  background-color #E9EEF3
  color #333
  line-height 80px
.small
  padding-left 50px !important
.big
  padding-left 220px !important
.name h1
  text-align center
  padding-left 20px
</style>