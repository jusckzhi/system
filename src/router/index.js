import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/userquery',
    name: 'userquery',
    component: () => import('../views/user/UserQuery.vue') //用户查询
  }
]

const router = new VueRouter({
  routes
})

export default router