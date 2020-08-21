import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);



const routes = [
  // {
  //     path: "/ceshi",
  //     component: () => import("../components/operator/jurisdiction.vue"),
  //   }, 
  {
    path: "/home",
    component: Home,
    children: [
      // 用户管理
      {
        path: "userquery",
        name: "用户查询",
        component: () => import("../views/user/UserQuery.vue"),
      },
      {
        path: "userstatistics",
        name: "用户统计",
        component: () => import("../views/user/UserStatistics.vue"),
      },
      {
        path: "healthfile",
        name: "健康档案查询",
        component: () => import("../views/user/HealthFile.vue"),
      },
      {
        path: "healthplan",
        name: "健康计划管理",
        component: () => import("../views/user/HealthPlan.vue"),
      },
      {
        path: "healthinquiry",
        name: "健康咨询管理",
        component: () => import("../views/user/HealthInquiry.vue"),
      },
      // 渠道管理
      {
        path: "channelmanager",
        name: "渠道信息维护",
        component: () => import("../views/channel/ChannelManager.vue"),
      },
      {
        path: "channeluser",
        name: "渠道用户统计",
        component: () => import("../views/channel/ChannelUser.vue"),
      },
      {
        path: "channelcommission",
        name: "渠道佣金结算",
        component: () => import("../views/channel/ChannelCommission.vue"),
      },
      {
        path: "channelorder",
        name: "渠道订单管理",
        component: () => import("../views/channel/ChannelOrder.vue"),
      },
      // 服务站管理
      {
        path: "servicefees",
        name: "服务站佣金结算",
        component: () => import("../views/service/ServiceFees.vue"),
      },
      {
        path: "serviceorder",
        name: "服务站订单管理",
        component: () => import("../views/service/ServiceOrder.vue"),
      },
      {
        path: "serviceinformation",
        name: "服务站信息管理",
        component: () => import("../views/service/ServiceInformation.vue"),
      },
      {
        path: "serviceuser",
        name: "服务站用户管理",
        component: () => import("../views/service/ServiceUser.vue"),
      },
      // 健康科普管理
      {
        path: "maintain",
        name: "科普信息维护",
        component: () => import("../views/health/maintain.vue"),
      },
      {
        path: "analyze",
        name: "科普信息分析",
        component: () => import("../views/health/analyze.vue"),
      },
      // 操作员管理
      {
        path: "role",
        name: "角色管理",
        component: () => import("../views/operator/role.vue"),
      },
      {
        path: "platform",
        name: "平台操作员管理",
        component: () => import("../views/operator/platform.vue"),
      },
      {
        path: "channel",
        name: "渠道操作员管理",
        component: () => import("../views/operator/channel.vue"),
      },
      {
        path: "service",
        name: "服务站操作员管理",
        component: () => import("../views/operator/service.vue"),
      },
      // 系统参数管理
      {
        path: "menus",
        name: "菜单管理",
        component: () => import("../views/parameter/menus.vue"),
      },
      {
        path: "datadictionary",
        name: "数据字典维护",
        component: () => import("../views/parameter/DataDictionary.vue"),
      },
      {
        path: "control",
        name: "控制参数维护",
        component: () => import("../views/parameter/control.vue"),
      },
      {
        path: "welcome",
        name: "欢迎进入",
        component: () => import("../views/Welcome.vue"),
      },
      // 重定向
      {
        path: "",
        redirect: "welcome",
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "*",
    redirect: "/login",
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.fullPath !== "/login") {
//     if (!sessionStorage.getItem("logintoken")) {
//       return next("/login")
//     }
//   }
//   next()
// })

export default router;