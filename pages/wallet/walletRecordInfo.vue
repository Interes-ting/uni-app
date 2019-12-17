<!-- 我的扔单详情 -->
<template>
	<view class="">
		<view class="oderList-content" v-if="this.co.incomeExpenditure=== '1'">
			<view class="mt-card">
				<!-- 城市 -->
				<view class="mt-city">
					<view class="mt-startcity">
						<view class="mtfa mt-begin" style="color:#0B398F;">
						</view>
						<text class="space bold">{{this.list.fromAddress}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mtfa mt-xiedian " style="color:#009A00;">
						</view>
						<text class="space bold">{{this.list.toAddress}}</text>
					</view>
				</view>
				<!-- 订单详情 -->
				<view class="mt-oderinfo">
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">车辆类型：{{this.list.carTypeName}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">派车数量：{{this.list.vehiceNumber}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">客户名：{{this.list.customerName}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">手机号：{{this.list.phone}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬出地址：{{this.list.fromAddress}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬出电梯楼层：{{this.list.outEleveator}}，{{this.list.outFloor}}楼</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">到达地址：{{this.list.toAddress}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬入电梯楼层：{{this.list.outEleveator}}，{{this.list.outFloor}}楼</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">出发时间：{{this.list.deliveryTime}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">扔单时间：{{this.list.createTime}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">被抢时间：{{this.list.robTime}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬运人数：{{this.list.handlingNumber}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">拆装服务：{{this.list.isItChai}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬运物品：{{this.list.goods}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">注意事项：{{this.list.remark}}</text>
					</view>
				</view>
				<!-- 收益 -->
				<view class="mt-city">
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">订单金额：{{this.list.price}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">订单服务费：{{this.list.rowCommissionRatio}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">平台服务费：{{this.list.rowPlatformFee}}</text>
						<text class="text-grey" 
						style="float:right;margin-right:20rpx;">
							实际所得：{{this.list.shouru}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="oderList-content heis" v-if="this.co.incomeExpenditure=== '2'">
			<view class="mt-cardtwo">
				<!-- 订单详情 -->
				<view class="mt-oderinfo">
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">提现金额：{{this.list.amount}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">申请时间：{{this.list.applyTime}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">提现卡号：{{this.list.cardNo}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">提现开户行：{{this.list.cardBank}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">提现人姓名：{{this.list.name}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">联系电话：{{this.list.phone}}</text>
					</view>
		
				</view>
				
			</view>
		</view>
	</view>
	
	
</template>

<script>
export default {
	data() {
		return {
			oderList:null,
			list:'',
		};
	},
	onLoad(incomeExpenditure) {
		//初始查询
		
		this.co = incomeExpenditure;
		//console.log(this.incomeExpenditure)
		if(this.co.incomeExpenditure ==="1"){
			this.earnings();
		}else if(this.co.incomeExpenditure === "2"){
			this.earningstwo();
		}
	},
	methods: {
		// 收益
		earnings() {
			let merchantInfoId = this.$mtAccount.info().merchantInfoId
			console.log(merchantInfoId)
			// let that=this;
			this.$mtRequest.get(this.$mtConfig.getPlatformUrl("api/balancein/selecBalanceInId"),{id:'251820865249869822'}, (data) => {
				if (data.state > 0) {
					this.list = data.data
				console.log(data.data)
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
			//支出
		earningstwo() {
			let merchantInfoId = this.$mtAccount.info().merchantInfoId
			// let that=this;
			this.$mtRequest.get(this.$mtConfig.getPlatformUrl("api/balancein/selecBalanceOut"), {id:'257821141698084864'}, (data) => {
				console.log(data.data)
				if (data.state > 0) {
					this.list = data.data
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
	}
};
</script>

<style lang="scss" scoped>
.OrderInfo-content {
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
	.mt-oderinfo {
		padding: 13.33rpx 0rpx;
		border-bottom: 1px solid #cccccc;
	}
}
.mt-cardtwo {
	position: relative;
	padding: 13.33rpx;
	background-color: #ffffff;
	.mt-city{
		padding-top: 13.33rpx;
	}
	
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
.oderList-content.heis{
	height: 100%;
}
</style>
