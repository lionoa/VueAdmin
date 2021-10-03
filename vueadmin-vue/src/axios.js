import axios from 'axios';
import Element from 'element-ui';
import router from './router';

axios.defaults.baseURL = 'http://localhost:8081';

const request = axios.create({
	timeout: 5000, // 毫秒
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	},
});

// 拦截器
// 请求
request.interceptors.request.use((request) => {
	// 在请求头中放入 token
	request.headers['Authorization'] = localStorage.getItem('token');
	return request;
});

// 响应
request.interceptors.response.use(
	(response) => {
		let res = response.data;

		if (res.code === 200) {
			return response;
		} else {
			Element.Message.error(res.msg ? res.msg : '系统异常');
			// 拒绝
			return Promise.reject(response.data.msg);
		}
	},
	(error) => {
		if (error.response.data) {
			error.message ? error.response.data.msg : '系统异常';
		}
		if (error.response.status === 403) {
			router.push('/login');
		}

		Element.Message.error(error.message, { duration: 3000 }); // 弹窗秒数3s

		return Promise.reject(error);
	}
);

export default request;
