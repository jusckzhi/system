<template>
  <div class="position" v-if="status.showDialog">
    <div class="center">
      <span @click="cancel" class="el-icon-circle-close"></span>
      <p class="title">{{status.title}}</p>

      <el-form
        label-position="right"
        label-width="100px"
        status-icon
        :model="obj.busidata.svrdata"
        :rules="rules"
        ref="svrdata"
      >
        <el-form-item label="父角色编号 :" prop="parrolecode">
          <el-input v-model="obj.busidata.svrdata.parrolecode " placeholder="请输入将添加的账号"></el-input>
        </el-form-item>
        <el-form-item label="角色名称 :" prop="rolename" width="600">
          <div class="grid-content bg-purple-light" style="width:100%">
            <el-select
              v-model="obj.busidata.svrdata.rolename"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="it in options" :key="it.value" :label="it.label" :value="it.value"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="备注 :" prop="remark">
          <el-input v-model="obj.busidata.svrdata.remark"></el-input>
        </el-form-item>

        <div class="bt">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" v-if="status.isAdd" @click="confirm('svrdata')">添加</el-button>
          <el-button type="primary" v-else @click="update">修改</el-button>
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
    return {
      obj: {
        busidata: {
          handleSessionLost: "false",
          timeOut: "30000",
          service: "addOneRole",
          token: "",
          svrdata: {
            rolename: "",
            parrolecode: "",
            remark: "",
          },
        },
      },
      options: [
        {
          id: "1",
          value: "平台管理员角色",
          label: "平台管理员角色",
        },
        {
          id: "2",
          value: "渠道管理员角色",
          label: "渠道管理员角色",
        },
        {
          id: "3",
          value: "服务站管理员角色",
          label: "服务站管理员角色",
        },
        {
          id: "4",
          value: "系统操作员角色",
          label: "系统操作员角色",
        },
      ],
      // 表单正则验证规则
      rules: {
        parrolecode: [
          { required: true, message: "请输入父角色编号", trigger: "blur" },
        ],
        rolename: [
          { required: true, message: "请选择角色名称", trigger: "change" },
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
    // // 清空对话框内容
    empty() {
      this.obj.busidata.svrdata = {
        rolename: "",
        parrolecode: "",
        remark: "",
      };
    },
    // // 添加
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api({
            data: this.obj,
          }).then((res) => {
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
    // // 查看
    look(rolecode, rolename, parrolecode, remark, validflag) {
      this.obj.busidata.svrdata = {
        rolecode: rolecode,
        validflag,
        rolename,
        parrolecode,
        remark,
      };
    },
    // // 修改
    update() {
      api({
        data: {
          busidata: {
            handleSessionLost: "false",
            timeOut: "30000",
            service: "updateRole",
            token: sessionStorage.getItem("logintoken"),
            svrdata: this.obj.busidata.svrdata,
          },
        },
      }).then((res) => {
        if (res.data.resultCode == 1) {
          this.$message({
            message: res.data.message,
            type: "success",
          });
          this.cancel();
          this.$emit("init");
        }
      });

      //   updateUser(this.addRole).then((res) => {
      //     if (res.data.isok) {
      //       this.$message({
      //         message: res.data.info,
      //         type: "success",
      //       });
      //       // 清空对话框
      //       this.empty();
      //       // 通知父组件  让对话框消失
      //       this.$emit("hide");
      //       // 通知父组件重新查询数据
      //       this.$emit("init");
      //     }
      //   });
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
    top 10px
    right 10px
    font-size 20px
    color #ccc
    cursor pointer
    user-select none
    &:hover
      color red
  .title
    text-align center
    font-size 20px
    margin-bottom 20px
  .el-input__inner
    width 100%
  .bt
    text-align center
</style>