<template>
	<view>
		<u-swiper :list="slides" name="img_url" height="320"></u-swiper>

		<view class="u-text-center u-margin-20">
			<u-tabs :list="sortList" :is-scroll="false" :current="currentSort" @change="changeSort" bar-width="100" goods-width="160"></u-tabs>
		</view>

		<u-row gutter="16" class="u-skeleton">
			<u-col span="6" v-for="goods in goodsList.length !== 0 ? goodsList : [{}, {}, {}, {}]">
				<goodsList-card :goods="goods"></goodsList-card>
			</u-col>
		</u-row>

		<!-- 骨架屏 -->
		<u-skeleton :loading="loading" el-color="#ddd" bg-color="#fff"></u-skeleton>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sortList: [
				{
					name: '默认'
				},
				{
					name: '销量'
				},
				{
					name: '推荐'
				},
				{
					name: '最新'
				}
			],
			currentSort: 0,
			goodsList: [],
			slides: [],
			page: 1,
			loading: false
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		changeSort(index) {
			this.currentSort = index;
			console.log(index);
			this.goodsList = [];
			this.page = 1;
			this.getData();
		},
		//获取数据
		async getData() {
			//显示骨架屏
			this.loading = true;
			const params = {
				page: this.page
			};
			if (this.currentSort === 1) params.sales = 1;
			if (this.currentSort === 2) params.recommand = 1;
			if (this.currentSort === 3) params.new = 1;
			const res = await this.$u.api.index(params);
			console.log(res);
			//隐藏骨架屏
			this.loading = false;
			this.goodsList = [...this.goodsList, ...res.goodsList.data];
			this.slides = res.slides;
		}
	},
	onReachBottom() {
		this.page = this.page + 1;
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
	
</style>
