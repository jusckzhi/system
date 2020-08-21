<!--
  name : 平台操作员管理
  user : jusck
-->

<template>
  <div class="platform">
    <div class="title">
      <h1>{{ pageName }}</h1>
    </div>
    <div class="btn">
      <el-button type="success" @click="willAdd">新建</el-button>
    </div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.user.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)"
      style="width: 100%"
    >
      <el-table-column label width="40"></el-table-column>

      <el-table-column prop="loginid" label="操作员账号" width="200"></el-table-column>
      <el-table-column prop="opername" label="操作员姓名" width="200"></el-table-column>
      <el-table-column prop="mobilenbr" label="手机号码" width="250"></el-table-column>
      <el-table-column prop="remark" label="备注" width="250"></el-table-column>
      <el-table-column prop="validflag" label="状态">
        <template slot-scope="scope">{{scope.row.validflag == 1 ? '启用':'禁用'}}</template>
      </el-table-column>

      <el-table-column align="right" width="300px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="请输入关键字搜索" @change="input(scope)" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            title="详情修改"
            circle
            @click="look(scope.row.loginid,scope.row.mobilenbr,scope.row.opername)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            title="删除操作员"
            circle
            @click="del(scope.row.opercode)"
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
      :total="tableData.length+1"
      :hide-on-single-page="true"
    ></el-pagination>
    <add-platform ref="add" :status="status" @hide="hide" @init="init"></add-platform>
  </div>
</template>



<script>
import { api } from "../../util/request";
import addPlatform from "../../components/operator/addPlatform";
export default {
  props: {
    msg: String,
  },
  components: {
    addPlatform,
  },
  data() {
    return {
      // 查询
      obj: {
        busidata: {
          handleSessionLost: "false",
          timeOut: "30000",
          service: "qryAllOper",
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
        title: "添加平台操作员",
        isAdd: true, //如果是添加 -true  如果是修改 -false
        showDialog: false, //对话框出现的状态
        isLook: false,
      },
      tableData: [],
      currpage: 0,
      pagesize: 20,
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
      this.status.title = "添加平台操作员";
      this.status.isAdd = true;
      this.status.showDialog = true;
    },
    // 查看
    look(id, mobilenbr, name) {
      this.$refs.add.look(id, mobilenbr, name);
      this.status.title = "修改平台操作员";
      this.status.isAdd = false;
      this.status.showDialog = true;
      this.status.isLook = true;
    },
    // 删除
    del(opercode) {
      this.$confirm("你确定要删除该操作员吗？", "提示", {
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
                service: "deleteOper",
                token: sessionStorage.getItem("logintoken"),
                svrdata: {
                  opercode: opercode,
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
      this.init();
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.init();
    },
  },
  mounted() {
    this.pageName = this.$route.name;
    this.init();
  },
};
</script>
<style scoped lang='stylus'>
.platform
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