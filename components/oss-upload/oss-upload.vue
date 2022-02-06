<template>
   <u-upload 
   ref="upload"
   :action="action"
   :before-upload="beforeUpload"
   :max-size="5 * 1024 * 1024" 
    max-count="1"
   :custom-btn="true"
   :show-progress="false"
   :form-data="formData"
   :multiple="false"
   :deletable="false"
   @on-success="onSuccess">
   <u-avatar slot="addBtn" :src="vuex_user.avatar_url" size="140"></u-avatar>
	</u-upload>
</template>

<script>
	let _this={}
	export default {
		name:"oss-upload",
		data() {
			return {
				action: "http://www.example.com/upload",
				formData: {},
				upFileName:""
			};
		},
		created() {
			// wx小程序中this会在上传前钩子内丢失
			_this = this
		},
		methods: {
			//上传前的钩子
			async beforeUpload(index, list) {
				// 设置唯一文件名
				const {file} = list[0]
				// #ifdef H5
				const fileName = file.name
				//  #endif
				// 小程序拿的是path
				// #ifndef H5
				const fileName = file.path
				//  #endif
				
				// 请求获取oss-token的api
				const ossToken = await _this.$u.api.authOssToken()
				// 设置上传域名
				_this.action = ossToken.host
				_this.upFileName = upFileName
				//处理唯一文件名
				const suffix = fileName.slice(fileName.lastIndexOf("."))  //后缀名
				const upFileName = _this.$u.guid(20)+suffix //附上唯一标识符
				console.log(upFileName)
				// 额外的上传参数
				_this.formData = {
					'key' : upFileName, //上传后的文件名
					'policy': ossToken.policy,
					'OSSAccessKeyId': ossToken.accessid, 
					'success_action_status': '200', //让服务端返回200,不然，默认会返回204
					'signature': ossToken.signature,
				}
				return true;
			},
			// 上传成功后发射事件给父组件 (带图片key参数)
			async onSuccess(){
				//移除预览区域的图片
				this.$refs.upload.remove(0)
				
				//请求API更新头像
				await this.$u.api.userAvatar({avatar: this.upFileName})
				
				//更新缓存的用户信息
				this.$u.utils.updateUser()
				
				this.$u.toast('更新成功')
			}
		} 
	}
</script>

<style>

</style>
