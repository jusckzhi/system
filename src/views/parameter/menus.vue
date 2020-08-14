<!--
  name : 菜单管理
  user : jusck
-->
<template>
  <div class="menus">
    <div class="title">
      <h1>{{ pageName }}</h1>
    </div>
    <div class="btn">
      <el-button type="success" @click="willAdd">新建</el-button>
    </div>
    <el-table
      :data="Menulist"
      style="width: 100%"
      row-key="index"
      :tree-props="{children: 'child', hasChildren: 'nav'}"
      height="750"
    >
      <el-table-column label width="80" align="right"></el-table-column>
      <el-table-column prop="title" label="一级菜单名称" width="180" height="40"></el-table-column>

      <el-table-column prop="nav" label="二级菜单名称" width="180"></el-table-column>

      <el-table-column prop="link" label="地址" width="180"></el-table-column>

      <el-table-column prop="isOpen" label="是否激活"></el-table-column>

      <el-table-column align="right" width="300px">
        <template slot="header" style="text-align:center">
          <span>操作</span>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="look(scope.row.id)">查看</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label width="40"></el-table-column>
    </el-table>
    <!-- <add-menus ref="add" :status="status" @hide="hide" @init="init"></add-menus> -->
  </div>
</template>
<script>
// import addService from "../../components/operator/addService";
import menutree from "../../components/menutree";
import { api } from "../../util/request";
export default {
  props: {},
  components: {
    // addService,
    menutree,
  },
  data() {
    return {
      pageName: "",
      search: "",
      status: {
        title: "添加服务站操作员",
        isAdd: true, //如果是添加 -true  如果是修改 -false
        showDialog: false, //对话框出现的状态
      },
      Menulist: [
        {
          index: "1",
          icon: "iconfont icon-yonghu",
          title: "用户管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            { index: "1-1", link: "userquery", nav: "用户查询" },
            { index: "1-2", link: "userstatistics", nav: "用户统计" },
            { index: "1-3", link: "healthfile", nav: "健康档案查询" },
            { index: "1-4", link: "healthplan", nav: "健康计划管理" },
            { index: "1-5", link: "healthinquiry", nav: "健康咨询管理" },
          ],
        },
        {
          index: "2",
          icon: "iconfont icon-qudao",
          title: "渠道管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            { index: "2-1", link: "channelmanager", nav: "渠道信息维护" },
            { index: "2-2", link: "channeluser", nav: "渠道用户统计" },
            { index: "2-3", link: "channelcommission", nav: "渠道佣金结算" },
            { index: "2-4", link: "channelorder", nav: "渠道订单管理" },
          ],
        },
        {
          index: "3",
          icon: "iconfont icon-zonghefuwuzhan",
          title: "服务站管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            { index: "3-1", link: "servicefees", nav: "服务站信息维护" },
            { index: "3-2", link: "serviceorder", nav: "服务站用户统计" },
            { index: "3-3", link: "serviceinformation", nav: "服务站佣金结算" },
            { index: "3-4", link: "ServiceUser", nav: "服务站订单管理" },
          ],
        },
        {
          index: "4",
          icon: "iconfont icon-yixuekepu",
          title: "健康科普管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            { index: "4-1", link: "maintain", nav: "科普信息维护" },
            { index: "4-2", link: "analyze", nav: "科普信息分析" },
          ],
        },
        {
          index: "5",
          icon: "iconfont icon-caozuo",
          title: "操作员管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            { index: "5-1", link: "role", nav: "角色管理" },
            { index: "5-2", link: "platform", nav: "平台操作员管理" },
            { index: "5-3", link: "channel", nav: "渠道操作员管理" },
            { index: "5-4", link: "service", nav: "服务站操作员管理" },
          ],
        },
        {
          index: "6",
          icon: "iconfont icon-xitong",
          title: "系统参数管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            { index: "6-1", link: "menus", nav: "菜单管理" },
            { index: "6-2", link: "datadictionary", nav: "数据字典维护" },
            { index: "6-3", link: "control", nav: "控制参数维护" },
          ],
        },
      ],
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
    };
  },
  methods: {
    //   初始化
    init() {
      // 查询数据 ({}) 没有参数 用{} 空json代替
      // api({ }).then((res) => {
      //   console.log(res);
      //   if (res.data.isok) {
      //     this.tableData = res.data.data;
      //   }
      // });
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
    look(id) {
      this.$refs.add.look(id);
      this.status.title = "修改服务站操作员";
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
  },
  mounted() {
    this.pageName = this.$route.name;
    this.init();
  },
};
</script>
<style scoped lang='stylus'>
.menus
  height 100%
  background #fff
  .title
    background #fff
    text-align center
    h1
      font-size 20px
      color #939e9f
  .el-pagination
    padding 50px 0 0px
    text-align center
    background #fff
  .btn
    display flex
    justify-content flex-start
    padding 0 40px
    background #fff
</style>