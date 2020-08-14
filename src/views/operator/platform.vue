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

      <el-table-column prop="user" label="操作员账号" width="200"></el-table-column>
      <el-table-column prop="name" label="操作员姓名" width="200"></el-table-column>
      <el-table-column prop="index" label="操作员编号" width="180"></el-table-column>
      <el-table-column prop="tel" label="手机号码"></el-table-column>
      <el-table-column align="right" width="300px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="请输入关键字搜索" @change="input(scope)" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="look(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.id)"
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
    <add-platform ref="add" :status="status" @hide="hide" @init="init"></add-platform>
  </div>
</template>



<script>
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
      pageName: "",
      search: "",
      status: {
        title: "添加平台操作员",
        isAdd: true, //如果是添加 -true  如果是修改 -false
        showDialog: false, //对话框出现的状态
      },
      tableData: [
        {
          index: 1,
          user: "javascript",
          name: "张三",
          tel: "13479301065",
        },
        {
          index: 2,
          user: "jquery",
          name: "李四",
          tel: "13479301065",
        },
        {
          index: 3,
          user: "react",
          name: "王二",
          tel: "13479301065",
        },
        {
          index: 4,
          user: "vue",
          name: "麻子",
          tel: "13479301065",
        },
      ],
      currpage: 1,
      pagesize: 10,
    };
  },
  methods: {
    //   初始化
    init() {
      // 查询数据 ({}) 没有参数 用{} 空json代替
      // findManage({}).then((res) => {
      // if (res.data.isok) {
      // this.tableData = res.data.data;
      // }
      // });
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
    look(id) {
      this.$refs.add.look(id);
      this.status.title = "修改平台操作员";
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
    handleCurrentChange(cpage) {
      this.currpage = cpage;
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