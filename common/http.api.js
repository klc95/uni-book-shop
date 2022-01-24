const install = (Vue, vm) => {
	vm.$u.api = {}
	
	//首页
	vm.$u.api.index = (params = {}) => vm.$u.get('/api/index', params);
	
	//认证相关
	vm.$u.api.authLogin = (params = {}) => vm.$u.post('/api/auth/login', params);  //登录
	
	//用户相关
	vm.$u.api.userInfo = () => vm.$u.get('/api/user'); //用户详情
}

export default {
	install
}