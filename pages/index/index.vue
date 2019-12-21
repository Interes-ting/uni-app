<template>
	<view class="content">
		<!-- 轮播图-->
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500" indicator-color="#999999" indicator-active-color="#133C8E">
					<swiper-item>
						<view class="swiper-item"><image src="../../static/swiper.png"></image></view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 按钮组-->
		<view class="mt-buttons-content">
			<view class="mt-buttons-item" @tap="goGradOrderInfo">
				<image class="mt-order-img" src="../../static/throw.png"></image>
				<text>我抢的单</text>
			</view>
			<view class="mt-place-content"></view>
			<view class="mt-buttons-item" @tap="goThrowRecord">
				<image class="mt-order-img imgsecond" src="../../static/grab.png"></image>
				<text>我扔的单</text>
			</view>
		</view>
		<!-- 抢单信息 -->
		<view class="mt-throw-content">
			<block v-for="(item, index) in carList" :key="index">
				<view class="mt-card">
					<view class="mt-startcity text-hidden">
						<view class="mtfa mt-begin" style="color:#0B398F;"></view>
						<text class="space bold">{{ item.fromAddress }}</text>
					</view>
					<view class="mt-startcity text-hidden">
						<view class="mtfa mt-xiedian " style="color:#009A00;"></view>
						<text class="space bold">{{ item.toAddress }}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text>订单金额：{{ item.price }}元</text>
						<text style="margin-left: 46.66rpx;">扔单提成：{{ item.payAmount }}元</text>
					</view>
					<view class="mt-startcity">
						<view class="mtfa mt-juli text-grey "></view>
						<text class="text-grey">距离：{{ item.distance }}公里</text>
					</view>
					<view class="mt-startcity">
						<view class="mtfa mt-clocks text-grey "></view>
						<text class="text-grey">搬家时间：{{ item.deliveryTime }}</text>
					</view>
					<view class="mt-startcity" 
					style="display: flex;" v-if="item.goods !=null || item.goods !=''">
						<view class="mtfa mt-box text-grey "></view>
						<view class="text-remark text-grey done-lode" style="width: 130rpx;">搬运物品：</view>
						<view class="text-grey delite-text">{{item.goods}}</view>
					</view>
					<!-- tips start-->
					<view style="margin-left: 40rpx;">
						<view class="mt-placebox"></view>
						<text class="mt-sos" v-if="item.isItUrgent == 1" >{{ item.isItUrgent == 1?'急':''}}</text>
						<text class="mt-remark" v-if="item.carTypeName != ''">{{ item.carTypeName }}</text>
					</view>
					<!-- tips end-->
					<view class="mt-startcity" style="height: 100%;">
						<view class="mt-placebox"></view>
						<view style="display: inline-block;width:400rpx;word-break: break-all;">此订单由 {{ item.throwCompanyName}} 提供
						</view>
					</view>
					<button class="mt-viewbutton" v-if="item.state == 1" @tap="goGrabOrderInfo(item)">查看</button>
					<button class="mt-qiangdan" v-else-if="item.state == 2" >抢单中</button>
					<button class="mt-elsebutton" v-else>已抢</button>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			carList: [],
			itemid:''
		};
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
		
		getList:function(){ //发送网络请求获取数据
			this.$mtRequest.post(this.$mtConfig.getPlatformUrl('api/order_info/wait_grab_record'),
			{city:this.$mtAccount.info().city}, (res) => {
				if(res.state==1){
					this.carList =res.data;
					
				}else {
					uni.showToast({
					title: res.message,
					icon: 'none'
					});
				}
				this.$mtRequest.stop();//结束loading等待
			});
		},
		
		goGrabOrderInfo:function(item){ //查看待抢详情
			this.itemid = item.id
			uni.navigateTo({
				url:'../order/grabOrderInfo?id='+this.itemid
			})
		},
		goGradOrderInfo:function(){ //跳转抢单记录
			uni.navigateTo({
				url:'../order/grabRecord'
			})
		},
		
		goThrowRecord:function(){  //跳转扔单记录
			uni.navigateTo({
				url:'../order/throwRecord'
			})
		},
		
	}

};
</script>

<style lang="less" scoped>
	.done-lode {
		float: left;
		width: 100px;
	}
	.delite-text {
		float:right;
		width: 300rpx;
		// background-color: pink;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.mt-startcity,#tips{
		width: auto;
	}
	.text-hidden{
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    overflow:hidden;
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
	
image {
	width: 100%;
	height: 100%;
}
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #333333;
	margin-bottom: 100rpx;
}

.swiper {
	width: 100%;
	height: 294rpx;
	background-color: #007aff;
}

.swiper-item image {
	width: 100%;
	height: 294rpx;
}

.mt-buttons-content {
	display: flex;
	position: relative;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 110.66rpx;
	background-color: #ffffff;
	font-size: 29.33rpx;
}

.current-active {
	color: #1a4397;
}

.mt-buttons-item {
	flex: 1;
	justify-content: center;
	text-align: center;
}

.mt-order-img {
	width: 54rpx;
	height: 68.66rpx;
	position: relative;
	right: 13.33rpx;
	top: 20%;
}
.mt-sos {
			margin-right: 10rpx;
			padding: 3.33rpx 10rpx;
			font-size: 20rpx;
			background-color: red;
			color: #ffffff;
			border: 1px solid red;
			border-radius: 25%;
		}
		.mt-remark {
			margin-right: 10rpx;
			padding: 3.33rpx 10rpx;
			font-size: 20rpx;
			color: #ff571d;
			border: 1px solid #ff571d;
			border-radius: 10.66rpx;
		}

.imgsecond {
	width: 62rpx;
}

.mt-place-content {
	position: absolute;
	top: 26.66rpx;
	width: 0.66rpx;
	height: 54.66rpx;
	background-color: #cccccc;
}

.mt-throw-content {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx;
}

.mt-card {
	position: relative;
	margin-bottom: 33.33rpx;
	padding: 13.33rpx;
	background-color: #ffffff;
	box-shadow: 0px 0px 25.33rpx 0px rgba(0, 0, 0, 0.08);
	border-radius: 13.33rpx;
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
		width: 156.66rpx;
		height: 68.66rpx;
		line-height: 68.66rpx;
		background: linear-gradient(to bottom, #1880ff, #509eff);
		/*设置按钮为渐变颜色*/
		border-radius: 34.66rpx;
		font-size: 36.66rpx;
		color: #ffffff;
	}
	.mt-elsebutton {
		position: absolute;
		right: 26.66rpx;
		bottom: 20rpx;
		width: 156.66rpx;
		height: 68.66rpx;
		line-height: 68.66rpx;
		background: #cccccc;
		/*设置按钮为渐变颜色*/
		border-radius: 34.66rpx;
		font-size: 36.66rpx;
		color: #ffffff;
	}
	
	.mt-qiangdan {
		position: absolute;
		right: 40rpx;
		bottom: 20rpx;
		height: 68.66rpx;
		line-height: 68.66rpx;
		background-color:#F76260;
		/*设置按钮为渐变颜色*/
		border-radius: 34.66rpx;
		font-size: 36.66rpx;
		color: #ffffff;
	}
}
</style>
