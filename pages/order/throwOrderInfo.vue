<!-- 我的扔单详情 -->
<template>
	<view class="OrderInfo-content">
		<view class="mt-card">
			<!-- 城市 -->
			<view class="mt-city">
				<view class="mt-startcity">
					<view class="mtfa mt-begin" style="color:#0B398F;">
					</view>
					<text class="space bold">苏州市</text>
				</view>
				<view class="mt-startcity">
					<view class="mtfa mt-xiedian " style="color:#009A00;">
					</view>
					<text class="space bold">苏州市</text>
				</view>
			</view>
			<!-- 订单详情 -->
			<view class="mt-oderinfo">
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
			</view>
			<!-- 收益 -->
			<view class="mt-city">
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：2019-1-29 08:36</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">平台服务费：6</text>
					<text class="text-grey" 
					style="float:right;margin-right:20rpx;">
						实际所得：54
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.OrderInfo-content {
	padding: 13.33rpx;

	color: #333333;
}
.space {
	letter-spacing: 6.66rpx;
}
.bold {
	font-weight: 700;
	font-size: 32rpx;
}
.text-grey {
	color: #999999;
	font-size: 25.52rpx;
}
.mt-card {
	position: relative;
	padding: 13.33rpx;
	background-color: #ffffff;
	box-shadow: 0px 0px 25.33rpx 0px rgba(0, 0, 0, 0.08);
	border-radius: 13.33rpx;
	.mt-city{
		padding-top: 13.33rpx;
	}
	.mt-startcity {
		display: block;
		height: 50rpx;
		line-height: 50rpx;
		width: 100%;
		font-size: 25.52rpx;
		.mtfa {
			display: inline-block;
			font-size: 26.66rpx;
			margin-right: 10rpx;
		}
		.mt-placebox {
			display: inline-block;
			width: 36.66rpx;
		}
	}
	.mt-viewbutton {
		position: absolute;
		right: 26.66rpx;
		bottom: 20rpx;
		width: 124rpx;
		height: 53.33rpx;
		line-height: 53.33rpx;
		background: linear-gradient(to bottom, #1880ff, #509eff);
		/*设置按钮为渐变颜色*/
		border-radius: 26.66rpx;
		font-size: 24rpx;
		color: #ffffff;
	}
}
.mt-oderinfo {
	padding: 13.33rpx 0rpx;
	border-bottom: 1px solid #cccccc;
}
</style>
