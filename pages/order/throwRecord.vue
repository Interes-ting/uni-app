<!-- 我的扔单 -->
<template>
	<view class="thorwRecord-content">
		<block v-for="(item, index) in Info" :key="index">
			<view class="mt-card">
				<view class="mt-startcity">
					<view class="mtfa mt-begin" style="color:#0B398F;"></view>
					<text class="space bold">{{item.fromAddress}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mtfa mt-xiedian " style="color:#009A00;"></view>
					<text class="space bold">{{item.toAddress}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text>订单金额：{{item.price}}元</text>
					<text style="margin-left: 46.66rpx;">扔单提成：{{item.payAmount}}元</text>
				</view>
				<view class="mt-startcity">
					<view class="mtfa mt-juli text-grey "></view>
					<text class="text-grey">距离：{{item.distance}}公里</text>
				</view>
				<view class="mt-startcity">
					<view class="mtfa mt-clocks text-grey "></view>
					<text class="text-grey">出发时间：{{item.deliveryTime}} </text>
				</view>
				<view class="mt-startcity">
					<view class="mtfa mt-box text-grey "></view>
					<text class="text-grey">搬运物品：{{item.goods}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：{{item.createTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text>此订单由长沙运邦搬家提供</text>
				</view>
				<button class="mt-viewbutton" @tap="goThrowOrderInfo(item)">详情</button>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Info: null,
			throwMerchantInfoId:''
		};
	},
	onLoad() {
		this.getThrowRecord();
		this.throwMerchantInfoId =  this.$mtAccount.info().merchantInfoId;
	},
	onShow() {
		this.getThrowRecord();
	},
	methods: {
		goThrowOrderInfo: function(item) { //跳转到扔单详情
			let param = item;
			param = param.id
			uni.navigateTo({
				url:'throwOrderInfo?id='+param
			})
		},
		
		getThrowRecord: function() { //发送网络请求
	
			this.$mtRequest.post(this.$mtConfig.getPlatformUrl('api/order_info/grabed_record/v2'), 
			{ type: '0', throwMerchantInfoId: this.throwMerchantInfoId}, res => {
				this.Info = res.data;
				//结束操作
				this.$mtRequest.stop();
			});
		},
		
	}
};
</script>

<style lang="scss" scoped>
.thorwRecord-content {
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
	color: #666666;
	font-size: 25.52rpx;
}
.mt-card {
	position: relative;
	padding: 13.33rpx;
	background-color: #ffffff;
	box-shadow: 0px 0px 25.33rpx 0px rgba(0, 0, 0, 0.08);
	border-radius: 13.33rpx;
	margin-bottom:20rpx;
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
</style>
