<!-- 抢单详情 -->
<template>
	<view class="gradRecord-content">
		<view class="mt-card" v-if="carList != null">
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-truck" style="color:#CB8861;"></text>
					<text>车辆类型：</text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.carTypeName }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-weixiu" style="color:#599CEE"></text>
					<text>派车数量：</text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.handlingNumber }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-person" style="color: #DD524D;"></text>
					<text>搬运人数：</text>
				</view>
				<view class="mt-frbox"><text>2人</text></view>
			</view>
			<view class="mt-content-box" style="border-bottom: 0rpx;">
				<view class="mt-flbox" style="width: 270rpx;">
					<view class="mt-circle"></view>
					<text >搬出地址：</text>
				</view>
				<view class="mt-frbox" style="text-align: left;word-break: break-all;">
					<text>{{ carList.fromAddress }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<view class="mt-placebox"></view>
					<text></text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.intoElevator }}，{{ carList.intoFloor }}</text>
				</view>
			</view>
			<view class="mt-content-box" style="border-bottom: 0rpx;">
				<view class="mt-flbox" style="width: 270rpx;">
					<view class="mt-circle bgc"></view>
					<text>搬入地址：</text>
				</view>
				<view class="mt-frbox" style="text-align: left;word-break: break-all;">
					<text>{{ carList.toAddress }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<view class="mt-placebox"></view>
					<text></text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.outEleveator }}，{{ carList.outFloor }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-clocks" style="color:#59ED6D;"></text>
					<text>搬家时间：</text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.deliveryTime }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-juli" style="color:#31A6A9;"></text>
					<text>距离(公里)：</text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.distance }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-jine" style="color:#E9E32B"></text>
					<text>订单金额：</text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.price }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-fuwufei" style="color:#E9BC37;"></text>
					<text>订单金额：</text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.price }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text
						class="mtfa mt-fuwufei"
						style="color:#E9BC37;font-size: 45rpx;margin-right:0rpx;position: relative;
								left:-8rpx;"
					></text>
					<text>扔单提成：</text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.payAmount }}</text>
				</view>
			</view>
			<view class="mt-content-box" v-if="carList.isItchai == 1">
				<view class="mt-flbox">
					<text class="mtfa mt-weixiu" style="color:blue;"></text>
					<text>拆卸服务：</text>
				</view>
				<view class="mt-frbox"><text>需要</text></view>
			</view>
			<!-- 搬运物品 -->
			<view class="mt-content-box">
				<view style="width:270rpx;">
					<text class="mtfa mt-box" style="color:orange;"></text>
					<text style="">搬运物品：</text>
				</view>
				<view style="width:100%;word-break:break-all;text-align: left;">{{ carList.goods }}</view>
			</view>
			<view style="display: flex;padding: 20rpx 0rpx;">
				<view style="width:250rpx;">
					<text class="mtfa mt-warn" style="color:red;padding-right: 10rpx;"></text>
					<text style="">注意事项：</text>
				</view>
				<view style="width:100%;word-break:break-all;text-align: left;">{{ carList.remark }}</view>
			</view>
		</view>

		<view style="text-align: center;">
			<button class="mt-seedeil-btn" @tap="payMoney()">
				<text class="text-price" style="margin-right: 30rpx;">{{ weixinpay }}</text>
				抢单并支付
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			carList: '',
			orderId: null,
			robMerchantInfoId: this.$mtAccount.info().merchantInfoId,
			pay: null,
			weixinpay: '' //抢单支付金额
		};
	},
	onLoad: function(option) {
		this.orderId = option.id;
	},
	onShow() {
		this.getInfo();
	},
	methods: {
		getInfo: function() {
			//获取订单信息
			this.$mtRequest.get(this.$mtConfig.getPlatformUrl('api/order_info/orderInfoFindById?id=' + this.orderId), {}, res => {
				if (res.state == 1) {
					this.carList = res.data;
					this.weixinpay = Number(this.carList.payAmount) + Number(this.carList.rowPlatformFee);
				}
				this.$mtRequest.stop(); //结束loading等待
			});
		},

		payMoney: function() {
			// 抢单并支付

			this.$mtRequest.post(
				this.$mtConfig.getPlatformUrl('api/order_info/grab2'),
				{
					type: '1',
					orderId: this.orderId,
					robMerchantInfoId: this.robMerchantInfoId,
					paymentAmount: this.weixinpay
				},
				res => {
					// 抢单成功后跳转支付
					if ((res.state = 1)) {
						this.pay = res.data;
						this.$mtRequest.post(
							this.$mtConfig.getPlatformUrl('api/order_info/grab_payed_notice_cs'),
							{
								orderInfoId: this.pay.orderInfoId,
								robMerchantInfoId: this.pay.robMerchantInfoId,
								orderGrabId: this.pay.orderGrabId,
								payPayOrderId: this.pay.payPayOrderId,
								prepayid: this.pay.prepayid
							},
							res => {
								if (res.state == 1) {
									uni.showToast({
										title: '抢单成功',
										success: function() {
											setTimeout(function() {
												uni.navigateTo({ url: 'grabRecord' });
											}, 2000);
										}
									});
								}
								this.$mtRequest.stop();
							}
						);
					}
				}
			);
			//防重复
			if (this.$mtRequest.isRepeat()) {
				return;
			}
			this.$mtRequest.stop(); //结束loading等待

			/* // 跳转到抢单记录
			uni.navigateTo({
				url:'grabRecord'
			}) */
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	font-size: 26.66rpx;
	color: #333333;
	text-align: center;
}
.content {
	border: 5px solid blue;
	overflow: hidden;
}
.leftpanel {
	background-color: red;
	width: 300px;
	height: auto;
	float: left;
	padding-bottom: 3000px;
	margin-bottom: -3000px;
}
#right {
	padding-left: 300px;
}
#rightpanel {
	background-color: green;
	height: 100px;
	padding-bottom: 3000px;
	margin-bottom: -3000px;
}
.gradRecord-content {
	padding: 20rpx;
}
.mt-card {
	padding: 0rpx 20rpx;
	background-color: #ffffff;
	box-shadow: 0px 0px 25.33rpx 0px rgba(0, 0, 0, 0.08);
	border-radius: 13.33rpx;
	margin: 13.33rpx 0rpx;
	margin-bottom: 40rpx;
	.mt-content-box {
		display: flex;
		justify-content: space-between;
		border-bottom: 0.33rpx solid #eeeeee;
		padding: 20rpx 13.33rpx 20rpx 0rpx;
		.mt-placebox {
			display: inline-block;
			width: 33.33rpx;
			background-color: red;
			text-align: center;
		}
		.mt-circle {
			display: inline-block;
			position: relative;
			margin-right: 20rpx;
			width: 8rpx;
			height: 8rpx;
			border-radius: 50%;
			background-color: #09bb07;
		}
		.bgc {
			background-color: rgba(183, 26, 0, 1);
		}
		.mtfa {
			margin-right: 13.33rpx;
			font-size: 33.33rpx;
		}
	}
}
.mt-seedeil-btn {
	width: 416.74rpx;
	height: 71.08rpx;
	text-align: center;
	line-height: 71.08rpx;
	border-radius: 35.54rpx;
	background: linear-gradient(#1880ff, #6fafff);
	color: #fff;
	font-size: 31.3rpx;
	margin-bottom: 20rpx;
}
</style>
