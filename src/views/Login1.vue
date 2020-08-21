<!--
  name : 登录
  user : jusck
-->
<template>
  <div class="login">
    <img src="../assets/images/home_header_bg.jpg" alt />
    <div class="shade">
      <div class="user">
        <h1>Health Butler</h1>
        <div class="username" v-if="cutFlag">
          <span class="iconfont icon-yonghu"></span>
          <input
            type="text"
            placeholder="Username"
            v-model="obj.busidata.svrdata.loginid"
            @keydown.enter="login"
          />
        </div>
        <div class="username" v-else>
          <span class="el-icon-phone"></span>
          <input
            type="text"
            placeholder="phone number"
            v-model="obj.busidata.svrdata.mobilenbr"
            @keydown.enter="login"
          />
        </div>
        <div class="password">
          <span class="iconfont icon-mima"></span>
          <input
            :type="flag==true?'password':'text'"
            placeholder="Password"
            v-model="obj.busidata.svrdata.loginpwd"
            @keydown.enter="login"
          />
          <span
            :class="flag==true?'iconfont icon-yanjing':'iconfont icon-yanjing1'"
            id="eye"
            @click="changeType"
          ></span>
        </div>
        <!-- 验证码 -->
        <div class="identifyCodes">
          <span class="iconfont icon-yanzhengma"></span>
          <input type="text" v-model="codes" placeholder="verification code" @keydown.enter="login" />
          <div class="login-code" @click="refreshCode">
            <!--验证码组件-->
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </div>
        <div is="el-button" class="btn" @click="login" :loading="loading">Login</div>
        <div @click="phone" class="cut">切换{{cut}}登录&gt;&gt;</div>
      </div>
    </div>
  </div>
</template>
<script>
import SIdentify from "../components/SIdentify";
import { api } from "../util/request";
import Qs from "qs";
export default {
  props: {
    msg: String,
  },
  components: {
    SIdentify,
  },
  data: function () {
    return {
      obj: {
        mobilet: "ORDERING",
        dataType: "JSON",
        clientver: "0.0.0",
        version: "0",
        protocolVer: "1.0.0",
        screenSize: "640x960",
        macAddress: "01-00-00-00-00-00",
        busidata: {
          handleSessionLost: "false",
          timeOut: "30000",
          service: "login",
          token: "",
          svrdata: { loginid: "", loginpwd: "", mobilenbr: "" },
        },
      },
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz",
      identifyCode: "",
      codes: "",
      flag: true,
      cutFlag: true,
      cut: "手机号码",
      loading: false,
      throttle: true, //节流效果控制
    };
  },
  methods: {
    // 切换登陆方式
    phone() {
      if (this.cut == "账号") {
        this.cutFlag = true;
        this.cut = "手机号码";
        this.obj.busidata.svrdata.loginid = "";
        this.obj.busidata.svrdata.loginpwd = "";
        this.codes = "";
      } else {
        this.cutFlag = false;
        this.cut = "账号";
        this.obj.busidata.svrdata.mobilenbr = "";
        this.obj.busidata.svrdata.loginpwd = "";
        this.codes = "";
      }
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 密码是否可见
    changeType() {
      this.flag = !this.flag;
    },
    //刷新验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },

    // 登录
    login() {
      if (
        this.obj.busidata.svrdata.loginid == "" ||
        this.obj.busidata.svrdata.loginpwd == ""
      ) {
        this.$message.error({
          message: "账号或密码不能为空",
          duration: 2000,
        });
        return;
      }

      // 验证码不为空
      if (this.codes == "") {
        this.$message.error({
          message: "请输入验证码",
          duration: 2000,
        });
      } else if (this.identifyCode.toLowerCase() != this.codes.toLowerCase()) {
        this.$message.error({
          message: "验证码错误",
          duration: 2000,
        });
        // 验证错误刷新验证码
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        this.codes = "";
      } else if (this.identifyCode.toLowerCase() == this.codes.toLowerCase()) {
        this.loading = true;
        if (this.throttle) {
          this.throttle = false;
          api({
            data: this.obj,
          })
            .then((res) => {
              console.log(res);
              this.throttle = true;
              if (res.data.resultCode !== -1) {
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                this.$router.push("/home/welcome");

                // 登录成功储存用户信息
                let logintoken = "";
                let loginid = "";
                let mobilenbr = "";
                let opername = "";
                let permissionResult = [];
                sessionStorage.setItem("loginid", res.data.loginid);
                sessionStorage.setItem("mobilenbr", res.data.mobilenbr);
                sessionStorage.setItem("logintoken", res.data.logintoken);
                sessionStorage.setItem("opername", res.data.opername);
                sessionStorage.setItem(
                  "permissionResult",
                  JSON.stringify(res.data.result)
                );
              } else {
                this.$message.error({
                  message: "账号或密码错误",
                });
                this.loading = false;
              }
            })
            .catch((err) => {
              this.throttle = true;
              console.log("出错了！");
              this.$message.error({
                message: "登录失败！请重新登录",
              });
              this.loading = false;
            });
        }

        //   // 登录成功
        //   // 用来标记登录没登录
        //   var storage = window.localStorage;
        //   storage.setItem("isLogin", true);
        //   storage.setItem("adminName", this.user.name);

        //
      }
    },
  },
  mounted() {
    // 初始化验证码
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
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
      height 400px
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
      .identifyCodes
        display flex
        justify-content space-between
        margin-bottom 20px
        position relative
        span
          position absolute
          width 45px
          height 45px
          text-align center
          line-height 45px
          font-size 18px
          color #696969
      .btn
        width 100%
        line-height 50px
        background #1a427f
        text-align center
        font-size 20px
        color white
        cursor pointer
        padding 0
        border none
        outline none
      .cut
        text-align right
        line-height 3rem
        color #244278
        cursor pointer
        user-select none
</style>