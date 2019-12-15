<!-- 我的扔单详情 -->
<template>
	<view class="oderList-content">
		<view class="mt-card">
			<!-- 城市 -->
			<view class="mt-city">
				<view class="mt-startcity">
					<view class="mtfa mt-begin" style="color:#0B398F;">
					</view>
					<text class="space bold">{{this.oderList.fromAddress}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mtfa mt-xiedian " style="color:#009A00;">
					</view>
					<text class="space bold">{{this.oderList.toAddress}}</text>
				</view>
			</view>
			<!-- 订单详情 -->
			<view class="mt-oderinfo">
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">车辆类型：{{this.oderList.carTypeName}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">派车数量：{{this.oderList.vehiceNumber}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">客户名：{{this.oderList.customerName}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">手机号：{{this.oderList.phone}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬出地址：{{this.oderList.fromAddress}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬出电梯楼层：{{this.oderList.outEleveator}}，{{this.oderList.outFloor}}楼</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">到达地址：{{this.oderList.toAddress}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬入电梯楼层：{{this.oderList.outEleveator}}，{{this.oderList.outFloor}}楼</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">出发时间：{{this.oderList.deliveryTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：{{this.oderList.createTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">被抢时间：{{this.oderList.robTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬运人数：{{this.oderList.handlingNumber}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">拆装服务：{{this.oderList.isItChai}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬运物品：{{this.oderList.goods}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">注意事项：{{this.oderList.remark}}</text>
				</view>
			</view>
			<!-- 收益 -->
			<view class="mt-city">
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">订单金额：{{this.oderList.price}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">订单服务费：{{this.oderList.rowCommissionRatio}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">平台服务费：{{this.oderList.rowPlatformFee}}</text>
					<text class="text-grey" 
					style="float:right;margin-right:20rpx;">
						实际所得：{{this.shouru}}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			oderList:null,
			shouru:null,
		};
	},
	onLoad(option) {
		console.log(option);
		this.oderList = option;
		this.shouru = this.oderList.payAmount + this.oderList.thowPlatformFee
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.oderList-content {
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
