
<template>
	<view class="gradRecord-content">
		<block v-for="(item, index) in recordList" :key="index">
			<view class="mt-card">
				<view class="mt-startcity" style="display: flex;">
					<view class="mtfa mt-begin" style="color:#0B398F;"></view>
					<view class="space bold" style="word-break: break-all;">{{item.fromAddress}}</view>
				</view>
				<view class="mt-startcity" style="display: flex;margin-top: 10rpx;">
					<view class="mtfa mt-xiedian" style="color:#009A00;"></view>
					<view class="space bold" style="word-break: break-all;">{{item.toAddress}}</view>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">急单：{{item.isItUrgent ==1?'是':'否'}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text>订单金额：{{item.price}}元</text>
					<text style="margin-left: 46.66rpx;">扔单提成：{{item.payAmount}}元</text>
				</view>
				<view class="mt-startcity">
					<view class="mtfa mt-juli text-grey "></view>
					<text class="text-grey">距离：{{item.distance}}公里</text>
				</view>
				<view class="mt-startcity">
					<view class="mtfa mt-clocks text-grey "></view>
					<text class="text-grey">搬家时间：{{item.deliveryTime}}</text>
				</view>
				<view class="mt-startcity" style="display: flex;" v-if="item.goods">
					<view class="mtfa mt-box text-grey "></view>
					<view class="text-remark text-grey" style="width:130rpx;">搬运物品：</view>
					<view class="text-remark-text text-grey">{{item.goods}}</view>
				</view>
				<view class="mt-startcity" style="display: flex;" v-if="item.remark">
					<view class="mtfa mt-box text-grey "></view>
					<view class="text-remark text-grey" style="width:130rpx;">注意事项：</view>
					<view class="text-remark-text text-grey">{{item.remark}}</view>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					<text class="text-grey">扔单时间：{{item.robTime === null ? '暂无':item.robTime}}</text>
				</view>
				<view class="mt-startcity">
					<view class="mt-placebox"></view>
					
					<!-- <text>此订单由{{item.throwCompanyName}}提供</text> -->
					<view style="display: inline-block;width:500rpx;word-break: break-all;">
						此订单由{{ item.throwCompanyName}}提供
					</view>
				</view>
				<button class="mt-viewbutton" @tap="goGrabedOrderInfo(item)">详情</button>
			</view>
		</block>
		<view class="mt-nonumber" v-if="recordList.length == 0">暂无数据</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			recordList: '',
			robMerchantInfoId:[]
		};
	},
	onLoad(option) {
	},
	onShow() {
		this.getList();
	},
	//下拉刷新
	onPullDownRefresh() {
	     this.getList();
	     setTimeout(function () {
	        uni.stopPullDownRefresh();
	    }, 1000);
	},
	methods: {
		goGrabedOrderInfo: function(item) {
			// //跳转到抢单详情页并传递参数
			let param = item;
			param = param.id
			uni.navigateTo({
				url:'grabedOrderInfo?id='+ param
			})
			
		},
		
		getList: function() {
			this.robMerchantInfoId = this.$mtAccount.info().merchantInfoId,
			//发送网络请求
			this.$mtRequest.post(this.$mtConfig.getPlatformUrl('api/order_info/grabed_record/v2'), 
			{ type: '1', robMerchantInfoId:this.robMerchantInfoId }, (res)=> {
				if(res.state==1){
					this.recordList = res.data;
				}else {
					uni.showToast({
					title: res.message,
					icon: 'none'
					});
				}
				//结束操作
				this.$mtRequest.stop();
			});
		}
	}
};
</script>
<style lang="scss" scoped>
	.mt-nonumber{
		text-align: center;
		color: #595959;
		padding-top: 50rpx;
	}
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
.gradRecord-content {
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
	color: #666666;
	font-size: 25.52rpx;
}
.mt-card {
	position: relative;
	padding: 13.33rpx;
	background-color: #ffffff;
	box-shadow: 0px 0px 25.33rpx 0px rgba(0, 0, 0, 0.08);
	border-radius: 13.33rpx;
	margin-bottom:13.33rpx;
	.mt-startcity {
		display: block;
		// height: 50rpx;
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
</style>
