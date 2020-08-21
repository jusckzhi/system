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
            :key="it.menuname"
            :to="it.menuurl"
            activeClass="select"
          >{{it.menuname}}</li>
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
            :key="it.menuname"
            :to="it.menuurl"
            activeClass="select"
          >{{it.menuname}}</li>
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
          menucode: "110000",
          isOpen: false,
          arrows: "iconfont icon-sanjiaoxing arrows",
          child: [],
        },
        {
          icon: "iconfont icon-qudao",
          title: "渠道管理系统",
          menucode: "120000",
          isOpen: false,
          arrows: "iconfont icon-sanjiaoxing arrows",
          child: [],
        },
        {
          icon: "iconfont icon-zonghefuwuzhan",
          title: "服务站管理系统",
          menucode: "130000",
          isOpen: false,
          arrows: "iconfont icon-sanjiaoxing arrows",
          child: [],
        },
        {
          icon: "iconfont icon-yixuekepu",
          title: "健康科普管理系统",
          menucode: "140000",
          isOpen: false,
          arrows: "iconfont icon-sanjiaoxing arrows",
          child: [],
        },
        {
          icon: "iconfont icon-caozuo",
          title: "操作员管理系统",
          menucode: "180000",
          isOpen: false,
          arrows: "iconfont icon-sanjiaoxing arrows",
          child: [],
        },
        {
          icon: "iconfont icon-xitong",
          title: "系统参数管理系统",
          menucode: "190000",
          isOpen: false,
          arrows: "iconfont icon-sanjiaoxing arrows",
          child: [],
        },
      ],
      shade: true,
    };
  },
  methods: {
    // 菜单数据
    find() {
      var newArr1 = this.Menulist;
      var newArr2 = [];
      var newArr3 = [];
      let arr = JSON.parse(sessionStorage.getItem("permissionResult"));
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].leafflag == "1") {
          newArr2.push(arr[i]);
        }
        if (arr[i].leafflag == "2") {
          newArr3.push(arr[i]);
        }
      }
      for (var a = 0; a < newArr1.length; a++) {
        for (var b = 0; b < newArr2.length; b++) {
          if (newArr1[a].menucode == newArr2[b].parmenucode) {
            newArr1[a].child.push(newArr2[b]);
          }
          newArr2[b].child = [];
          for (var c = 0; c < newArr3.length; c++) {
            if (newArr2[b].menucode == newArr3[c].parmenucode) {
              newArr2[b].child.push(newArr3[c]);
            }
          }
        }
      }
      var newArr = [];
      for (var x = 0; x < newArr1.length; x++) {
        if (!newArr1[x].child.length == 0) {
          newArr.push(newArr1[x]);
        }
      }
      this.Menulist = newArr;
    },
    // 展开收起左侧菜单列表
    open(index) {
      if (this.Menulist[index].isOpen) {
        this.Menulist[index].isOpen = false;
        this.Menulist[index].arrows = "iconfont icon-sanjiaoxing arrows";
      } else {
        this.Menulist.forEach((item) => {
          item.isOpen = false;
          item.arrows = "iconfont icon-sanjiaoxing arrows";
        });
        this.Menulist[index].isOpen = true;
        this.Menulist[index].arrows = "iconfont icon-sanjiaoxing-copy arrows";
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
  mounted() {
    this.find();
  },
};
</script>

<style lang="stylus">
.con
  user-select none
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
      line-height 60px
      cursor pointer
      color #ccc
      &:hover
        background #555
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
          font-size 32px
          width 16px
          height 16px
          transition all 1s
    ul
      width 100%
      display flex
      flex-wrap wrap
      background #555
      transition all 9s
      a
        display block
        width 100%
        padding 7px 40px
        box-sizing border-box
        line-height 30px
        font-size 14px
        color #ccc
        &:hover
          background #888
          color #fff
          transition background 0.9s
      .select
        color white
        background #888
  .isshade
    height 100%
    background #666
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
      background #666
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
        background #666
        line-height 50px
        text-align center
        font-size 20px
        cursor pointer
        color #ccc
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
            transition all 0.9s
        .select
          color white
          background #b3c0d1
.icon-caidan
  color #ccc
</style>