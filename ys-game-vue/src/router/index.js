import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

import AddData from '../views/data/AddData'
import Injury from '../views/data/Injury'
import EmEchats from '../views/data/EmEchats'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
	// hidden:true
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
	children:[
		{
		  path: '/data/addData',
		  name: '圣遗物仓库',
		  component: AddData
		},
		{
		  path: '/data/injury',
		  name: '单角色伤害期望',
		  component: Injury
		},
		{
		  path: '/data/emEchats',
		  name: '元素精通',
		  component: EmEchats
		}
	]
  }
]

const router = new VueRouter({
  routes
})

export default router
