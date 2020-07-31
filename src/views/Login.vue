<!--
  name : 登录
  user : jusck
-->
<template>
  <div class="login">
    <img src="../assets/images/home_header_bg.jpg" alt />
    <div class="shade">
      <div class="user">
        <h1>Login Form</h1>
        <div class="username">
          <span class="iconfont icon-yonghu"></span>
          <input type="text" placeholder="Username" v-model="user.name" />
        </div>
        <div class="password">
          <span class="iconfont icon-mima"></span>
          <input
            :type="flag==true?'password':'text'"
            placeholder="Password"
            v-model="user.password"
          />
          <span
            :class="flag==true?'iconfont icon-yanjing':'iconfont icon-yanjing1'"
            id="eye"
            @click="changeType"
          ></span>
        </div>
        <div class="btn" @click="login">登录</div>
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
      user: {
        name: "",
        password: "",
      },
      flag: true,
    };
  },
  methods: {
    changeType() {
      this.flag = !this.flag;
    },
    login() {
      if (this.user.name == "" || this.user.password == "") {
        this.$message.error({
          message: "账号或密码不能为空",
          duration: 2000,
        });
        return;
      }
      if (this.user.name == "chenzhiqiang" && this.user.password == "123") {
        this.$message({
          message: "登录成功",
          type: "success",
        });

        // 登录成功
        // 用来标记登录没登录
        var storage = window.localStorage;
        storage.setItem("isLogin", true);
        storage.setItem("adminName", this.user.name);

        this.$router.push("/home");
      } else {
        this.$message.error({
          message: "账号或密码错误",
          duration: 2000,
        });
        return;
      }
    },
  },
  mounted() {},
  watch: {},
};
</script>
<style scoped lang='stylus'>
.login
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  overflow hidden
  img
    position absolute
    width 100%
    height 100%
    top 0
    left 0
  .shade
    width 100%
    height 100%
    position absolute
    z-index 99
    display flex
    justify-content center
    align-items center
    .user
      width 450px
      height 350px
      h1
        line-height 100px
        margin-bottom 30px
        font-size 36px
        text-align center
        font-weight bold
        color white
      input
        width 100%
        line-height 45px
        font-size 20px
        padding 0 45px
        box-sizing border-box
        background white
        outline none
        border none
        color #696969
      .username, .password
        position relative
        margin-bottom 20px
        span
          position absolute
          width 45px
          height 45px
          text-align center
          line-height 45px
          font-size 18px
          color #696969
        #eye
          top 0
          right 0
          cursor pointer
      .btn
        width 100%
        line-height 50px
        background #1a427f
        text-align center
        font-size 20px
        color white
        cursor pointer
</style>