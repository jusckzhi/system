<template>
  <div class="headerTitle">
    <div class="left">
      <div class="logo">
        <img src="../assets/images/favicon.jpg" alt />
      </div>
      <p>新融汇通健康管家V0.1</p>
    </div>
    <div class="right">
      <div class="username">
        <span>你好：{{username?username:""}}</span>
        <div class="sub"></div>
        <div class="user">
          <ul>
            <li>用户信息</li>
            <li>修改密码</li>
            <li @click="out">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    msg: String,
  },
  data: function () {
    return {
      username: localStorage.getItem("adminName"),
    };
  },
  methods: {
    out() {
      this.$router.replace("/login");
    },
  },
  mounted() {},
};
</script>
<style scoped lang='stylus'>
.headerTitle
  width 100%
  height 100%
  display flex
  justify-content space-between
  .left
    width 40%
    height 100%
    display flex
    justify-content left
    align-items center
    .logo
      width 40px
      height 30px
      img
        display block
        width 100%
        height 100%
    p
      color #fff
      font-size 18px
  .right
    width 40%
    height 100%
    display flex
    justify-content flex-end
    .username
      text-align center
      height 100%
      color #696969
      display flex
      flex-direction column
      align-items center
      transition all 1s
      cursor pointer
      &:hover .sub
        animation borderbottom 1s
        animation-fill-mode forwards
        transition all 1s
        @keyframes borderbottom
          0%
            width 0%
          100%
            width 100%
      &:hover span
        color #fff
      &:hover .user
        display block
      span
        line-height 0px
        margin 25px 0 15px
        color #7e8c8d
      .sub
        bottom 5px
        width 0%
        height 2px
        background #fff
      .user
        width 120px
        background #696969
        position fixed
        top 53px
        right 0px
        padding 5px 0
        display none
        li
          color #fff
          line-height 40px
          font-size 14px
          &:hover
            background #9f9f9f
</style>