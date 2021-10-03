import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '@/views/index.vue';
import home from '@/views/home.vue';
import userCenter from '@/views/userCenter.vue';
import axios from '../axios';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: home,
		children: [
			{
				path: '/index',
				name: 'index',
				component: index,
			},
			{
				path: '/userCenter',
				name: 'userCenter',
				component: userCenter,
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});
// 静态路由会因为以下代码导致路由重复
router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token');
	if (to.path == '/login') {
		next();
	} else if (!token) {
		next({ path: '/login' });
	}
	let hasRoute = store.state.menus.hasRoute;
	if (token && !hasRoute) {
		axios
			.get('/sys/menu/nav', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})
			.then((response) => {
				console.log(response.data);
				// 获取当前用户可使用的菜单路径
				store.commit('setMenuList', response.data.data.menuList);
				// 获取当前用户的权限 增删查改等
				store.commit('setAuthorities', response.data.data.authorities);
				console.log(response.data.data.authorities);
				// 动态绑定路由
				let newRoutes = router.options.routes;
				let menu = response.data.data.menuList;
				for (let item in menu) {
					if (menu[item].children) {
						menu[item].children.forEach((child) => {
							let route = menuToRoute(child);
							if (route) {
								newRoutes[0].children.push(route);
							}
						});
					}
				}
				router.addRoutes(newRoutes);
				hasRoute = true;
				store.commit('changeRouteStatus', hasRoute);
			});
	}
	next();
});

function menuToRoute(menu) {
	let route = {
		name: menu.title,
		path: menu.index,
		component: () => import('@/views' + menu.index + '.vue'),
	};
	return route;
}
export default router;
