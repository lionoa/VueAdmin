import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios';
import global from './globalFun'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

// require('./mock.js');

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
