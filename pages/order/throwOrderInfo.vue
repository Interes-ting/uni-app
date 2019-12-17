<!-- 我的扔单详情 -->
<template>
	<view class="oderList-content">
		<view class="mt-card" v-if="oderList != null">
			<!-- 城市 -->
			<view class="mt-city">
				<view class="mt-startcity">
					<view class="mtfa mt-begin" style="color:#0B398F;">
					</view>
					<text class="space bold">{{oderList.fromAddress}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mtfa mt-xiedian " style="color:#009A00;">
					</view>
					<text class="space bold">{{oderList.toAddress}}</text>
				</view>
			</view>
			<!-- 订单详情 -->
			<view class="mt-oderinfo">
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">车辆类型：{{oderList.carTypeName}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">派车数量：{{oderList.vehiceNumber}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">订单金额：{{oderList.price}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">客户名：{{oderList.customerName}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">手机号：{{oderList.phone}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬出电梯楼层：{{oderList.outEleveator}}，{{oderList.outFloor}}楼</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬入电梯楼层：{{oderList.intoElevator}}，{{oderList.inFloor}}楼</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">出发时间：{{oderList.deliveryTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：{{oderList.createTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">被抢时间：{{oderList.robTime ==null?'未抢': derList.robTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬运人数：{{oderList.handlingNumber}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">拆装服务：{{oderList.isItChai ==1?'需要':'不需要'}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬运物品：{{oderList.goods}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">注意事项：{{oderList.remark}}</text>
				</view>
			</view>
			<!-- 收益 -->
			<view class="mt-city">
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">订单服务费：{{oderList.payAmount}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">平台服务费：{{oderList.thowPlatformFee}}</text>
					<text class="text-grey"  style="float:right;margin-right:20rpx;">
						实际所得：{{shouru}}
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
			oderList:null,
			shouru:null,
			id:''  //列表id
		};
	},
	onLoad(option) {
		this.id = option.id
		this.getOrderInfo();
	},
	methods: {
		getOrderInfo:function(){
			this.$mtRequest.get(this.$mtConfig.getPlatformUrl('api/order_info/orderInfoFindById?id='+this.id),{}, (res) => {
				if(res.state==1){
					this.oderList =res.data;
					this.shouru = Number(this.oderList.payAmount) - Number(this.oderList.rowPlatformFee)
				}
				this.$mtRequest.stop();//结束loading等待
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.oderList-content {
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
}
.mt-oderinfo {
	padding: 13.33rpx 0rpx;
	border-bottom: 1px solid #cccccc;
}
</style>
