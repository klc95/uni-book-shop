const install = (Vue, vm) => {
	vm.$u.api = {}
	
	//首页
	vm.$u.api.index = (params = {}) => vm.$u.get('/api/index', params);
	
	//认证相关
	vm.$u.api.authLogin = (params = {}) => vm.$u.post('/api/auth/login', params);  //登录	
	vm.$u.api.authRegister = (params = {}) => vm.$u.post('/api/auth/register', params);  //注册
	vm.$u.api.authLogout = () => vm.$u.post('/api/auth/logout');  //退出登录
	vm.$u.api.authOssToken = () => vm.$u.get('/api/auth/oss/token')//获取ossToken
	
	//用户相关
	vm.$u.api.userInfo = () => vm.$u.get('/api/user'); //用户详情
	vm.$u.api.userInfoUpdate = (params = {}) => vm.$u.put('/api/user', params); //修改用户信息
	vm.$u.api.userAvatar = params => vm.$u.patch('/api/user/avatar', params); //修改用户头像
}

export default {
	install
}