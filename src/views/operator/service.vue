<!--
  name : 服务站操作员管理
  user : jusck
-->
<template>
  <div class="channel">
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
            @click="look(scope.row.opername,scope.row.loginid,scope.row.mobilenbr)"
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
    <add-service ref="add" :status="status" @hide="hide" @init="init"></add-service>
  </div>
</template>



<script>
import { uniApi } from "../../util/request";
import addService from "../../components/operator/addService";
export default {
  props: {
    msg: String,
  },
  components: {
    addService,
  },
  data() {
    return {
      svrdata: {
        offset: "",
        limit: "",
      },
      pageName: "",
      search: "",
      status: {
        title: "添加服务站操作员",
        isAdd: true, //是否为添加
        showDialog: false, //对话框出现的状态
      },
      tableData: [],
      currpage: 1,
      pagesize: 20,
    };
  },
  methods: {
    //   初始化
    init() {
      this.svrdata = {
        offset: this.currpage - 1,
        limit: this.pagesize,
      };
      uniApi("qryAllSerOper", this.svrdata).then((res) => {
        this.tableData = res.data.result;
      });
    },
    // 对话框消失
    hide() {
      this.status.showDialog = false;
    },
    // 点击了添加按钮，出现添加对话框
    willAdd() {
      this.status.title = "添加服务站操作员";
      this.status.isAdd = true;
      this.status.showDialog = true;
    },
    // 查看
    look(opername, loginid, mobilenbr) {
      this.$refs.add.look(opername, loginid, mobilenbr);
      this.status.title = "修改渠道操作员";
      this.status.isAdd = false;
      this.status.showDialog = true;
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
          uniApi("deleteSerOper", { opercode }).then((res) => {
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
      // this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
  },

  mounted() {
    this.pageName = this.$route.name;
    this.init();
  },
};
</script>
<style scoped lang='stylus'>
.channel
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