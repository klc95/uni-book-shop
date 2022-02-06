const install = (Vue, vm) => {
	/**
	 * 是否登录
	 */
	const isLogin = () => {
		//如果没有token，跳转到登录页面
		const token = vm.vuex_token;
		if (!token) {
			//来自哪个页面
			const currentPage = getCurrentPages().pop()
		    //获取页面路径，和请求参数
			const {options, route} = currentPage
			console.log(options); //{id: '1'}
			//参数的key
			const optionsKeys = Object.keys(options)
			console.log(optionsKeys)  //['id']
			let params = ''
			if(optionsKeys.length !== 0){
				params = optionsKeys.reduce((pre, current) => {
					return `${pre}${current}=${options[current]}&`
				}, '?').slice(0,-1)
			}
			console.log(params); //?id=1
			
			//缓存当前页，用于登录或者注册之后的跳转
			uni.setStorageSync('back_url', route + params)

			vm.$u.toast('请登录');
			setTimeout(() => {
				vm.$u.route({
					type: 'redirect',
					url: 'pages/auth/login',
				});
			}, 2000);
			return false
		}
		return true
	}

	/**
    * 更新用户信息，更新vuex_user
    */
    const updateUser = async () => {
		//请求用户信息
		const userInfo = await vm.$u.api.userInfo();
		
		//缓存用户信息
		vm.$u.vuex('vuex_user', userInfo);
	}
	
	vm.$u.utils = {
		isLogin,
		updateUser
	}
}

export default {
	install
}
