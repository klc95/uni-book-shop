<template>
	<navigator url="" class="goods-item">
		<u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="goods.cover_url"></u-image>
		<view class="title u-line-1 u-skeleton-rect">{{ goods.title ? goods.title : '商品名称' }}</view>
		<view class="u-flex u-row-between">
			<view class="price u-skeleton-rect">¥ {{ goods.price }}</view>
			<view class="sales u-skeleton-rect">销量：{{ goods.sales }}</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:"goods-card",
		data() {
			return {
				
			};
		},
		props: {
			goods: {
				type: Object,
				default() {
					return {}
				}
			}
		}
	}
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
