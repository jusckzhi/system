<template>
  <div class="position" v-if="status.showDialog">
    <div class="center">
      <span @click="cancel" class="el-icon-circle-close"></span>
      <p class="title">{{status.title}}</p>

      <el-form
        label-position="right"
        label-width="100px"
        :model="obj.busidata.svrdata"
        :rules="rules"
        ref="svrdata"
      >
        <el-form-item label="账号 :" prop="loginid">
          <el-input v-model="obj.busidata.svrdata.loginid " placeholder="请输入将添加的账号"></el-input>
        </el-form-item>
        <el-form-item label="密码 :" prop="loginpwd">
          <el-input
            type="password"
            show-password
            v-model="obj.busidata.svrdata.loginpwd"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :" prop="confirmPass" v-if="status.isAdd">
          <el-input
            type="password"
            show-password
            v-model="obj.busidata.svrdata.confirmPass"
            autocomplete="off"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名 :" prop="opername">
          <el-input v-model="obj.busidata.svrdata.opername" placeholder="请输入平台操作员姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码 :" prop="mobilenbr">
          <el-input v-model="obj.busidata.svrdata.mobilenbr" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model="obj.busidata.svrdata.remark" placeholder="请输入备注信息"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="validflag" v-if="status.isLook">
          <el-switch
            v-model="obj.busidata.svrdata.validflag"
            active-text="启用"
            inactive-text="禁用"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <div class="bt">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" v-if="status.isAdd" @click="submitForm('svrdata')">添加</el-button>
          <el-button type="primary" v-else @click="update('svrdata')">修改</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { api } from "../../util/request";
export default {
  props: ["status"],
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.obj.busidata.svrdata.confirmPass !== "") {
          this.$refs.svrdata.validateField("confirmPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.obj.busidata.svrdata.loginpwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      obj: {
        busidata: {
          handleSessionLost: "false",
          timeOut: "30000",
          service: "addOper",
          token: "",
          svrdata: {
            mobilenbr: "",
            loginid: "",
            loginpwd: "",
            opername: "",
            confirmPass: "",
            remark: "",
            validflag: "",
          },
        },
      },
      isLook: false,
      rules: {
        loginid: [
          { required: true, message: "请输入新增操作员账号", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        loginpwd: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        confirmPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        opername: [
          { required: true, message: "请输入操作员用户名", trigger: "blur" },
        ],
        mobilenbr: [
          { required: true, validator: validateTel, trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    //  取消/关闭 添加
    cancel() {
      this.status.isLook = false;
      this.empty();
      this.$emit("hide");
    },
    // 清空对话框内容
    empty() {
      this.obj.busidata.svrdata = {
        mobilenbr: "",
        loginid: "",
        loginpwd: "",
        opername: "",
        confirmPass: "",
        remark: "",
      };
    },
    // 添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 输入正确可以添加管理员
          api({ data: this.obj }).then((res) => {
            if (res.data.resultCode === -1) {
              this.$message.error({
                message: "手机号码已被注册",
              });
              this.empty();
            }
            if (res.data.resultCode != -1) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.cancel();
              this.$emit("init");
            }
          });
        } else {
          return false;
        }
      });
    },

    // 查看
    look(id, mobilenbr, name) {
      this.status.isLook = true; //查看禁用
      api({
        data: {
          busidata: {
            handleSessionLost: "false",
            timeOut: "30000",
            service: "qryOper",
            token: "",
            svrdata: {
              loginid: id,
              opername: name,
              mobilenbr: mobilenbr,
            },
          },
        },
      }).then((res) => {
        this.obj.busidata.svrdata = res.data.result[0];
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api({
            data: {
              busidata: {
                handleSessionLost: "false",
                timeOut: "30000",
                service: "editOper",
                token: "",
                svrdata: this.obj.busidata.svrdata,
              },
            },
          }).then((res) => {
            if (res.data.resultCode == 1) {
              this.$message({
                message: "更新成功",
                type: "success",
              });
              this.cancel();
              this.$emit("init");
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.obj.busidata.token = sessionStorage.getItem("logintoken");
  },
};
</script>
<style scoped lang="stylus">
.position
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  background rgba(0, 0, 0, 0.5)
  z-index 999
  .center
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    padding 20px
    width 800px
    background #fff
  span
    position absolute
    top 10px
    right 10px
    font-size 20px
    color #ccc
    cursor pointer
    user-select none
  .title
    text-align center
    font-size 20px
    margin-bottom 20px
  .el-input__inner
    width 100%
  .bt
    text-align center
</style>