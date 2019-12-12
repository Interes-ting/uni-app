<!-- 抢单详情 -->
<template>
	<view class="order-content">
			<view class="order-detail">
				<view class="order-detail-one">
					<view class="order-detail-one-img mtfa mt-truck" style="color: #C98259;"></view>
					<view class="order-detail-one-text">
						<text class="order-detail-one-text-one">车辆类型:</text>
						<text class="order-detail-one-text-two">{{this.carList.carTypeName}}</text>
					</view>
				</view>
				<view class="order-detail-one">
					<view class="order-detail-one-img mtfa mt-weixiu" style="color: #2C81E9;"></view>
					<view class="order-detail-one-text">
						<text class="order-detail-one-text-one">拆装:</text>
						<text class="order-detail-one-text-two"></text>
					</view>
				</view>
				<view class="order-detail-one">
					<view class="order-detail-one-img mtfa mt-duoren" style="color: #EA7035;"></view>
					<view class="order-detail-one-text">
						<text class="order-detail-one-text-one">搬运人数:</text>
						<text class="order-detail-one-text-two">2</text>
					</view>
				</view>
				<view class="order-detail-one">
					<view class="order-detail-one-img mtfa mt-leixing" style="color: #9948EC;"></view>
					<view class="order-detail-one-text">
						<text class="order-detail-one-text-one">派车数量:</text>
						<text class="order-detail-one-text-two">2</text>
					</view>
				</view>
				<view class="order-detail-one">
					<view class="order-detail-one-img mtfa mt-jine" style="color: #E9E32B;"></view>
					<view class="order-detail-one-text">
						<text class="order-detail-one-text-one">订单金额:</text>
						<text class="order-detail-one-text-two">{{this.carList.price}}</text>
					</view>
				</view>
				<view class="order-detail-one">
					<view class="order-detail-one-img mtfa mt-fuwufei" 
					style="color: #E8B82B;font-size: 45rpx;position: absolute;left: -10rpx;"></view>
					<view class="order-detail-one-text">
						<text class="order-detail-one-text-one">扔单提成:</text>
						<text class="order-detail-one-text-two">300</text>
					</view>
				</view>
				<view class="order-detail-one">
					<view class="order-detail-one-img mtfa mt-fuwufei" 
					style="color: #E8B82B;font-size: 45rpx;position: absolute;left: -10rpx;"></view>
					<view class="order-detail-one-text">
						<text class="order-detail-one-text-one">平台服务费:</text>
						<text class="order-detail-one-text-two">6</text>
					</view>
				</view>
				<view class="order-detail-two">
					<view class="order-detail-two-view">
						<view class="order-detail-two-view-pai"></view>
						<view class="order-detail-two-view-where">出发: {{this.carList.fromAddress}}</view>
					</view>
					<view class="order-detail-two-view">
						<view class="order-detail-two-view-pai" style="background-color:#990000 ;"></view>
						<view class="order-detail-two-view-where">目的地: {{this.carList.toAddress}}</view>
					</view>
					<view class="order-bar"></view>
				</view>
				<view class="order-detail-one">
					<view class="order-detail-one-img mtfa mt-clocks" style="color: #3FEA57;"></view>
					<view class="order-detail-one-text">
						<text class="order-detail-one-text-one">搬家时间:</text>
						<text class="order-detail-one-text-two">{{this.carList.deliveryTime}}</text>
					</view>
				</view>
				<view class="order-detail-one">
					<view class="order-detail-one-img mtfa mt-juli" style="color:#23A0A3;"></view>
					<view class="order-detail-one-text">
						<text class="order-detail-one-text-one">距离( 公里 ):</text>
						<text class="order-detail-one-text-two">{{this.carList.distance}}</text>
					</view>
				</view>
				<view class="order-detail-one">
					<view class="order-detail-one-img mtfa mt-louceng" style="color:#0C2D93;"></view>
					<view class="order-detail-one-flex">
						<view class="order-detail-one-text-jt">楼层:{{this.carList.floor}}</view>
						<view class="order-detail-one-text-jt" style="flex: 1; text-align: center;">搬入</view>
						<view class="order-detail-one-text-jt" style="border:0;text-align: right;">有电梯</view>
					</view>
				</view>
				<view class="order-detail-one" style="height:119rpx ;">
					<view class="order-detail-one-img mtfa mt-box" style="color:#EA9031;top:40rpx ;"></view>
					<view class="order-detail-one-goods">
						<text class="order-detail-one-text-one">搬运物品:</text>
						<text class="order-detail-one-text-two">{{this.carList.goods}}</text>
					</view>
				</view>
				<view class="order-detail-one" style="height:119rpx ;">
					<view class="order-detail-one-img mtfa mt-box" style="color:#E9372C;top:40rpx ;"></view>
					<view class="order-detail-one-goods" style="border:0">
						<text class="order-detail-one-text-one">注意事项:</text>
						<text class="order-detail-one-text-two">{{this.carList.remark}}</text>
					</view>
				</view>
			</view>
			<view style="position: relative;width: 100%;height: 142.17rpx;">
				<button class="mt-seedeil-btn" @tap="payMoney">
					<text class="text-price" style="margin-right: 30rpx;" >{{this.carList.payAmount}}</text>
					抢单并支付
				</button>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			carList: null,
			orderId:null, //订单id
			robMerchantInfoId:null //抢单商家Id
		};
	},
	onLoad: function(option) {
		this.carList = option; //接收首页传递过来的参数
	},
	mounted:function(){
		this.orderId =this.carList.id;
		this.robMerchantInfoId = this.carList.robMerchantInfoId;
		// console.log('订单id:'+this.orderId+',抢单商家id：'+this.robMerchantInfoId)
	},
	methods: {
		payMoney:function(orderId){
			// 发送网络请求
			this.$mtRequest.post(this.$mtConfig.getPlatformUrl('api/order_info/wait_grab_record'), 
			{'type':'1','orderId':this.orderId,'robMerchantInfoId':this.robMerchantInfoId},
			(res)=>{
				this.$mtRequest.stop();//结束loading等待
			});
			// 跳转到抢单记录
			let param = {'oderid11':this.orderId}
			this.$navTo.togo('./grabRecord',param);
		}
	}
};
</script>

<style lang="scss" scoped>
.mt-seedeil-btn {
	width: 416.74rpx;
	height: 71.08rpx;
	display: inline-block;
	text-align: center;
	line-height: 71.08rpx;
	border-radius: 35.54rpx;
	background: linear-gradient(#1880ff, #6fafff);
	color: #fff;
	font-size: 31.3rpx;

	position: absolute;
	bottom: 26.08rpx;
	left: 50%;
	transform: translateX(-50%);
	.view {
		width: 3.33rpx;
		display: inline-block;
	}
}
.order-content {
	width: 100%;
	padding: 23.47rpx;
	box-sizing: border-box;
	background-color: #f4f4f4;
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
			font-size: 32rpx;
			color: #333333;
			.order-detail-one-img {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 33.33rpx;
				height: 33.33rpx;
				line-height: 33.33rpx;
				display: inline-block;
				font-size: 33.33rpx;
			}
			.order-detail-one-text {
				flex: 1;
				// background-color: pink;
				display: inline-block;
				border-bottom: 1px solid #cccccc;
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
		height: 45rpx;
		background-color: #cccccc;
		position: absolute;
		left: 16rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	.order-detail-two-view {
		width: 100%;
		height: 82.82rpx;
		align-items: center;
		position: relative;
		display: flex;
		.order-detail-two-view-pai {
			display: inline-block;
			height: 8rpx;
			width: 8rpx;
			background-color: #0000ff;
			border-radius: 50%;
			margin-left: 14rpx;
		}
		.order-detail-two-view-where {
			flex: 1;
			box-sizing: border-box;
			margin-left: 24rpx;
			padding-left: 10rpx;
			border-bottom: 1px solid #cccccc;
		}
	}
}
.order-detail-one-flex {
	display: flex;
	width: 100%;

	margin: 3.26rpx 0 3.26rpx 51rpx;
	border-bottom: 1px solid #cccccc;
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
	border-bottom: 1px solid #cccccc;
	margin-left: 41rpx;
	.order-detail-one-text-one {
		padding-left: 10rpx;
	}
}

</style>
