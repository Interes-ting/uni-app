<template>
	<view>
		<view class="mt-heis"></view>
		<view class="mt-view">
			<view class="mt-totalamount">
				总额 (元)
			</view>
			<view class="mt-amount amount">
				<view class="mt-amoutone">
					{{}}
				</view>
				<view class="mt-cashoutone">
					提现 >
				</view>
			</view>
			<view class="mt-amount text">
				<view class="mt-cashout one">
					<view class="">
						可提现
					</view>
					<view class="">
						4562.32
					</view>
				</view>

				<view class="mt-cashout two">
					<view class="">
						核实中
					</view>
					<view class="">
						4562.32
					</view>
				</view>
				<view class="mt-cashout three">
					<view class="">
						支出
					</view>
					<view class="">
						4562.32
					</view>
				</view>
			</view>
		</view>
		<view class="mt-viewmx">
			<view class="mt-bill">
				账单
			</view>
			<view class="mt-time">
				<input password="false" class="uni-input"  />
			</view>
		</view>
		<!-- 第三步实用block模板渲染页面 -->
		<block v-for="(item,index) in list" :key="index">
			<view class="mt-viewnr">
				<view class="mt-earnings om" >
					<view class="mt-img">
						<image class="mt-srcimg" src="../../static/qiandaizi.png" >
					</view>

				</view>
				<view class="mt-earnings">
					<!-- 第四步使用双括号{{item.xxxxx}} -->
					<view class="mt-earningson on">
						来自******的付款
					</view>
					<view class="mt-earningson three">
						12月8日 17：52
					</view>
					<view class="mt-earningson two">
						已提现
					</view>
				</view>
				<view class="mt-twearnings" >
					<view class="mt-earningstw">

					</view>
					<view class="mt-earningstwo on">
						+240.00
					</view>
					<view class="mt-earningstwo two">
						详情 >
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 第一步定义空数据接收空变量接收后台返回数据
				// list: null,
				list:'[]',
				amount:null,
			}
		},
		onLoad(){
			 this.earnings();
		},
		methods: {
			earnings() {

				let that=this;
				this.$mtRequest.post(this.$mtConfig.getPlatformUrl("api/balanceinfo/selectBalanceinfo"),{merchantId:'257192542313906176'},function(data) {
					if (data.state > 0) {
						console.log(data.data)
						that.amount = data.data.amount;
						console.log(that.amount)
						
					//多数据循环：把后台返回数据赋值给变量list
					// this.list =	res.data  
					// 单数据   this.list =	res.data.参数名
					} else {
						console.log('d2')
						//登录失败
						uni.showToast({
							title: data.message,
							icon: "none"
						})
					}
				
					//结束请求
					that.$mtRequest.stop();
				})
				
			},
			
			// this.list = res.data
			
		}
	}
</script>

<style>
	.mt-srcimg{
		width: 60rpx;
		height: 60rpx;
	}
	.mt-earnings.om{
		width: 15%;
		float: left;
		height: 150rpx;
		padding: 20rpx;
		line-height: 150rpx;
	}
	.mt-earningson.three{
		color: #999999;
		padding: 10rpx 0 0 0;
	}
	.mt-earningson.on{
		color: #333333;
		font-size: 35rpx;
	}
	.mt-earningson.two{
		border: 1rpx solid #999999;
		width: 120rpx;
		margin: 10rpx 0 0 0;
		height: 40rpx;
		text-align: center;
		border-radius: 10rpx;
		color: #999999;
	}
	.mt-earningstw{
		padding: 65rpx 0 0 0;
	}
	.mt-earningstwo.on{
		font-size: 40rpx;
	}
	.mt-earningstwo.two{
		color: #1E83FF;
	}
	.mt-earningstwo{
		font-size: 25rpx;
		color: #E7BB48;
		text-align: center;
	}
	.mt-twearnings{
		width: 30%;
		float: left;
		height: 150rpx;
	}
	.mt-heis{
		height: 20rpx;
	}
	.mt-earnings {
		width: 55%;
		float: left;
		height: 150rpx;
		padding: 12rpx 0rpx;
	}

	.mt-earningson {
		font-size: 25rpx;
		font-weight: 400;
		padding: 0 0 0rpx 0;
	}

	.uni-input {
		font-size: 13rpx;
	}

	.mt-bill {
		width: 20%;
		float: left;
	}

	.mt-time {
		width: 80%;
		text-align: right;
		float: left;
	}

	.mt-view {
		width: 90%;
		height: 270rpx;
		background-color: #1880FF;
		margin: 0% 5%;
		border-radius: 15rpx;
		color: #FFFFFF;
		
	}

	.mt-viewmx {
		width: 90%;
		margin: 3% 5%;
		height: 50rpx;
		border-radius: 15rpx;
		font-size: 35rpx;
		font-weight: 800;
	}

	.mt-viewnr {
		width: 90%;
		margin: 2% 5%;
		border-radius: 15rpx;
		font-size: 35rpx;
		font-weight: 800;
		border-radius: 15rpx;
		border: 1rpx solid #F1F1F3;
		height: 170rpx;
		box-shadow:0px 0px 18px 0px rgba(0, 0, 0, 0.21);
	}

	.mt-totalamount {
		font-size: 30rpx;
		width: 90%;
		margin: 0 5%;
		padding: 30rpx 30rpx 10rpx 10rpx;
	}

	.mt-amount.amount {
		height: 90rpx;
	}

	.mt-amoutone {
		width: 75%;
		float: left;
		padding: 0rpx 0rpx 0rpx 45rpx;
		font-size: 80rpx;
		height: 90rpx;
	}

	.mt-cashoutone {
		height: 90rpx;
		padding: 20rpx 0 0 0;
		font-size: 40rpx;
	}

	.mt-cashout.one,
	.mt-cashout.two,
	.mt-cashout.three {
		width: 32%;
		float: left;
		text-align: center;

	}

	.mt-cashout.one,
	.mt-cashout.two {
		margin: 0 10rpx 0 0%;
		border-right: 1rpx solid #FFFFFF;
	}

	.mt-amount.text {
		width: 90%;
		margin: 2% 6%;
		border-radius: 15rpx;
		font-size: 15rpx;
	}
</style>
