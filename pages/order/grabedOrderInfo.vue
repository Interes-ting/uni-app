<!-- 我的扔单详情 -->
<template>
	<view class="gradOrderInfo-content">
		<!-- {{JSON.stringify(OrderInfo)}} -->
		<view class="mt-card" v-if="OrderInfo != null" >
			<!-- 城市 -->
			<view class="mt-city">
				<view class="mt-startcity" style="display: flex;">
					<view class="mtfa mt-begin" style="color:#0B398F;"></view>
					<view class="space bold" style="word-break: break-all;">{{OrderInfo.fromAddress}}</view>
				</view>
				<view class="mt-startcity" style="display: flex;margin-top: 10rpx;">
					<view class="mtfa mt-xiedian" style="color:#009A00;"></view>
					<view class="space bold" style="word-break: break-all;">{{OrderInfo.toAddress}}</view>
				</view>
			</view>
			<!-- 订单详情 -->
			<view class="mt-oderinfo">
				<view class="mt-startcity" v-if="OrderInfo.carTypeName != null || OrderInfo.carTypeName != ''">
					<view class="mt-placebox"></view>
					<text class="text-grey">车辆类型：{{OrderInfo.carTypeName}}</text>
				</view>
				<view class="mt-startcity"  v-if="OrderInfo.vehiceNumber != null || OrderInfo.vehiceNumber != ''">
					<view class="mt-placebox"></view>
					<text class="text-grey">派车数量：{{OrderInfo.vehiceNumber}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">订单金额：{{OrderInfo.price}}元</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">客户名：{{OrderInfo.customerName}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">手机号：{{OrderInfo.phone}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬出电梯楼层：{{OrderInfo.outEleveator}}，{{OrderInfo.outFloor}}楼</text>
				</view>
	
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬入电梯楼层：{{OrderInfo.intoElevator}}，{{OrderInfo.intoFloor}}楼</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">出发时间：{{OrderInfo.deliveryTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：{{OrderInfo.createTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">是否急单：{{OrderInfo.isItUrgent ==1?'是':'否'}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">被抢时间：{{OrderInfo.robTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬运人数：{{OrderInfo.handlingNumber}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey" >拆装服务：{{OrderInfo.isItchai ==0?'不需要':'需要'}}</text>
				</view>
			<!-- 搬运物品 -->
				<view class="mt-startcity" style="display: flex;text-align: left;" v-if="OrderInfo.goods">
					<view style="width: 160rpx;text-align:left;">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬运物品：</text>
					</view>
					<view  class="text-grey" style="word-break: break-all;">{{OrderInfo.goods}}</view>
				</view>
				<!-- 注意事项 -->
				<view class="mt-startcity" style="display: flex;" v-if="OrderInfo.remark">
					<view style="width: 160rpx;text-align:left ;">
						<view class="mt-placebox"></view>
						<text class="text-grey">注意事项：</text>
					</view>
					<view  class="text-grey" style="text-align:left; word-break: break-all;">{{OrderInfo.remark}}</view>
				</view>
			</view>
			<!-- 收益 -->
			<view class="mt-city">
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单提成：{{OrderInfo.payAmount}}元</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">平台服务费：{{OrderInfo.rowPlatformFee}}元
					</text>
					<text class="text-grey" 
					style="float:right;margin-right:20rpx;">
						实际支付：{{needPay}}元
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
			OrderInfo:null, //订单列表
			needPay:null, //实际支付
			id:'' //订单id
		};
	},
	onLoad(option) {

		this.id = option.id;
		this.getOrderInfo();
	},
	methods: {
		textareaBInput(e) {
			this.textareaBValue = e.detail.value
		},
		getOrderInfo:function(){

			this.$mtRequest.get(this.$mtConfig.getPlatformUrl('api/order_info/orderInfoFindById?id='+this.id),{}, (res) => {
				if(res.state==1){
					this.OrderInfo =res.data;
					this.needPay = Number(this.OrderInfo.payAmount) + Number(this.OrderInfo.rowPlatformFee)

				}
				this.$mtRequest.stop();//结束loading等待
			});
		}
		
	}
};
</script>

<style lang="scss" scoped>
.gradOrderInfo-content {
	padding: 20rpx;

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
