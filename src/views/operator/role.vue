<!--
  name : 角色管理
  user : jusck
-->
<template>
  <div class="role">
    <div class="title">
      <h1>{{ pageName }}</h1>
    </div>
    <div class="btn">
      <el-button type="success" @click="willAdd">新建</el-button>
    </div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())||data.role.toLowerCase().includes(search.toLowerCase())||data.des.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)"
      style="width: 100%"
    >
      <el-table-column label width="40"></el-table-column>
      <el-table-column prop="parrolecode" label="父角色编号" width="150"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="220"></el-table-column>
      <el-table-column prop="validflag" label="状态" width="180">
        <template slot-scope="scope">{{scope.row.validflag==1?'启用':'禁用'}}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column align="right" width="300px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="请输入关键字搜索" @change="input(scope)" />
        </template>
        <template slot-scope="scope">
          <!-- 权限修改 -->
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit-outline"
            title="权限修改"
            circle
            @click="permission(scope.row.id)"
          ></el-button>
          <!-- 角色信息查看/修改 -->
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            title="详情修改"
            circle
            @click="look(scope.row.rolecode,scope.row.rolename,scope.row.parrolecode,scope.row.remark,scope.row.validflag)"
          ></el-button>
          <!-- 删除角色 -->
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            title="删除角色"
            circle
            @click="del(scope.row.rolecode)"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column label width="40"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currpage"
      :page-size="pagesize"
      :pager-count="7"
      layout="prev, pager, next, jumper"
      :total="tableData.length"
      :hide-on-single-page="true"
    ></el-pagination>
    <add-role ref="add" :status="status" @hide="hide" @init="init"></add-role>
    <jurisdiction res="compile" :msgs="msgs" @cancel="cancel"></jurisdiction>
  </div>
</template>

<script>
import { api } from "../../util/request";
import addRole from "../../components/operator/addRole";
import jurisdiction from "../../components/operator/jurisdiction";
export default {
  components: {
    addRole,
    jurisdiction,
  },
  data() {
    return {
      obj: {
        busidata: {
          handleSessionLost: "false",
          timeOut: "30000",
          service: "qryAllRole",
          token: sessionStorage.getItem("logintoken"),
          svrdata: {
            offset: "",
            limit: "",
          },
        },
      },
      pageName: "",
      search: "",
      status: {
        title: "添加角色",
        isAdd: true, //如果是添加 -true  如果是修改 -false
        showDialog: false, //对话框出现的状态
      },
      msgs: {
        showMsg: false,
      },
      tableData: [],
      currpage: 1,
      pagesize: 10,
    };
  },
  methods: {
    //   初始化
    async init() {
      this.obj.busidata.token = sessionStorage.getItem("logintoken");
      this.obj.busidata.svrdata.offset = this.currpage.toString();
      this.obj.busidata.svrdata.limit = this.pagesize.toString();
      await api({ data: this.obj }).then((res) => {
        this.tableData = res.data.result;
      });
    },
    // 对话框消失
    hide() {
      this.status.showDialog = false;
    },
    // 点击了添加按钮，出现添加对话框
    willAdd() {
      this.status.title = "添加角色";
      this.status.isAdd = true;
      this.status.showDialog = true;
    },
    // 权限修改显示
    permission() {
      this.msgs.showMsg = true;
    },
    // 修改权限关闭
    cancel() {
      this.msgs.showMsg = false;
    },
    // 角色信息编辑
    look(rolecode, rolename, parrolecode, remark, validflag) {
      this.$refs.add.look(rolecode, rolename, parrolecode, remark, validflag);
      this.status.title = "修改角色";
      this.status.isAdd = false;
      this.status.showDialog = true;
    },
    // 删除
    del(rolecode) {
      this.$confirm("你确定要删除角色吗？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定删除
          api({
            data: {
              busidata: {
                handleSessionLost: "false",
                timeOut: "30000",
                service: "deleteRole",
                token: sessionStorage.getItem("logintoken"),
                svrdata: {
                  rolecode: rolecode,
                },
              },
            },
          }).then((res) => {
            if (res.data.resultCode == -1) {
              this.$message.error({
                message: "删除失败",
              });
            }

            if (res.data.resultCode != -1) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.init();
            }
          });
        })
        .catch(() => {
          // 取消删除
          this.$message({
            message: "已取消删除",
            type: "info",
          });
        });
    },
    input() {},
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
  },
  mounted() {
    // console.log(JSON.parse(sessionStorage.getItem("permissionResult")));
    this.pageName = this.$route.name;
    this.init();
  },
};
</script>
<style scoped lang='stylus'>
.role
  height 100%
  background #fff
  .title
    background #fff
    text-align center
    h1
      font-size 20px
      color #939e9f
  .el-pagination
    margin 50px auto
    text-align center
    background #fff
  .btn
    display flex
    justify-content flex-start
    padding 0 40px
    background #fff
</style>