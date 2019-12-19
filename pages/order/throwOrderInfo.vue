<!-- 我的扔单详情 -->
<template>
	<view class="oderList-content">
		<view class="mt-card" v-if="oderList != null">
			<!-- 城市 -->
			<view class="mt-city">
		<view class="mt-startcity" style="display: flex;">
			<view class="mtfa mt-begin" style="color:#0B398F;"></view>
			<view class="space bold" style="word-break: break-all;">{{oderList.fromAddress}}</view>
		</view>
		<view class="mt-startcity" style="display: flex;margin-top:10rpx;">
			<view class="mtfa mt-xiedian" style="color:#009A00;"></view>
			<view class="space bold" style="word-break: break-all;">{{oderList.toAddress}}</view>
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
					<text class="text-grey">订单金额：{{oderList.price}}元</text>
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
					<text class="text-grey">搬出电梯楼层：{{oderList.outEleveator === null ? '无电梯':oderList.outEleveator}}，{{oderList.outFloor === null ? '0' :oderList.outFloor}}楼</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬入电梯楼层：{{oderList.intoElevator== null ? '有电梯':oderList.intoElevator}}，{{oderList.inFloor=== null ? 0 :oderList.inFloor }}楼</text>
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
					<text class="text-grey">是否急单：{{oderList.isItUrgent ==1?'是':'否'}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">被抢时间：{{oderList.robTime ==null?'未抢': oderList.robTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">搬运人数：{{oderList.handlingNumber}}</text>
				</view>                                       
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">{{oderList.isItchai === 1 ? '拆装服务：需要' : '拆装服务：不需要'}}</text>
				</view>
			
				<!-- 搬运物品 -->
					<view class="mt-startcity" style="display: flex;">
						<view style="width: 550rpx;text-align:left;">
							<view class="mt-placebox"></view>
							<text class="text-grey">搬运物品：</text>
						</view>
						<view  class="text-grey" style="word-break: break-all;">{{oderList.goods === '' ? '' : oderList.goods}}</view>
					</view>
					<!-- 注意事项 -->
					<view class="mt-startcity" style="display: flex;">
						<view style="width: 550rpx;text-align:left ;">
							<view class="mt-placebox"></view>
							<text class="text-grey">注意事项：</text>
						</view>
						<view  class="text-grey" style="word-break: break-all;">{{oderList.remark === '' ? '' : oderList.remark}}</view>
					</view>
				</view>
			<!-- 收益 -->
			<view class="mt-city">
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单提成：{{oderList.payAmount}}元</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">平台服务费：{{oderList.thowPlatformFee === null ? '无': oderList.thowPlatformFee}}元</text>
					<text class="text-grey"  style="float:right;margin-right:20rpx;">
						实际所得：{{shouru}}元
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
					console.log(this.oderList)
					console.log()
					this.shouru = Number(this.oderList.payAmount) - Number(this.oderList.thowPlatformFee)
				}
				this.$mtRequest.stop();//结束loading等待
			});
		}
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
