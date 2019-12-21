<template>
	<view>
		<view class="mt-heis"></view>
		<view class="mt-view">
			<view class="mt-totalamount">
				可提现
			</view>
			<view class="mt-amount amount">
				<view class="mt-amoutone">
					{{withdrawable}}
				</view>
				<view class="mt-cashoutone" @click="tixian">
					提现 >
				</view>
			</view>
			<view class="mt-amount text">
				<view class="mt-cashout one">
					<view class="mt-catext">
						核实中 : {{waitverify}}
					</view>
				</view>
				<view class="mt-cashout two">
					<view class="mt-catext" v-if="amount !=null ">
						总额: {{amount}}
					</view>
					<view class="mt-catext" v-if="amount ===null">
						总额: 0
					</view>
				</view>
			</view>
		</view>
		<view class="mt-viewmx">
			<view class="mt-bill">
				账单
			</view>
			<view class="mt-time">
				<!-- 时间日期选择器start-->
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="selectdate" :range="[yeas,months]" mode="multiSelector">
						<text>{{yeas[selectdate[0]] + '-' + months[selectdate[1]]}}</text>
						<view class="mt-spam">
							<text>
								<icon type="waiting" class="waiting" size="17" />
								</icon></text>
						</view>
					</picker>

				</view>
				<!-- 时间日期选择器end -->
			</view>

		</view>
		<view class="" style="height:clac(100% - 200rpx);">
			<!-- 第三步实用block模板渲染页面 -->
			<block v-for="(item,index) in list" :key="index">
				<view class="mt-viewnr" v-if="list.length > 0">
					<view class="mt-earnings om " v-if="item.incomeExpenditure === 1">
						<view class="mt-img">
							<image class="mt-qianbaoimg" src="../../static/qianbao.png" mode=""></image>
						</view>
					</view>
					<view class="mt-earnings om mo" v-if="item.incomeExpenditure === 2">
						<view class="mt-img om">
							<image class="mt-qianbaoimg" src="../../static/qianbao.png" mode=""></image>
						</view>
					</view>
					<view v-if="item.incomeExpenditure === 1">
						<view class="mt-earnings" v-if="item.inState === 0">
							<!-- 第四步使用双括号{{item.xxxxx}} -->
							<view class="mt-earningson on">
								来自{{item.inMerchantInfoName}}的付款
							</view>

							<view class="mt-earningson three">
								{{item.createTime}}
							</view>
							<view class="mt-earningson two" style="color: #999999; border: 1rpx solid #999999;">
								待审核
							</view>
						</view>
						<view class="mt-earnings one" v-if="item.inState === 1">
							<!-- 第四步使用双括号{{item.xxxxx}} -->
							<view class="mt-earningson on ">
								来自{{item.inMerchantInfoName}}的付款
							</view>
							<view class="mt-earningson three">
								{{item.createTime}}
							</view>
						</view>
						<!-- inState = 0 待核实   1已核实 -->
						<view class="mt-twearnings one " v-if="item.inState === 0">
							<view class="mt-earningstw one gsot">
							</view>
							<view class="mt-earningstwo on">
								+{{item.amount}}
							</view>
							<view class="mt-earningstwo two" @click="details(item)">
								详情 >
							</view>
						</view>
						<view class="mt-twearnings one " v-if="item.inState === 1">
							<view class="mt-earningstw one gson">
							</view>
							<view class="mt-earningstwo on">
								+{{item.amount}}
							</view>
							<view class="mt-earningstwo two buia" @click="details(item)">
								详情 >
							</view>
						</view>
					</view>
					<view v-if="item.incomeExpenditure === 2">
						<view class="mt-earnings one">
							<!-- 第四步使用双括号{{item.xxxxx}} -->
							<view class="mt-earningson on">
								提现
							</view>
							<view class="mt-earningson three">
								{{item.createTime}}
							</view>
						</view>
						<view class="mt-twearnings one">
							<view class="mt-earningstw one goss">
							</view>
							<view class="mt-earningstwo on black">
								-{{item.amount}}
							</view>
							<view class="mt-earningstwo two buia" @click="details(item)">
								详情 >
							</view>
						</view>
					</view>
				</view>

			</block>
			<view class="mt-viewnr char" v-if="list.length < 1">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				// 第一步定义空数据接收空变量接收后台返回数据
				// list: null,
				list: [],
				amount: '0',
				withdrawable: null,
				waitverify: null,
				totalExpenditure: null,
				incomeExpenditure: null,
				array: [],
				selectdate: [0, new Date().getMonth()],
				yeas: getyears(),
				months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
			}
		},
		onLoad() {
			//初始钱包查询
			this.earnings();
			//初始账单列表查询
			this.earningstwo();
		},
		onShow() {
			//初始钱包查询
			this.earnings();
			//初始账单列表查询
			this.earningstwo();
		},
		onPullDownRefresh() {
			//初始钱包查询
			this.earnings();
			//初始账单列表查询
			this.earningstwo();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			bindPickerChange: function(e) {
				let value = e.detail.value;
				this.selectdate = value;
				console.log(this.yeas[this.selectdate[0]] + '-' + this.months[this.selectdate[1]])
				this.earningstwo();
			},
			tixian: function() {
				//防重复
				if (this.$mtRequest.isRepeat()) {
					return;
				}
				uni.navigateTo({
					url: '../wallet/withdraw'
				})
			},
			//详情点击
			details: function(item) {
				this.incomeExpenditure = item.incomeExpenditure
				this.ddd = item.id
				if (this.incomeExpenditure === 1) {
					uni.navigateTo({
						url: '../wallet/walletRecordInfo?ddd=' + this.ddd
					})
				} else if (this.incomeExpenditure === 2) {
					uni.navigateTo({
						url: '../wallet/walletRecordInfotwo?ddd=' + this.ddd
					})
				}

			},

			earnings() {
				let merchantInfoId = this.$mtAccount.info().merchantInfoId
				// let that=this;

				this.$mtRequest.post(this.$mtConfig.getPlatformUrl("api/balanceinfo/selectBalanceinfo"), {
					merchantId: merchantInfoId
				}, (data) => {
					if (data.state > 0) {
						this.amount = data.data.amount;
						this.withdrawable = data.data.withdrawable;
						this.waitverify = data.data.waitverify;
						this.totalExpenditure = data.data.totalExpenditure;
						this.incomeExpenditure = data.data.incomeExpenditure;
						this.withdrawable =returnFloat(this.withdrawable);
						this.waitverify =returnFloat(this.waitverify);
						this.amount =returnFloat(this.amount);
						
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
			//收益列表请求
			earningstwo() {
				let merchantInfoId = this.$mtAccount.info().merchantInfoId
				this.starsa = this.yeas[this.selectdate[0]] + '-' + this.months[this.selectdate[1]]
				// let that=this;
				if (this.starsa === null) {
					this.starsa = '';
				}
				this.$mtRequest.post(this.$mtConfig.getPlatformUrl("api/balancein/selectIncomeDetails"), {
					merchantId: merchantInfoId,
					starsa: this.starsa,
				}, (data) => {
					if (data.state > 0) {
						this.list = data.data
						// console.log(this.list);
						this.list.forEach((item,index)=>{
							item.amount = returnFloat(item.amount);
						});
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

			// this.list = res.data

		}
	}

	//从2019年开始到当前年
	function getyears() {
		var years = []
		var date = new Date();
		for (let i = 2019; i <= date.getFullYear(); i++) {
			years.push(i)
		}
		return years;
	}

	function returnFloat(value) {
		let number = Math.round(parseFloat(value) * 100) / 100;	
		let s = value.toString().split(".");
		if (s.length == 1) {
			number = value.toString() + ".00";
			return number;
			console.log(number);
		}
		if (s.length > 1) {
			if (s[1].length < 2) {
				number = number.toString() + "0";
			}
			return number;
			console.log(number);
		}
	}
</script>

<style>
	uni-text {
		width: 80%;
		float: left;
	}

	uni-icon {
		display: block;
	}

	.mt-spam {
		width: 20%;
		float: left;
		height: 66rpx;
		line-height: 66rpx;
	}

	.mt-catext {
		width: 100%;
		float: left;
		height: 55rpx;
		line-height: 55rpx;
	}

	.mt-qianbaoimg {
		width: 100%;
		height: 70rpx;
	}

	.mt-img {
		height: 150rpx;
	}

	.mt-earnings.om {
		width: 15%;
		float: left;
		height: 180rpx;
		padding: 20rpx;
		line-height: 195rpx;
	}

	.mt-earnings.om.mo {
		line-height: 195rpx;
	}

	.mt-viewnr.char {
		width: 90%;
		height: 180rpx;
		line-height: 180rpx;
		text-align: center;
	}

	.mt-earningstw.one.gsot {
		margin: 60rpx 0 0 0;
	}

	.mt-earningstw.one.gson {
		margin: 50rpx 0 0 0;
	}

	.mt-earningstw.one.goss {
		margin: 50rpx 0 0 0;
	}

	.mt-earningson {
		font-size: 25rpx;
		font-weight: 400;
		padding: 0 0 0rpx 0;
	}

	.mt-earnings {
		width: 55%;
		float: left;
		height: 150rpx;

	}

	.mt-earnings.one {
		padding: 40rpx 0rpx;
	}

	.mt-srcimg {
		width: 60rpx;
		height: 60rpx;
	}



	.mt-earningson.three {
		color: #999999;
		padding: 10rpx 0 0 0;
		font-size: 31rpx;

	}

	.mt-earningson.on {
		color: #333333;
		font-size: 33rpx;
		margin: 15rpx 0 0 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.mt-earningson.two {
		margin: 15rpx 0 0 0;
	}

	.mt-earningstwo.two {
		margin: 10rpx 0 0 0;
	}

	.mt-earningstwo.two.buia {
		margin: 0rpx 0 0 0;
	}

	.mt-earningson.two {
		border: 1rpx solid #999999;
		width: 120rpx;

		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border-radius: 10rpx;
		color: #999999;
	}



	.mt-earningstwo.on {
		font-size: 40rpx;

	}

	.mt-earningstwo.tixian {
		color: #000000;
	}

	.mt-earningstwo.two {
		color: #1E83FF;

	}

	.mt-earningstwo.on.black {
		color: #000000;
	}

	.mt-earningstwo {
		font-size: 25rpx;
		color: #E7BB48;
		text-align: center;
	}

	.mt-twearnings {
		width: 30%;
		float: left;
		height: 150rpx;
	}

	.mt-heis {
		height: 20rpx;
	}

	.uni-input.two {
		line-height: 66rpx;
		height: 66rpx;
		border: 1rpx solid #8F8F94;
		border-radius: 10rpx;
		box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.21);
		font-size: 25rpx;
	}

	.uni-input {
		font-size: 13rpx;

	}

	.mt-bill {
		width: 60%;
		float: left;
		height: 66rpx;
		line-height: 66rpx;
	}

	.uni-list-cell-db {
		height: 66rpx;
		line-height: 66rpx;
	}

	.mt-time {
		width: 40%;
		text-align: center;
		float: left;
		height: 66rpx;
		line-height: 66rpx;
	}

	/* 查询列表框 */
	.mt-view {
		width: 90%;
		height: 260rpx;
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
		height: 180rpx;
		box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.21);
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
		font-size: 30rpx;
		width: 50%;
		float: left;
		text-align: center;
	}

	.mt-catext {
		text-align: left;
	}

	.mt-amount.text {
		width: 90%;
		margin: 2% 6%;
		border-radius: 15rpx;
		font-size: 15rpx;
	}
</style>
