import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// ssr 懒加载必须这么写
const createProductList = process.BROWSER ? (type) => {
	  return (resolve) => { System.import('../views/product/createProductList.js').then((createProductList) => resolve(createProductList(type))) }
} : require('../views/product/createProductList.js');

import Reg from '../views/reg/reg.vue'
import FindPwd from '../views/findPwd/findPwd.vue'
import Compare from '../views/compare/compare.vue'
import Index from '../views/index/index.vue'
import Product from '../views/product/product.vue'

import Detail from '../views/detail/detail.vue'
import Login from '../views/login/login.vue'
import Preview from '../views/preview/preview.vue'
import FourTofour from '../views/404/404.vue'
import UserCenter from '../views/userCenter/userCenter.vue'
import UserOrder from '../views/userOrder/userOrder.vue'
import UserBill from '../views/userBill/userBill.vue'
import UserChange from '../views/userChange/userChange.vue'
import UpdateInfo from '../views/updateInfo/updateInfo.vue'
import UpdatePwd from '../views/updatePwd/updatePwd.vue'
import MyCollect from '../views/myCollect/myCollect.vue'
import MyShare from '../views/myShare/myShare.vue'
import MyAuth from '../views/myAuth/myAuth.vue'
import Feedback from '../views/feedback/feedback.vue'

const router = new Router({
	mode: 'history',
	scrollBehavior: () => ({
		y: 0
	}),
	routes: [
		{
			path: '/userCenter',
			name:'userCenter',
			component: UserCenter,
			children: [
				{
					path: 'userOrder',
					name: 'userOrder',
					component: UserOrder
				},
				{
					path: 'userChange',
					name:'userChange',
					component: UserChange
				},
				{
					path: 'userBill',
					name:'userBill',
					component: UserBill
				},
				{
					path: 'updateInfo',
					name:'updateInfo',
					component: UpdateInfo
				},
				{
					path: 'updatePwd',
					name:'updatePwd',
					component: UpdatePwd
				},
				{
					path: 'myCollect',
					name:'myCollect',
					component: MyCollect
				},
				{
					path: 'myShare',
					name:'myShare',
					component: MyShare
				},
				{
					path: 'myAuth',
					name:'myAuth',
					component: MyAuth
				},
				{
					path: 'feedback',
					name:'feedback',
					component: Feedback
				},


			]
		},
		{
			path: '/findPwd.html',
			name: 'findPwd',
			component: FindPwd
		}, {
			path: '/compare/:p1(\\d+)_:p2(\\d+)_:p3(\\d+)_:p4(\\d+).html',
			name: 'compare',
			component: Compare
		}, {
			path: '/preview/:productId(\\d+).html',
			name: 'preview',
			component: Preview
		}, {
			path: '/reg.html',
			name:'reg',
			component: Reg
		}, {
			path: '/login.html',
			name: 'login',
			component: Login
		}, {
			path: '/detail/:platform(\.*)/:productId(\\d+).html',
			name: 'detail',
			component: Detail
		}, {
			path: '/search/:query(\.*).html',
      		name:'search',
			component: Product
		},
		{
			path: '/jhxt.html',
			name:'xintuo',
			component: createProductList(1)
		},
		{
			path: '/zgjh.html',
			name:'ziguan',
			component: createProductList(2)
		},
		{
			path: '/zqjj.html',
			name:'zhengquan',
			component: createProductList(4)
		},
		{
			path: '/gqjj.html',
			name:'guquan',
			component: createProductList(16)
		},
		{
			path: '/hwtz.html',
			name:'haiwai',
			component: createProductList(128)
		},
		{
			path: '/index.html',
     		name:"index",
			component: Index
		}, {
			path: '/',
			component: Index
		}, {
			path: '*',
			component: FourTofour // 404
		}
	]
});

export default router;