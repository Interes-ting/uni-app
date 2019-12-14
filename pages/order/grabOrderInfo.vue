<!-- 抢单详情 -->
<template>
	<view class="gradRecord-content">
					<view class="mt-card">

						<view class="mt-content-box">
							<view class="mt-flbox">
								<text class="mtfa mt-truck" style="color:#CB8861;"></text>
								<text>车辆类型：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.carTypeName}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<text class="mtfa mt-weixiu" style="color:#599CEE"></text>
								<text>派车数量：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.handlingNumber}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<text class="mtfa mt-person" style="color: #DD524D;"></text>
								<text>搬运人数：</text>
							</view>
							<view class="mt-frbox"><text> 2人</text></view>
						</view>
						<view class="mt-content-box" style="border-bottom: 0rpx;">
							<view class="mt-flbox" >
								<view class="mt-circle" ></view>
								<text>搬出地址：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.toAddress}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<view class="mt-placebox"></view>
								<text></text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.intoElevator}}，{{this.carList.intoFloor}}</text></view>
						</view>
						<view class="mt-content-box" style="border-bottom: 0rpx;">
							<view class="mt-flbox">
								<view class="mt-circle bgc"></view>
								<text>搬入地址：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.carTypeName}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<view class="mt-placebox"></view>
								<text></text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.outEleveator}}，{{this.carList.outFloor}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<text class="mtfa mt-clocks" style="color:#59ED6D;"></text>
								<text>搬家时间：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.deliveryTime}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<text class="mtfa mt-juli" style="color:#31A6A9;"></text>
								<text>距离(公里)：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.distance}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<text class="mtfa mt-jine" style="color:#E9E32B"></text>
								<text>订单金额：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.price}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<text class="mtfa mt-fuwufei" 
								style="color:#E9BC37;font-size: 45rpx;margin-right:0rpx;position: relative;
								left:-8rpx;top: 10rpx;"></text>
								<text>扔单提成：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.payAmount}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<text class="mtfa mt-fuwufei"
								style="color:#E9BC37;font-size: 45rpx;margin-right:0rpx;position: relative;
								left:-8rpx;top: 10rpx;"></text>
								<text>平台服务费：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.thowPlatformFee}}</text></view>
						</view>
						
						<view class="mt-content-box">
							<view class="mt-flbox">
								<view class="mt-placebox" style="margin-right:13.33rpx;"></view>
								<text>拆装服务：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.isItchai}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<text class="mtfa mt-box" style="color: #CB8861;"></text>
								<text>搬运物品：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.goods}}</text></view>
						</view>
						<view class="mt-content-box">
							<view class="mt-flbox">
								<text class="mtfa mt-warn" style="color: #CB8861;"></text>
								<text>注意事项：</text>
							</view>
							<view class="mt-frbox"><text>{{this.carList.remark}}</text></view>
						</view>
					</view>
			<button class="mt-seedeil-btn" @tap="payMoney()" >
				<text class="text-price" style="margin-right: 30rpx;">{{this.carList.price}}</text>抢单并支付
			</button>
			           
	</view>
</template>

<script>
export default {
	data() {
		return {
			carList: null,
			orderId:null,
			robMerchantInfoId:null
		};
	},
	onLoad: function(option) {
		this.orderId = option.id;
		this.getInfo();
	},
	methods: {
		getInfo:function(){
			this.$mtRequest.get(this.$mtConfig.getPlatformUrl('/api/order_info/orderInfoFindById?id='+this.orderId),
			{},(res)=>{
				if(res.state ==1){
					this.carList = res.data;
				}
				this.$mtRequest.stop();//结束loading等待
			});
		},
		payMoney:function(){ // 抢单并支付
		this.robMerchantInfoId = this.carList.robMerchantInfoId;
		console.log(this.robMerchantInfoId);
		console.log(this.carList);
			// this.$mtRequest.post(this.$mtConfig.getPlatformUrl('api/order_info/grab2'),
			// {'type':'1','orderId':this.orderId,'robMerchantInfoId':	robMerchantInfoId},
			// (res)=>{
			// 	this.$mtRequest.stop();//结束loading等待
			// });
			
			/* // 跳转到抢单记录
			uni.navigateTo({
				url:'grabRecord'
			}) */
		},
		
	}
};
</script>

<style lang="scss" scoped>
page {
	padding: 13.33rpx;
	font-size: 26.66rpx;
	color: #333333;
	text-align: center;
}

.mt-card {
	padding: 0rpx 20rpx;
	background-color: #ffffff;
	box-shadow: 0px 0px 25.33rpx 0px rgba(0, 0, 0, 0.08);
	border-radius: 13.33rpx;
	margin:13.33rpx 0rpx;
	.mt-content-box{
		display: flex;
		justify-content: space-between;
		border-bottom: 0.33rpx solid #EEEEEE;
		padding:20rpx 13.33rpx 20rpx 0rpx;
			.mt-placebox{
				display: inline-block;
				width: 33.33rpx;
				background-color: red;
				text-align: center;
			}
		
		.mt-circle{
			display: inline-block;
			position: relative;
			left: 16.66rpx;
			margin-right: 40rpx;
			width: 8rpx;
			height: 8rpx;
			border-radius: 50%;
			background-color: #09BB07;
		}
		.bgc{
			background-color:rgba(183,26,0,1);
		}
		.mtfa{
			margin-right: 13.33rpx;
			font-size: 33.33rpx;
		}
	}
}
.mt-seedeil-btn {
    width: 416.74rpx;
    height: 71.08rpx;
    display: inline-block;
    text-align: center;
		margin-top:30rpx;
    line-height: 71.08rpx;
    border-radius: 35.54rpx;
    background: linear-gradient(#1880ff, #6fafff);
    color: #fff;
    font-size: 31.3rpx;
	}
</style>

</style>
