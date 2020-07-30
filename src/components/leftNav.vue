<template>
  <div class="con">
    <div class="items" v-for="(item,index) in Menulist" :key="item.title">
      <h3 @click.self="open(index)">
        <span :class="item.icon"></span>
        {{item.title}}
        <span :class="item.arrows"></span>
      </h3>

      <ul v-show="item.isOpen">
        <li is="router-link" v-for=" it in item.child" :key="it.nav" to>{{it.nav}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Menulist: [
        {
          icon: "iconfont icon-user",
          title: "用户管理系统",
          isOpen: false,
          arrows: "iconfont icon-z-arrowUp1 arrows",
          child: [
            {
              link: "",
              nav: "用户查询",
            },
            {
              link: "",
              nav: "用户统计",
            },
            {
              link: "",
              nav: "健康档案查询",
            },
            {
              link: "",
              nav: "健康计划管理",
            },
            {
              link: "",
              nav: "健康咨询管理",
            },
          ],
        },
        {
          icon: "iconfont icon-qudao",
          title: "渠道管理系统",
          isOpen: false,
          arrows: "iconfont icon-z-arrowUp1 arrows",
          child: [
            {
              link: "",
              nav: "渠道信息维护",
            },
            {
              link: "",
              nav: "渠道用户统计",
            },
            {
              link: "",
              nav: "渠道佣金结算",
            },
            {
              link: "",
              nav: "渠道订单管理",
            },
          ],
        },
        {
          icon: "iconfont icon-shequfuwuzhan",
          title: "服务站管理系统",
          isOpen: false,
          arrows: "iconfont icon-z-arrowUp1 arrows",
          child: [
            {
              link: "",
              nav: "服务站信息维护",
            },
            {
              link: "",
              nav: "服务站用户统计",
            },
            {
              link: "",
              nav: "服务站佣金结算",
            },
            {
              link: "",
              nav: "服务站订单管理",
            },
          ],
        },
        {
          icon: "iconfont icon-yixuekepu",
          title: "健康科普管理系统",
          isOpen: false,
          arrows: "iconfont icon-z-arrowUp1 arrows",
          child: [
            {
              link: "",
              nav: "科普信息维护",
            },
            {
              link: "",
              nav: "科普信息分析",
            },
          ],
        },
        {
          icon: "iconfont icon-caozuo",
          title: "操作员管理系统",
          isOpen: false,
          arrows: "iconfont icon-z-arrowUp1 arrows",
          child: [
            {
              link: "",
              nav: "角色管理",
            },
            {
              link: "",
              nav: "平台操作员管理",
            },
            {
              link: "",
              nav: "渠道操作员管理",
            },
            {
              link: "",
              nav: "服务站操作员管理",
            },
          ],
        },
        {
          icon: "iconfont icon-ziyuan",
          title: "系统参数管理系统",
          isOpen: false,
          arrows: "iconfont icon-z-arrowUp1 arrows",
          child: [
            {
              link: "",
              nav: "菜单管理",
            },
            {
              link: "",
              nav: "数字字典维护",
            },
            {
              link: "",
              nav: "控制参数维护",
            },
          ],
        },
      ],
      //   isOpen: false,
    };
  },
  methods: {
    open(index) {
      if (this.Menulist[index].isOpen) {
        this.Menulist[index].isOpen = false;
        this.Menulist[index].arrows = "iconfont icon-z-arrowUp1 arrows";
      } else {
        this.Menulist.forEach((item) => {
          item.isOpen = false;
          item.arrows = "iconfont icon-z-arrowUp1 arrows";
        });
        this.Menulist[index].isOpen = true;
        this.Menulist[index].arrows = "iconfont icon-z-arrowUp arrows";
      }
    },
  },
};
</script>

<style lang="stylus">
.con
  .items
    h3
      position relative
      padding 0 20px
      line-height 50px
      cursor pointer
      &:hover
        background #b3c0d1
        transition all 0.9s
      span
        display inline-block
        width 20px
        height 20px
        text-align center
        line-height 20px
        &.arrows
          position absolute
          top calc(50% - 10px)
          left 185px
          transition all 1s
    ul
      width 100%
      display flex
      flex-wrap wrap
      background #f0f0f0
      transition all 9s
      a
        display block
        width 100%
        padding 0 40px
        box-sizing border-box
        line-height 30px
        font-size 14px
        &:hover
          background #b3c0d1
          transition all 0.9s
</style>