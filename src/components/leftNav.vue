<template>
  <div class="con">
    <div class="shade" v-show="shade">
      <div class="menus">
        <span class="iconfont icon-caidan" @click="close"></span>
      </div>
      <div class="items" v-for="(item,index) in Menulist" :key="item.title">
        <h3 @click.self="open(index)">
          <span :class="item.icon" @click.self="open(index)"></span>
          {{item.title}}
          <span :class="item.arrows" @click.self="open(index)"></span>
        </h3>

        <ul v-show="item.isOpen">
          <li
            is="router-link"
            v-for=" it in item.child"
            :key="it.nav"
            :to="it.link"
            activeClass="select"
          >{{it.nav}}</li>
        </ul>
      </div>
    </div>
    <div class="isshade" v-show="!shade">
      <div class="menus">
        <span class="iconfont icon-caidan" @click="unfold"></span>
      </div>
      <div class="menusicon" v-for="item in Menulist" :key="item.title">
        <h3>
          <span :class="item.icon"></span>
        </h3>
        <ul>
          <li
            is="router-link"
            v-for=" it in item.child"
            :key="it.nav"
            :to="it.link"
            activeClass="select"
          >{{it.nav}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Menulist: [
        {
          icon: "iconfont icon-yonghu",
          title: "用户管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            {
              link: "userquery",
              nav: "用户查询",
            },
            {
              link: "userstatistics",
              nav: "用户统计",
            },
            {
              link: "healthfile",
              nav: "健康档案查询",
            },
            {
              link: "healthplan",
              nav: "健康计划管理",
            },
            {
              link: "healthinquiry",
              nav: "健康咨询管理",
            },
          ],
        },
        {
          icon: "iconfont icon-qudao",
          title: "渠道管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            {
              link: "channelmanager",
              nav: "渠道信息维护",
            },
            {
              link: "channeluser",
              nav: "渠道用户统计",
            },
            {
              link: "channelcommission",
              nav: "渠道佣金结算",
            },
            {
              link: "channelorder",
              nav: "渠道订单管理",
            },
          ],
        },
        {
          icon: "iconfont icon-zonghefuwuzhan",
          title: "服务站管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            {
              link: "servicefees",
              nav: "服务站信息维护",
            },
            {
              link: "serviceorder",
              nav: "服务站用户统计",
            },
            {
              link: "serviceinformation",
              nav: "服务站佣金结算",
            },
            {
              link: "ServiceUser",
              nav: "服务站订单管理",
            },
          ],
        },
        {
          icon: "iconfont icon-yixuekepu",
          title: "健康科普管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            {
              link: "maintain",
              nav: "科普信息维护",
            },
            {
              link: "analyze",
              nav: "科普信息分析",
            },
          ],
        },
        {
          icon: "iconfont icon-caozuo",
          title: "操作员管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            {
              link: "role",
              nav: "角色管理",
            },
            {
              link: "platform",
              nav: "平台操作员管理",
            },
            {
              link: "channel",
              nav: "渠道操作员管理",
            },
            {
              link: "service",
              nav: "服务站操作员管理",
            },
          ],
        },
        {
          icon: "iconfont icon-xitong",
          title: "系统参数管理系统",
          isOpen: false,
          arrows: "iconfont icon-jiantouxia arrows",
          child: [
            {
              link: "menus",
              nav: "菜单管理",
            },
            {
              link: "datadictionary",
              nav: "数据字典维护",
            },
            {
              link: "control",
              nav: "控制参数维护",
            },
          ],
        },
      ],
      shade: true,
    };
  },
  methods: {
    // 展开收起左侧菜单列表
    open(index) {
      if (this.Menulist[index].isOpen) {
        this.Menulist[index].isOpen = false;
        this.Menulist[index].arrows = "iconfont icon-jiantouxia arrows";
      } else {
        this.Menulist.forEach((item) => {
          item.isOpen = false;
          item.arrows = "iconfont icon-jiantouxia arrows";
        });
        this.Menulist[index].isOpen = true;
        this.Menulist[index].arrows = "iconfont icon-dropUp arrows";
      }
    },
    // 展开菜单
    unfold() {
      this.shade = true;
      this.$emit("changeStyle");
    },
    // 关闭菜单
    close() {
      this.shade = false;
      this.$emit("changeStyleClose");
    },
  },
};
</script>

<style lang="stylus">
.con
  .menus
    width 50px
    height 50px
    position absolute
    bottom 0
    left 0
    text-align center
    line-height 50px
    cursor pointer
    span
      font-size 20px
      font-weight bold
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
          font-size 16px
          width 16px
          height 16px
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
          transition background 0.9s
      .select
        color white
        background #b3c0d1
  .isshade
    height 100%
    background #d3dce6
    .menus
      width 50px
      height 50px
      position absolute
      bottom 0
      left 0
      text-align center
      line-height 50px
      cursor pointer
      span
        font-size 20px
        font-weight bold
    .menusicon
      position relative
      margin-top 10px
      background #d3dce6
      &:hover ul
        display block
        animation move 1s
        transition all 3s
        animation-fill-mode forwards
        @keyframes move
          50%
            opacity 0
          100%
            opacity 1
      h3
        background #d3dce6
        line-height 50px
        text-align center
        font-size 20px
        cursor pointer
      ul
        position absolute
        right -173px
        top 5px
        width 170px
        opacity 0
        z-index 999
        display none
        a
          background #f0f0f0
          display block
          width 100%
          padding 0 20px
          box-sizing border-box
          line-height 30px
          font-size 14px
          &:hover
            background #b3c0d1
            transition background 0.9s
        .select
          color white
          background #b3c0d1
</style>