<template>
  <div class="position" v-if="status.showDialog">
    <div class="center">
      <span @click="cancel">x</span>
      <p class="title">{{status.title}}</p>

      <el-form
        label-position="right"
        label-width="100px"
        status-icon
        :model="addRole"
        :rules="rules"
        ref="addRole"
      >
        <el-form-item label="账号 :" prop="user">
          <el-input v-model="addRole.user " placeholder="请输入将添加的账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            show-password
            v-model="addRole.pass"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass" v-if="status.isAdd">
          <el-input
            type="password"
            show-password
            v-model="addRole.confirmPass"
            autocomplete="off"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色名称 :" prop="orle" width="600">
          <div class="grid-content bg-purple-light" style="width:100%">
            <el-select v-model="addRole.orle" clearable placeholder="请选择" style="width:100%">
              <el-option v-for="it in options" :key="it.value" :label="it.label" :value="it.value"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="电话 :" prop="tel">
          <el-input v-model="addRole.tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱 :" prop="email">
          <el-input v-model="addRole.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="备注 :">
          <el-input v-model="addRole.des"></el-input>
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
// import { addRole, findUser, updateUser } from "../util/request";
export default {
  props: ["status"],
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.addRole.confirmPass !== "") {
          this.$refs.addRole.validateField("confirmPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addRole.pass) {
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
      addRole: {
        user: "",
        pass: "",
        orle: "",
        tel: "",
        email: "",
        des: "",
        confirmPass: "",
      },

      isLook: false,
      options: [
        {
          value: "0",
          label: "平台操作员",
        },
        {
          value: "1",
          label: "渠道操作员",
        },
        {
          value: "2",
          label: "服务站操作员",
        },
        {
          value: "3",
          label: "用户",
        },
      ],
      // 表单正则验证规则
      rules: {
        user: [
          { required: true, message: "请输入新增角色账号", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirmPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        orle: [
          { required: true, message: "请选择角色类型", trigger: "change" },
        ],
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
      this.addRole = {
        name: "",
        pass: "",
        orle: "",
        tel: "",
        email: "",
        sex: "",
        idx: "",
        des: "",
        time: "",
      };
      this.confirmPass = "";
    },
    // 添加
    confirm() {
      this.isLook = false;

      // 发起请求添加管理员
      addRole(data).then((res) => {
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
          this.addRole = res.data.data[0];
        }
      });
    },
    // 修改
    update() {
      updateUser(this.addRole).then((res) => {
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
    width 700px
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