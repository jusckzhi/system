<!-- 角色权限-->
<template>
  <div class="bg" v-if="msgs.showMsg">
    <div class="jurisdiction">
      <i class="el-icon-circle-close" id="close" @click.self="cancel"></i>
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="menucode"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        id="tree"
      ></el-tree>
      <div class="btn">
        <el-button type="text" size="medium" @click="getCheckedKeys">修改权限</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["msgs"],
  data() {
    return {
      res: {
        result: [
          {
            leafflag: "0",
            loginid: "999",
            loginpwd: "999",
            menucode: "110000",
            menuname: "用户管理",
            menuremark: "",
            menuurl: "",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "0",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "110100",
            menuname: "用户查询",
            menuremark: "",
            menuurl: "/home/userquery",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "110000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "110200",
            menuname: "用户统计",
            menuremark: "",
            menuurl: "/home/userstatistics",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "110000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "110300",
            menuname: "健康档案查询",
            menuremark: "",
            menuurl: "/home/healthfile",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "110000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "110400",
            menuname: "健康计划管理",
            menuremark: "",
            menuurl: "/home/healthplan",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "110000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "110500",
            menuname: "健康咨询管理",
            menuremark: "",
            menuurl: "/home/",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "110000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "0",
            loginid: "999",
            loginpwd: "999",
            menucode: "120000",
            menuname: "渠道管理",
            menuremark: "",
            menuurl: "",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "0",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "120100",
            menuname: "渠道信息维护",
            menuremark: "",
            menuurl: "/home/channelmanager",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "120000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "120200",
            menuname: "渠道用户统计",
            menuremark: "",
            menuurl: "/home/channeluser",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "120000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "120300",
            menuname: "渠道佣金结算",
            menuremark: "",
            menuurl: "/home/channelcommission",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "120000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "120400",
            menuname: "渠道订单管理",
            menuremark: "",
            menuurl: "/home/channelorder",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "120000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "0",
            loginid: "999",
            loginpwd: "999",
            menucode: "130000",
            menuname: "服务站管理",
            menuremark: "",
            menuurl: "",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "0",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "130100",
            menuname: "服务站信息维护",
            menuremark: "",
            menuurl: "/home/serviceinformation",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "130000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "130200",
            menuname: "服务站用户统计",
            menuremark: "",
            menuurl: "/home/serviceuser",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "130000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "130300",
            menuname: "服务站佣金结算",
            menuremark: "",
            menuurl: "/home/servicefees",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "130000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "130400",
            menuname: "服务站订单管理",
            menuremark: "",
            menuurl: "/home/serviceorder",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "130000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "0",
            loginid: "999",
            loginpwd: "999",
            menucode: "140000",
            menuname: "健康科普管理",
            menuremark: "",
            menuurl: "",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "0",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "140100",
            menuname: "科普信息维护",
            menuremark: "",
            menuurl: "/home/maintain",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "140000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "0",
            loginid: "999",
            loginpwd: "999",
            menucode: "180000",
            menuname: "操作员管理",
            menuremark: "",
            menuurl: "",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "0",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "180100",
            menuname: "角色管理",
            menuremark: "",
            menuurl: "",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "180000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "180200",
            menuname: "平台操作员管理",
            menuremark: "",
            menuurl: "/home/platform",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "180000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "180300",
            menuname: "渠道操作员管理",
            menuremark: "",
            menuurl: "/home/channel",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "180000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "180400",
            menuname: "服务站操作员管理",
            menuremark: "",
            menuurl: "/home/service",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "180000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "0",
            loginid: "999",
            loginpwd: "999",
            menucode: "190000",
            menuname: "系统参数管理",
            menuremark: "",
            menuurl: "",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "0",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "190100",
            menuname: "菜单管理",
            menuremark: "",
            menuurl: "/home/menus",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "190000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "190200",
            menuname: "数据字典维护",
            menuremark: "",
            menuurl: "/home/datadictionary",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "190000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
          {
            leafflag: "1",
            loginid: "999",
            loginpwd: "999",
            menucode: "190300",
            menuname: "控制参数维护",
            menuremark: "",
            menuurl: "/home/control",
            menuvalidflag: "1",
            mobilenbr: "13958185810",
            opercode: "999999",
            opername: "系统管理员1",
            parmenucode: "190000",
            parrolecode: "0",
            remark: "",
            rolecode: "999999",
            rolename: "系统管理员角色",
            roleremark: "",
            rolevalidflag: "1",
            validflag: "1",
          },
        ],

        opercode: "999999",
        opername: "系统管理员1",
        logintoken: "b3TVeWOuS6P/wqNektQXvr65nbQ=",
        message: "亲,登录成功!",
      },
      treeData: [],
      defaultProps: {
        children: "child",
        label: "menuname",
      },
      checkedKeys: [],
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },

    find() {
      var newArr1 = [];
      var newArr2 = [];
      var newArr3 = [];
      let arr = this.res.result;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].leafflag == "0") {
          newArr1.push(arr[i]);
        }
        if (arr[i].leafflag == "1") {
          newArr2.push(arr[i]);
        }
        if (arr[i].leafflag == "2") {
          newArr3.push(arr[i]);
        }
        this.checkedKeys.push(arr[i].menucode);
      }

      for (var a = 0; a < newArr1.length; a++) {
        newArr1[a].child = [];
        for (var b = 0; b < newArr2.length; b++) {
          if (newArr1[a].menucode == newArr2[b].parmenucode) {
            newArr1[a].child.push(newArr2[b]);
          }
          newArr2[b].child = [];
          for (var c = 0; c < newArr3.length; c++) {
            if (newArr2[b].menucode == newArr3[c].parmenucode) {
              newArr2[b].child.push(newArr3[c]);
            }
          }
        }
      }
      this.treeData = newArr1;
    },
  },
  mounted() {
    this.find();
  },
};
</script>
<style  lang='stylus'>
.bg
  width 100vw
  height 100vh
  position fixed
  top 0
  left 0
  z-index 9999
  background rgba(0, 0, 0, 0.6)
  display flex
  justify-content center
  .jurisdiction
    position relative
    clear both
    width 75%
    margin 40px auto 0px
    #close
      position absolute
      top 8px
      right 8px
      z-index 99
      color #696969
      cursor pointer
      &:hover
        color red
    #tree
      width 100%
      display flex
      justify-content space-around
      flex-wrap wrap
      background #f4f4f4
      padding 20px 0 0px
      &>div
        background #f0f0f0
        padding 10px 30px 10px 10px
        border 1px solid #ccc
        margin-top 10px
    .btn
      text-align right
      padding-right 30px
      padding-top 10px
      background #f4f4f4
</style>