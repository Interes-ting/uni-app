<template>

	<view class="mt-body">
		<view class="mt-zwf">
		</view>
		<view class="mt-cardback">
			<view class="mt-carsbk">
				<view class="mt-carimg">
					
				</view>
				<view class="mt-cartext">
					<view class="">
						交通银行
					</view>
					<view class="">
						
					</view>
				</view>
				<view class="mt-carkp">
					卡片
				</view>
			</view>
			<view class="mt-carxbk">
				1234567893654879
			</view>
			
		</view>
		
		<view class="mt-mony">
			<view class="mt-monyto">
				<view class="mt-monyton">
					￥
				</view>
				<view class="mt-monyttwo">
					5623.12
				</view>
			</view>
		</view>
		<view class="mt-loginbutn">
			<button class="mt-loginbutndl" type="primary" @click="login">提现到银行卡</button>
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

<style>
	.mt-carsbk{
		height: 85rpx;
	}
	.mt-loginbutn {
		width: 80%;
		height: 88rpx;
		margin: 0 10%;
		border: 20;
		font-size: 15rpx;
		font-weight: 400;
		margin: 20% 10% 0 10%;
		
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
	.mt-monyton{
		width: 10%;
		float: left;
		height: 55rpx;
		line-height: 70rpx;
	}
	.mt-monyttwo{
		float: left;
		font-size: 50rpx;
		font-weight: bold;
		height: 55rpx;
	}
	.mt-zwf {
		height: 30rpx;
	}

	.mt-mony {
		width: 90%;
		margin: 15% 5% 0 5%;
		border-radius: 20rpx;
		height: 180rpx;
		border: 1rpx solid #FFFFFF;
		box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.2);
		background-color: #FFFFFF;
	}

	.mt-carbk {
		height: 80rpx;
		width: 100%;
		
	}

	.mt-monyto{
		width: 90%;
		margin: 0 5%;
		background-color: #FFFFFF;
		padding: 65rpx;
		
		text-align: center;
		border-bottom: 1px solid #CCCCCC;
	}
	 .mt-carxbk {
		color: #FFFFFF;
		font-size: 35rpx;
		text-align: center;
		font-weight: bold;
		letter-spacing: 4rpx;
		
	}

	.mt-cardback {
		width: 80%;
		height: 150rpx;
		background: linear-gradient(0deg, rgba(28, 85, 254, 1) 0%, rgba(144, 201, 255, 1) 100%);
		border-radius: 20rpx;
		margin: 0 10%;
		padding: 10rpx 0 0 0;
		color: #FFFFFF;
		
	}

	.mt-carimg,
	.mt-cartext,
	.mt-carkp {

		float: left;
	}

	.mt-carimg,
	.mt-carkp {
		height: 35rpx;
		width: 15%;
		text-align: center;
	}

	.mt-cartext {
		width: 70%;
	}
</style>
