<template >
	<view >
		<view class="mt-heis"></view>
		<view class="mt-view">
			<view class="mt-totalamount">
				总额 (元)
			</view>
			<view class="mt-amount amount">
				<view class="mt-amoutone" >	
					{{this.amount}}
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
						{{this.withdrawable}}
					</view>
				</view>

				<view class="mt-cashout two">
					<view class="">
						核实中
					</view>
					<view class="">
						{{this.waitverify}}
					</view>
				</view>
				<view class="mt-cashout three">
					<view class="">
						支出
					</view>
					<view class="">
						{{this.totalExpenditure}}
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
					<view class="mt-earningson on" v-if="item.inType === '0'  ">
						来自{{item.inMerchantInfoName}}的付款
					</view>
					<view class="mt-earningson on" v-if="item.inType === '1'  ">
						平台补贴
					</view>
					<view class="mt-earningson three">
						{{item.createTime}}
					</view>
					<view  v-if="item.inState === 1 ">
						<view class="mt-earningson two" style="color: #1EB500; border: 1rpx solid #1EB500;" v-if="item.withdrawState === 0  ">
							可提现
						</view>
						<view class="mt-earningson two"  v-if="item.withdrawState === 1  ">
							已提现
						</view>
					</view>
					<view class="mt-earningson two"  style="color: #EE0000; border: 1rpx solid #EE0000;"   v-if="item.inState === 0">
						待审核
					</view>
					<view class="mt-earningson two" v-if="item.inState === 2">
						不通过
					</view>
				</view>
				<view class="mt-twearnings" >
					<view class="mt-earningstw">

					</view>
					<view class="mt-earningstwo on">
						+240.00
					</view>
					<view class="mt-earningstwo two" @click="details">
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
				withdrawable:null,
				waitverify:null,
				totalExpenditure:null,
			
			}
		},
		onLoad(){
			//初始钱包查询
			 this.earnings();
			 //初始账单列表查询
			 this.earningstwo();
		},
		methods: {
			//详情点击
			Details(){
				
			},
			
			earnings() {

				// let that=this;
				this.$mtRequest.post(this.$mtConfig.getPlatformUrl("api/balanceinfo/selectBalanceinfo"),{merchantId:'257192542313906176'},(data)=> {
					if (data.state > 0) {
						
						this.amount = data.data.amount;
						this.withdrawable = data.data.withdrawable;
						this.waitverify = data.data.waitverify;
						this.totalExpenditure = data.data.totalExpenditure;
						
						//withdrawable
						//waitverify
						
				console.log(this.amount)
						
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
					this.$mtRequest.stop();
				})
			},
			earningstwo() {
			
				// let that=this;
				this.$mtRequest.post(this.$mtConfig.getPlatformUrl("api/balancein/selectIncomeDetails"),{merchantId:'257192542313906176'},(data)=> {
					if (data.state > 0) {
						console.log(data.data)
						 this.list = data.data  
						
						
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
					this.$mtRequest.stop();
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