<!-- 抢单详情 -->
<template>
	<view class="gradRecord-content">
		<view class="mt-card" v-if="carList != null" style="padding-bottom: 40rpx;">
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
					<text class="mtfa mt-leixing" style="color:#599CEE"></text>
					<text>派车数量：</text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.vehiceNumber }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-duoren" style="color: #DD524D;"></text>
					<text>搬运人数：</text>
				</view>
				<view class="mt-frbox"><text>{{carList.handlingNumber}}</text></view>
			</view>
			<view class="mt-content-box" style="border-bottom: 0rpx;">
				<view class="mt-flbox" style="width: 270rpx;">
					<view class="mt-circle"></view>
					<text>搬出地址：</text>
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
					<text>{{ carList.outEleveator }}，{{ carList.outFloor }}</text>
				</view>
			</view>
			<view class="mt-content-box" style="border-bottom: 0rpx;">
				<view class="mt-flbox" style="width: 270rpx;">
					<view class="mt-circle bgc"></view>
					<text>搬入地址：</text>
				</view>
				<view class="mt-frbox" style="text-align: left;word-break: break-all;">
					<text>{{carList.toAddress }}</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<view class="mt-placebox"></view>
					<text></text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.intoElevator}}, {{carList.intoFloor }}</text>
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
					<text>{{ carList.price }}元</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-fuwufei" style="color:#E9BC37;font-size: 45rpx;margin-right:0rpx;position: relative;
								left:-8rpx;"></text>
					<text>扔单提成：</text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.payAmount }}元</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-fuwufei" style="color:#E9BC37;font-size: 45rpx;margin-right:0rpx;position: relative;
								left:-8rpx;"></text>
					<text>平台服务费：</text>
				</view>
				<view class="mt-frbox">
					<text>{{ carList.rowPlatformFee }}元</text>
				</view>
			</view>
			<view class="mt-content-box">
				<view class="mt-flbox">
					<text class="mtfa mt-weixiu" style="color:blue;"></text>
					<text>拆装服务：</text>
				</view>
				<view class="mt-frbox"><text>{{carList.isItchai ==1?'需要':'不需要'}}</text></view>
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

		<view class="grabBtn">
			<text class="text-price"><text class="price">{{ weixinpay }}</text>元</text>
			<button class="mt-seedeil-btn" @tap="payMoney">
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
				weixinpay: 0 //抢单支付金额
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
				//防重复
				if (this.$mtRequest.isRepeat()) {
					return;
				}
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
				//防重复
				if (this.$mtRequest.isRepeat()) {
					return;
				};

				//开发环境，不调支付接口
				// this.payOverTest();

				//正式环境，调用支付接口
				// #ifdef APP-PLUS
				this.appPay();
				// #endif
				// #ifdef MP-WEIXIN
				this.appletPay();
				// #endif

			},
			//抢单支付接口
			grab(data) {
				this.$mtRequest.post(
					this.$mtConfig.getPlatformUrl('api/order_info/grab2'), data,
					res => {
						// 抢单成功后跳转支付
						if (res.state > 0) {
							// #ifdef APP-PLUS
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: JSON.stringify(res.data),
								success: this.paySuccessCallback,
								fail: this.payFailCallback
							});
							// #endif
							// #ifdef MP-WEIXIN
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.timestamp,
								nonceStr: res.data.noncestr,
								package: res.data.package,
								signType: "MD5",
								paySign: res.data.paysign,
								success: this.paySuccessCallback,
								fail: this.payFailCallback
							});
							// #endif
						} else {
							uni.showToast({
								title: res.message,
								icon: "none"
							})
						}

						this.$mtRequest.stop(); //结束loading等待
					});
			},
			//不支付时使用（仅测试使用，正式不使用）
			payOverTest() {
				this.$mtRequest.post(
					this.$mtConfig.getPlatformUrl('api/order_info/grab2'), {
						type: '1',
						orderId: this.orderId,
						robMerchantInfoId: this.robMerchantInfoId,
						paymentAmount: this.weixinpay
					},
					res => {
						// 抢单成功后跳转支付
						if (res.state > 0) {
							this.$mtRequest.post(
								this.$mtConfig.getPlatformUrl('api/order_info/grab_payed_notice_cs'), {
									orderInfoId: res.data.orderInfoId,
									robMerchantInfoId: res.data.robMerchantInfoId,
									orderGrabId: res.data.orderGrabId,
									payPayOrderId: res.data.payPayOrderId,
									prepayid: res.data.prepayid
								},
								res => {
									if (res.state == 1) {
										uni.showToast({
											title: '抢单成功',
											success: function() {
												setTimeout(function() {
													uni.navigateTo({
														url: 'grabRecord'
													});
												}, 2000);
											}
										});
									};
									this.$mtRequest.stop();
								});
						} else {
							uni.showToast({
								title: res.message,
								icon: "none"
							})
						}

						this.$mtRequest.stop(); //结束loading等待
					});
			},
			// #ifdef APP-PLUS
			appPay() {
				this.grab({
					type: '1',
					orderId: this.orderId,
					robMerchantInfoId: this.robMerchantInfoId,
					paymentAmount: this.weixinpay
				});
			},
			// #endif
			// #ifdef MP-WEIXIN
			appletPay() {
				this.grab({
					type: '3',
					orderId: this.orderId,
					robMerchantInfoId: this.robMerchantInfoId,
					paymentAmount: this.weixinpay,
					"openId": this.$mtAccount.info().openId
				});
			},
			// #endif
			paySuccessCallback() {
				uni.showModal({
					title: '',
					content: '支付成功',
					showCancel: false,
					success: function() {
						uni.navigateTo({
							url: 'grabRecord'
						});
					}
				});
			},
			payFailCallback(a) {
				if (process.env.NODE_ENV === 'development') {
					console.log(JSON.stringify(a))
				}
				uni.showModal({
					title: '',
					content: '支付失败',
					showCancel: false,
					success: function() {
						uni.navigateBack({})
					}
				});
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

	.grabBtn {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 97.82rpx;
		display: flex;

		.text-price {
			width: 46%;
			height: 100%;
			background: white;
			color: rgba(28, 130, 255, 1);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;

			.price {
				font-weight: bold;
				font-size: 38rpx;
				margin: 0 10rpx;
			}
		}

		.mt-seedeil-btn {
			width: 63.9%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background: linear-gradient(0deg, rgba(67, 152, 255, 1) 0%, rgba(28, 130, 255, 1) 100%);
			color: #fff;
			font-size: 32rpx;
			border-radius: 0rpx;
		}
	}
</style>
