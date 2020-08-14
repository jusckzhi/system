<!--
  name : 添加渠道管理员
  user : jusck
-->
<template>
  <div class="position" v-if="status.showDialog">
    <div class="center">
      <span @click="cancel">x</span>
      <p class="title">{{status.title}}</p>

      <el-form
        label-position="right"
        label-width="100px"
        :model="addChannel"
        :rules="rules"
        ref="addChannel"
      >
        <el-form-item label="账号 :" prop="user">
          <el-input v-model="addChannel.user " placeholder="请输入将添加的账号"></el-input>
        </el-form-item>
        <el-form-item label="密码 :" prop="pass">
          <el-input
            type="password"
            show-password
            v-model="addChannel.pass"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :" prop="confirmPass" v-if="status.isAdd">
          <el-input
            type="password"
            show-password
            v-model="addChannel.confirmPass"
            autocomplete="off"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作员姓名 :" prop="name">
          <el-input v-model="addChannel.name" placeholder="请输入渠道操作员姓名"></el-input>
        </el-form-item>

        <el-form-item label="渠道选择 :" prop="channel">
          <el-select v-model="addChannel.channel" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码 :" prop="tel">
          <el-input v-model="addChannel.tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="备注 :">
          <el-input v-model="addChannel.des"></el-input>
        </el-form-item>
        <div class="bt">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" v-if="status.isAdd" @click="confirm">添加</el-button>
          <el-button type="primary" v-else @click="update">修改</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { addChannel, findUser, updateUser } from "../util/request";
export default {
  props: ["status"],
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.addChannel.confirmPass !== "") {
          this.$refs.addChannel.validateField("confirmPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addChannel.pass) {
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
      addChannel: {
        user: "",
        pass: "",
        name: "",
        tel: "",
        des: "",
        channel: "",
        confirmPass: "",
      },
      options: [
        {
          value: "0",
          label: "渠道一",
        },
        {
          value: "1",
          label: "渠道二",
        },
        {
          value: "2",
          label: "渠道三",
        },
      ],
      isLook: false,
      rules: {
        user: [
          { required: true, message: "请输入新增角色账号", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirmPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入操作姓名", trigger: "blur" }],
        tel: [{ required: true, validator: validateTel, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //  取消 关闭 添加
    cancel() {
      this.empty();
      this.$emit("hide");
    },
    // 清空对话框内容
    empty() {
      this.addChannel = {
        user: "",
        pass: "",
        name: "",
        tel: "",
        des: "",
      };
      this.confirmPass = "";
    },
    // 添加
    confirm() {
      this.isLook = false;
      // 验证两次密码是否不一致

      // 发起请求添加渠道操作员
      addChannel(data).then((res) => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success",
          });
          // 清空对话框
          this.empty();
          // 关闭对话框
          this.$emit("hide");
          // 查询管理员
          this.$emit("init");
        }
      });
    },
    // 查看
    look(id) {
      this.isLook = true;
      findUser({
        id: id,
      }).then((res) => {
        // 获取到某条数据
        if (res.data.isok) {
          this.addChannel = res.data.data[0];
        }
      });
    },
    // 修改
    update() {
      updateUser(this.addChannel).then((res) => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success",
          });
          // 清空对话框
          this.empty();
          // 通知父组件  让对话框消失
          this.$emit("hide");
          // 通知父组件重新查询数据
          this.$emit("init");
        }
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.el-select
  width 100%
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
    top -20px
    right 15px
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