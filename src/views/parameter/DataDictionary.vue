<!--
  name : 数字字典维护
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
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.type.toLowerCase().includes(search.toLowerCase())|| data.user.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)"
      style="width: 100%"
    >
      <el-table-column label width="40"></el-table-column>
      <el-table-column prop="dictid" label="字典id" width="150"></el-table-column>
      <el-table-column prop="dictname" label="字典名称" width="180"></el-table-column>
      <el-table-column prop="dicttypeid" label="类型id" width="150"></el-table-column>
      <el-table-column prop="dicttypename" label="类型名称" width="200"></el-table-column>
      <el-table-column prop="showflag" label="是否显示" width="150">
        <template slot-scope="scope">{{scope.row.showflag == 1 ? '是':'否'}}</template>
      </el-table-column>
      <el-table-column prop="validflag" label="状态" width="150">
        <template slot-scope="scope">
          <span
            :class="[scope.row.validflag == 1 ?'blue' :'red']"
          >{{scope.row.validflag == 1 ? '启用':'禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
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
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currpage"
      :page-size="pagesize"
      :pager-count="7"
      layout="prev, pager, next, jumper"
      :total="tableData.length"
      :hide-on-single-page="true"
    ></el-pagination>
    <add-channel ref="add" :status="status" @hide="hide" @init="init"></add-channel>
  </div>
</template>



<script>
import { uniApi } from "../../util/request";
import addChannel from "../../components/operator/addChannel";
export default {
  components: {
    addChannel,
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
        title: "添加渠道操作员",
        isAdd: true, //是否添加
        showDialog: false, //对话框状态
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
      uniApi("qryAllDict", this.svrdata).then((res) => {
        console.log(res);
        this.tableData = res.data.result;
      });
    },
    // 关闭对话框
    hide() {
      this.status.showDialog = false;
    },
    // 添加
    willAdd() {
      this.status.title = "添加渠道操作员";
      this.status.isAdd = true;
      this.status.showDialog = true;
    },
    // 查看
    look(id) {
      this.$refs.add.look(id);
      this.status.title = "修改渠道操作员";
      this.status.isAdd = false;
      this.status.showDialog = true;
    },
    // 删除
    del(id) {
      this.$confirm("你确定要删除该操作员吗？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        // .then(() => {
        // 确定删除
        // delManage({ id: id }).then((res) => {
        // 删除成功
        // if (res.data.isok) {
        // this.$message({
        // message: res.data.info,
        // type: "success",
        // });
        // 删除后重新渲染页面
        // this.init();
        // }
        // });
        // })
        .catch(() => {
          // 取消删除
          this.$message({
            message: "已取消删除",
            type: "info",
          });
        });
    },
    input() {},
    // 分页页数切换
    handleCurrentChange(cpage) {
      this.currpage = cpage;
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
  .blue
    color #67c23a
  .red
    color red
</style>