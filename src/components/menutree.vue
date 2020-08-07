<!--
  name : 菜单组件
  user : jusck
-->
<template>
  <div class="menutree"></div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
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
    };
  },
};
</script>