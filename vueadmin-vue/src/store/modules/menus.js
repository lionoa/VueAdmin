import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
	state: {
		menuList: [],
		authorities: [],
		hasRoute: false,
		editableTabsValue: '/index',
		editableTabs: [
			{
				title: '首页',
				name: '/index',
			},
		],
	},
	mutations: {
		setMenuList(state, menuList) {
			state.menuList = menuList;
		},

		setAuthorities(state, authorities) {
			state.authorities = authorities;
		},

		changeRouteStatus(state, hasRoute) {
			state.hasRoute = hasRoute;
			sessionStorage.setItem('hasRoute', hasRoute);
		},
		addTab(state, tab) {
			let index = state.editableTabs.findIndex((e) => e.title === tab.title);
			if (index === -1) {
				state.editableTabs.push({
					title: tab.title,
					name: tab.index,
				});
			}
			state.editableTabsValue = tab.index;
		},
		resetStore(state) {
			state.menuList = [];
			state.hasRoute = false;
			state.authorities = [];
			state.editableTabsValue = '/index';
			state.editableTabs = [
				{
					title: '首页',
					name: '/index',
				},
			];
		},
	},
	actions: {},
	modules: {},
};
