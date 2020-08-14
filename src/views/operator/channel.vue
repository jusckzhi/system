<!--
  name : 渠道操作员管理
  user : jusck
-->
<template>
  <div class="channel">
    <div class="title">
      <h1>{{ pageName }}</h1>
    </div>
    <div class="btn">
      <el-button type="info" @click="willAdd">新建</el-button>
    </div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.tel.toLowerCase().includes(search.toLowerCase())|| data.user.toLowerCase().includes(search.toLowerCase())).slice((currpage - 1) * pagesize, currpage * pagesize)"
      style="width: 100%"
    >
      <el-table-column label width="40"></el-table-column>

      <el-table-column prop="user" label="操作员账号" width="200"></el-table-column>
      <el-table-column prop="name" label="操作员姓名" width="200"></el-table-column>
      <el-table-column prop="index" label="操作员编号" width="220"></el-table-column>
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
    <add-channel ref="add" :status="status" @hide="hide" @init="init"></add-channel>
  </div>
</template>



<script>
import addChannel from "../../components/operator/addChannel";
export default {
  props: {
    msg: String,
  },
  components: {
    addChannel,
  },
  data() {
    return {
      pageName: "",
      search: "",
      status: {
        title: "添加渠道操作员",
        isAdd: true, //如果是添加 -true  如果是修改 -false
        showDialog: false, //对话框出现的状态
      },
      tableData: [
        {
          index: "仰天大笑出门去",
          user: "HTML",
          name: "李白",
          tel: "15279397163",
        },
        {
          index: "明月松间照",
          user: "JAVASCRIPT",
          name: "王维",
          tel: "17770377361",
        },
        {
          index: "万里悲秋常作客",
          user: "JAVA",
          name: "杜甫",
          tel: "14796878508",
        },
        {
          index: "衰兰送客咸阳道",
          user: "PHP",
          name: "李贺",
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