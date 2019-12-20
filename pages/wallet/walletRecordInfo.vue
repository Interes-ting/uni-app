<!-- 我的扔单详情 -->
<template>
	<view class="">
		<view class="oderList-content" >
			<view class="mt-card" v-if="list!=null">
				<!-- 城市 -->
				<view class="mt-city">
					<view class="mt-startcity">
						<view class="mtfa mt-begin" style="color:#0B398F;">
						</view>
						<text class="space bold">{{list.fromAddress}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mtfa mt-xiedian " style="color:#009A00;">
						</view>
						<text class="space bold">{{list.toAddress}}</text>
					</view>
				</view>
				<!-- 订单详情 -->
				<view class="mt-oderinfo">
					<view class="mt-startcity" v-if="list.carTypeName != null">
						<view class="mt-placebox"></view>
						<text class="text-grey">车辆类型：{{list.carTypeName}}</text>
					</view>
					<view class="mt-startcity" v-if="list.carTypeName != null">
						<view class="mt-placebox" ></view>
						<text class="text-grey">派车数量：{{list.vehiceNumber}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">客户名：{{list.customerName}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">手机号：{{list.phone}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬出地址：{{list.fromAddress}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬出电梯楼层：{{list.outEleveator === null ? '无电梯':list.outEleveator}}，{{list.outFloor === null ? '0' :list.outFloor}}楼</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">到达地址：{{list.toAddress}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬入电梯楼层：{{list.intoElevator== null ? '有电梯':list.intoElevator}}，{{list.inFloor=== null ? 0 :list.intoFloor }}楼</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">出发时间：{{list.deliveryTime}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">扔单时间：{{list.createTime}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">被抢时间：{{list.createTime}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬运人数：{{list.handlingNumber}}</text>
					</view>
					<view class="mt-startcity" v-if="list.isItchai === 0">
						<view class="mt-placebox"></view>
						<text class="text-grey">拆装服务：不需要</text>
					</view>
					<view class="mt-startcity" v-if="list.isItchai === 1">
						<view class="mt-placebox"></view>
						<text class="text-grey">拆装服务：有</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">搬运物品：{{list.goods}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">注意事项：{{list.remark}}</text>
					</view>
				</view>
				<!-- 收益 -->
				<view class="mt-city">
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">订单金额：{{list.amount}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">订单提成：{{list.payAmount}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">平台服务费：{{list.thowPlatformFee}}
						</text>
						<text class="text-grey" 
						style="float:right;margin-right:20rpx;">
							实际所得：{{needPay}}
						</text>
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
			needPay:'',
		};
	},
	
	onLoad(ddd) {
		//初始查询
		this.co = ddd;
		this.earnings();
		
	},
	methods: {
		// 收益
		earnings() {
			let merchantInfoId = this.$mtAccount.info().merchantInfoId
			
			// let that=this;
			this.$mtRequest.get(this.$mtConfig.getPlatformUrl("api/balancein/selecBalanceInId"),{id:this.co.ddd}, (data) => {
			
				if (data.state > 0) {
					this.list = data.data
					this.needPay = Number(this.list.payAmount) - Number(this.list.rowPlatformFee)
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
	
	}
};
</script>

<style lang="scss" scoped>
	.text-remark-text{
		flex: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: inline-block;
		width: 100%;
		height: 100;
	}
	.text-remark{
		display: inline-block;
		width: 120rpx;
	}
	
.oderList-content {
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
