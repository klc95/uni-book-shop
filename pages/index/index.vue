<template>
	<view>
		<u-swiper :list="slides" name="img_url" height="320"></u-swiper>

		<view class="u-text-center u-margin-20">
			<u-tabs :list="sortList" :is-scroll="false" :current="currentSort" @change="changeSort" bar-width="100" item-width="160"></u-tabs>
		</view>

		<u-row gutter="16" class="u-skeleton">
			<u-col span="6" v-for="item in goods.length !== 0 ? goods : 4">
				<navigator url="" class="goods-item">
					<u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="item.cover_url"></u-image>
					<view class="title u-line-1 u-skeleton-rect">{{ item.title ? item.title : '商品名称' }}</view>
					<view class="u-flex u-row-between">
						<view class="price u-skeleton-rect">¥ {{ item.price }}</view>
						<view class="sales u-skeleton-rect">销量：{{ item.sales }}</view>
					</view>
				</navigator>
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
			goods: [],
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
			this.goods = [];
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
			this.goods = [...this.goods, ...res.goods.data];
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
	.goods-item {
		padding: 40rpx;
		margin-top: 30rpx;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
		.title {
			margin: 10rpx 0;
			font-weight: 500;
			font-size: 32rpx;
			width: 100%;
		}
		.price {
			color: red;
			width: 40%;
		}
		.sales {
			color: #888;
			width: 40%;
		}
	}
</style>
