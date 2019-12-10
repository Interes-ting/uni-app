<!-- 订单详情 -->
<template>
	<view class="order-content">
		<view class="order-detail">
			<view class="order-detail-one">
				<img src="static/car.png" alt="" class="order-detail-one-img">
				<view class="order-detail-one-text">
					<text class="order-detail-one-text-one">车辆类型:</text>
					<text class="order-detail-one-text-two">小面包车</text>
				</view>
			</view>
			<view class="order-detail-one">
				<img src="static/car.png" alt="" class="order-detail-one-img">
				<view class="order-detail-one-text">
					<text class="order-detail-one-text-one">拆装:</text>
					<text class="order-detail-one-text-two">需要拆装</text>
				</view>
			</view>
			<view class="order-detail-one">
				<img src="static/car.png" alt="" class="order-detail-one-img">
				<view class="order-detail-one-text">
					<text class="order-detail-one-text-one">搬运人数:</text>
					<text class="order-detail-one-text-two">2</text>
				</view>
			</view>
			<view class="order-detail-one">
				<img src="static/car.png" alt="" class="order-detail-one-img">
				<view class="order-detail-one-text">
					<text class="order-detail-one-text-one">派车数量:</text>
					<text class="order-detail-one-text-two">2</text>
				</view>
			</view>
			<view class="order-detail-one">
				<img src="static/car.png" alt="" class="order-detail-one-img">
				<view class="order-detail-one-text">
					<text class="order-detail-one-text-one">订单金额:</text>
					<text class="order-detail-one-text-two">300</text>
				</view>
			</view>
			<view class="order-detail-one">
				<img src="static/car.png" alt="" class="order-detail-one-img">
				<view class="order-detail-one-text">
					<text class="order-detail-one-text-one">扔单提成:</text>
					<text class="order-detail-one-text-two">300</text>
				</view>
			</view>
			<view class="order-detail-one">
				<img src="static/car.png" alt="" class="order-detail-one-img">
				<view class="order-detail-one-text">
					<text class="order-detail-one-text-one">平台服务费:</text>
					<text class="order-detail-one-text-two">6</text>
				</view>
			</view>
			<view class="order-detail-two">
				<view class="order-detail-two-view">
					<view class="order-detail-two-view-pai"></view>
					<view class="order-detail-two-view-where">出发: 地址</view>
				</view>
				<view class="order-detail-two-view">
					<view class="order-detail-two-view-pai"></view>
					<view class="order-detail-two-view-where">目的地: 地址</view>
				</view>
				<view class="order-bar">
					
				</view>
			</view>
			<view class="order-detail-one">
				<img src="static/car.png" alt="" class="order-detail-one-img">
				<view class="order-detail-one-text">
					<text class="order-detail-one-text-one">搬家时间: </text>
					<text class="order-detail-one-text-two">2019-05-20 </text>
				</view>
			</view>
			<view class="order-detail-one">
				<img src="static/car.png" alt="" class="order-detail-one-img">
				<view class="order-detail-one-text">
					<text class="order-detail-one-text-one">距离( 公里 ):</text>
					<text class="order-detail-one-text-two">300</text>
				</view>
			</view>
			<view class="order-detail-one">
				<img src="static/car.png" alt="" class="order-detail-one-img">
				<view class="order-detail-one-flex">
					<view class="order-detail-one-text-jt">楼层: 5</view>
					<view class="order-detail-one-text-jt" style="flex: 1; text-align: center;">搬入</view>
					<view class="order-detail-one-text-jt" style="border:0;text-align: right;">有电梯</view>
				</view>
			</view>
			<view class="order-detail-one" style="height:119rpx ;">
				<img src="static/car.png" alt="" class="order-detail-one-img" style="top:40rpx ;"/>
				<view class="order-detail-one-goods">
					<text class="order-detail-one-text-one">搬运物品:</text>
					<text class="order-detail-one-text-two"></text>
				</view>
			</view>
			<view class="order-detail-one" style="height:119rpx ;">
				<img src="static/car.png" alt="" class="order-detail-one-img" style="top:40rpx ;"/>
				<view class="order-detail-one-goods" style="border:0">
					<text class="order-detail-one-text-one">注意事项:</text>
					<text class="order-detail-one-text-two"></text>
				</view>
			</view>
			
		</view>
		<view style="position: relative;width: 100%;height: 142.17rpx;">
			<button class="mt-seedeil-btn" >&66  抢单并支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.mt-seedeil-btn {
		width: 416.74rpx;
		height: 71.08rpx;
		display: inline-block;
		text-align: center;
		line-height: 71.08rpx;
		border-radius: 35.54rpx;
		background: linear-gradient(#1880FF, #6FAFFF);
		color: #fff;
		font-size: 31.3rpx;
		
		position: absolute;
		bottom: 26.08rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.order-content {
		width: 100%;
		padding: 23.47rpx;
		box-sizing: border-box;
		background-color: #F4F4F4;
		.order-detail {
			width: 100%;
			box-sizing: border-box;
			padding: 0 41.08rpx 0 20.21rpx;
			// height: 130.43rpx;
			background-color: #fff;
			border-radius: 9.78rpx;
			.order-detail-one {
				width: 100%;
				height: 82.82rpx;
				line-height: 82.82rpx;
				display: flex;
				position: relative;
				font-size: 26.08rpx;
				color: #333333;
				.order-detail-one-img {
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 28.69rpx;
					height: 28.69rpx;
					display: inline-block;
				}
				.order-detail-one-text {
					flex: 1;
					// background-color: pink;
					display: inline-block;
					border-bottom: 1px solid #CCCCCC;
					margin-left: 41rpx;
					.order-detail-one-text-one {
						padding-left: 10rpx;
						float: left;
					}
					.order-detail-one-text-two {
						float: right;
					}
				
				}
			}
		}
	}
	.order-detail-two {
		width: 100%;
		height: 166rpx;
		line-height: 82.82rpx;
		font-size: 40px;
		position: relative;
		font-size: 26.08rpx;
		color: #333333;
		background-color: #fff;
		position: relative;
		.order-bar {
			width: 0.65rpx;
			height:45rpx;
			background-color:#cccccc;
			position: absolute;
			left: 16rpx;
			top: 50%;
			transform: translateY( -50%);
		}
		.order-detail-two-view {
			width: 100%;
			height: 82.82rpx;
			align-items: center;
			position: relative;
			display: flex;
			.order-detail-two-view-pai {
				display: inline-block;
				height: 7.82rpx;
				width: 7.82rpx;
				
				background-color: #0000FF;
				border-radius: 7.82rpx;
				margin-left: 14rpx;
			}
			.order-detail-two-view-where {
				flex: 1;
				box-sizing: border-box;
				margin-left: 24rpx;
				padding-left: 10rpx;
				border-bottom: 1px solid #CCCCCC;
			}
		}
	}
	.order-detail-one-flex {
		display: flex;
		width:100%;
		
		margin:3.26rpx 0 3.26rpx 51rpx;
		border-bottom: 1px solid #CCCCCC;
		// text-align: center;
		align-items: center;
		justify-content: space-between;
		.order-detail-one-text-jt {
			flex: 1;
			height: 59.34rpx;
						
			line-height: 59.34rpx;
			border-right: 0.65rpx solid #ccc;
		}
	}
	.order-detail-one-goods {
		height: 119rpx;
		flex: 1;
		// background-color: pink;
		display: inline-block;
		border-bottom: 1px solid #CCCCCC;
		margin-left: 41rpx;
		.order-detail-one-text-one {
			padding-left: 10rpx;
			
		}
	}
</style>
