<template>

	<view class="mt-body">
		<view class="mt-zwf">
		</view>
		<view class="mt-cardback">
			<view class="mt-carsbk">
				<view class="mt-cartext">
					<view class="mt-cartext-size">
						{{bankName}}
					</view>
					<view class="">

					</view>
				</view>
				<view class="mt-carkp mtfa mt-rili">

				</view>
			</view>
			<view class="mt-carxbk">
				{{cardNo}}
			</view>

		</view>

		<view class="mt-mony">
			<view class="mt-monyto">
				<view class="mt-monyton">
					￥
				</view>
				<view class="mt-monyttwo">
					{{withdrawable}}
				</view>
			</view>
		</view>
		<view class="mt-loginbutn">
			<button class="mt-loginbutndl" type="primary" @click="earningstthree">提现到银行卡</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankName:'',
				cardNo:'',
				amount:'0',
				name:'',
				merchantCode:'0',
				withdrawable:'0',
			}
		},
		onLoad() {
			this.earnings() ;
			this.earningstwo();
			this.earningsmo();
		},
		methods: {
			//查询
			earnings() {
				// 获取用户id
			 let merchantInfoId = this.$mtAccount.info().merchantInfoId
					// let that=this;
					this.$mtRequest.get(this.$mtConfig.getPlatformUrl("api/bank_card/get"), {use_id: merchantInfoId
					}, (data) => {	
						
						if (data.state > 0) {
						this.bankName =	data.data.bankName
						this.cardNo =	data.data.cardNo
						this.name =	data.data.name
						} else {
							
							//登录失败
							uni.showToast({
								title: data.message,
								icon: "none"
							})
						}

						//结束请求
						this.$mtRequest.stop();
					})
			},
			//查询
			earningstwo() {
			let merchantInfoId = this.$mtAccount.info().merchantInfoId
			console.log(merchantInfoId)
				// let that=this;
				this.$mtRequest.post(this.$mtConfig.getPlatformUrl("api/balanceinfo/selectBalanceinfo"), {
					merchantId: merchantInfoId
				}, (data) => {
				
					if (data.state > 0) {
						this.withdrawable = data.data.withdrawable;
					} else {
						//登录失败
						uni.showToast({
							title: data.message,
							icon: "none"
						})
					}
			
					//结束请求
					this.$mtRequest.stop();
				})
				
			},
			//查询
			earningsmo() {
			let merchantInfoId = this.$mtAccount.info().merchantInfoId
			
				// let that=this;
				this.$mtRequest.post(this.$mtConfig.getPlatformUrl("api/merchant_info/selectUser"), {
					merchantId: merchantInfoId
				}, (data) => {
					
					if (data.state > 0) {
						
					} else {
						//登录失败
						uni.showToast({
							title: data.message,
							icon: "none"
						})
					}
			
					//结束请求
					this.$mtRequest.stop();
				})
				
			},
			earningstthree() {
				//防重复
				if (this.$mtRequest.isRepeat()) {
					return;
				}
				
			let merchantInfoId = this.$mtAccount.info().merchantInfoId
				// let that=this;
			if(this.withdrawable > 0){
				this.$mtRequest.post(this.$mtConfig.getPlatformUrl("api/BalanceWithdrawApi/CashWithdrawal"), {
					merchantId: merchantInfoId,amount:this.withdrawable,cardNo:this.cardNo,cardBank:this.bankName,name:this.name,phone:this.merchantCode
				}, (data) => {
					console.log(data.data)
					if (data.state > 0) {
						uni.showToast({
							title: "提现成功",
							success: function() {
								setTimeout(function() {
									uni.navigateTo({
										url: '../wallet/wallet'
									});
								}, 2000)
							}
						})
						
					} else {
						//登录失败
						uni.showToast({
							title: data.message,
							icon: "none"
						})
					}
							
					//结束请求
					this.$mtRequest.stop();
				})
			}else{
				uni.showToast({
					title: "暂无可提现金额",
					icon: "none"
				})
			}
			},
		}
	}
</script>

<style>
	.mt-cartext-size {
		font-size: 30rpx;
		font-weight: bold;
	}

	.mt-carsbk {
		height: 85rpx;
	}

	.mt-loginbutn {
		width: 510rpx;
		height: 88rpx;
		margin: 20% auto;
		border: 20;
		font-size: 15rpx;
		font-weight: 400;

	}

	.mt-loginbutndl {
		border-radius: 40rpx;
		background: linear-gradient(to bottom, #6FAFFF, #1880FF);
		/*设置按钮为渐变颜色*/
	}

	.mt-body {
		display: block;
		height: 100%;
		background-color: #FFFFFF;
		background-size: 100% 100%;
	}

	uni-page-body {
		height: 100%;
	}

	.mt-monyton {
		width: 10%;
		float: left;
		height: 55rpx;
		line-height: 70rpx;
	}

	.mt-monyttwo {
		float: left;
		font-size: 50rpx;
		font-weight: bold;
		height: 55rpx;
	}

	.mt-zwf {
		height: 30rpx;
	}

	.mt-mony {
		width: 600rpx;
		margin: 15% auto;
		border-radius: 20rpx;
		height: 200rpx;
		border: 1rpx solid #FFFFFF;
		box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.2);
		background-color: #FFFFFF;
	}

	.mt-carbk {
		height: 80rpx;
		width: 100%;

	}

	.mt-monyto {
		width: 90%;
		margin: 80rpx 5% 40rpx 5%;
		background-color: #FFFFFF;
		height: 80rpx;

		text-align: center;
		border-bottom: 1px solid #CCCCCC;
	}

	.mt-cardback {
		width: 530rpx;
		height: 170rpx;
		background: linear-gradient(0deg, rgba(28, 85, 254, 1) 0%, rgba(144, 201, 255, 1) 100%);
		border-radius: 20rpx;
		margin: 0 auto;
		padding: 20rpx 0 0 0;
		color: #FFFFFF;

	}

	.mt-carimg,
	.mt-cartext,
	.mt-carkp {
		float: left;
	}

	.mt-carkp {
		width: 30%;
		text-align: right;
		padding-right: 25rpx;
		font-size: 40rpx;
	}

	.mt-carimg {
		height: 35rpx;
		width: 15%;
		text-align: center;
	}

	.mt-carxbk {
		color: #FFFFFF;
		font-size: 35rpx;
		text-align: left;
		font-weight: bold;
		letter-spacing: 4rpx;
		padding-left: 50rpx;

	}

	.mt-cartext {
		width: 70%;
		padding-left: 50rpx;
	}
</style>
