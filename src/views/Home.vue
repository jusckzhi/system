<template>
  <div class="home">
    <el-container>
      <el-header>header</el-header>
      <el-container>
        <el-aside width="220px" ref="leftNav">
          <left-nav></left-nav>
        </el-aside>
        <el-main>
          <button @click="open">展开/收起</button>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import leftNav from "../components/leftNav";
export default {
  name: "Home",
  components: {
    leftNav,
  },
  data: function () {
    return {
      width: "50px",
    };
  },
  methods: {
    open() {},
  },
};
</script>
<style lang="stylus">
.el-header
  position fixed
  top 0
  left 0
  width 100%
  background-color #B3C0D1
  color #333
  line-height 60px
.el-aside
  height 100vh
  padding-top 60px
  background-color #D3DCE6
  color #333
  text-align left
.el-main
  background-color #E9EEF3
  color #333
  line-height 160px
</style>