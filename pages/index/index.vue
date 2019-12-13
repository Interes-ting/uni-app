<template>
	<view class="content">
		<!-- 轮播图-->
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500" indicator-color="#999999" indicator-active-color="#133C8E">
					<swiper-item>
						<view class="swiper-item"><image src="../../static/swiper.png"></image></view>
					</swiper-item>
					<swiper-item><view class="swiper-item">B</view></swiper-item>
					<swiper-item><view class="swiper-item">C</view></swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 按钮组-->
		<view class="mt-buttons-content">
			<view class="mt-buttons-item" @tap="goGradOrderInfo">
				<image class="mt-order-img" src="../../static/抢单.png"></image>
				<text>我的抢单</text>
			</view>
			<view class="mt-place-content"></view>
			<view class="mt-buttons-item" @tap="goThrowRecord">
				<image class="mt-order-img imgsecond" src="../../static/扔单.png"></image>
				<text>我的扔单</text>
			</view>
		</view>
		<!-- 抢单信息 -->
		<view class="mt-throw-content">
			<block v-for="(item, index) in carList" :key="index">
				<view class="mt-card">
					<view class="mt-startcity">
						<view class="mtfa mt-begin" style="color:#0B398F;"></view>
						<text class="space bold">{{item.fromAddress}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mtfa mt-xiedian " style="color:#009A00;"></view>
						<text class="space bold">{{item.toAddress}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text>订单金额：{{item.price}}元</text>
						<text style="margin-left: 46.66rpx;">扔单提成：{{item.incomeAmount}}元</text>
					</view>
					<view class="mt-startcity">
						<view class="mtfa mt-juli text-grey "></view>
						<text class="text-grey">距离：{{item.distance}}公里</text>
					</view>
					<view class="mt-startcity">
						<view class="mtfa mt-clocks text-grey "></view>
						<text class="text-grey">出发时间：{{item.deliveryTime}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mtfa mt-box text-grey "></view>
						<text class="text-grey">搬运物品：{{item.goods}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="mt-sos">急</text>
						<text class="mt-remark">{{item.carTypeName}}</text>
						<text class="mt-remark">{{item.serviceTypeName}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text>此订单由长沙运邦搬家提供{{item.throwMerchantInfoo}}</text>
					</view>
					<button class="mt-viewbutton" v-if="item.state == 1" @tap="goGrabOrderInfo(item)">查看</button>
						<button class="mt-viewbutton" v-else="item.state == 0">已抢</button>
				</view>
			</block>
		</view>
		<!-- 底部导航栏 -->
		<view class="cu-bar tabbar bg-white mt-tabbar">
			<view class="action" @click="goIndex">
				<view class="mtfa mt-shouye mt-tabbar-item text-blue"></view>
				<view class="text-blue">首页</view>
			</view>
			<view class="action" @click="goThrow">
				<view class="mtfa mt-daochu mt-tabbar-item"></view>
				<view class="text-gray">扔单</view>
			</view>
			<view class="action" @click="goWallet">
				<view class="mtfa mt-qianbao mt-tabbar-item"></view>
				<view class="text-gray">收益</view>
			</view>
			<view class="action" @click="goPerson">
				<view class="mtfa mt-person mt-tabbar-item"></view>
				<view class="text-grey">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			carList: [],
			item:''
		};
	},
	onLoad() { // 页面加载时执行网络请求
		this.getList();
	},
	methods: {
		
		goThrow: function() { //跳转扔单
			uni.navigateTo({
				url: '../order/throw'
			});
		},
		
		goWallet: function() { //跳转收益
			uni.navigateTo({
				url: '../wallet/wallet'
			});
		},
		
		goPerson: function() { 	//跳转个人中心
			uni.navigateTo({
				url: '../person/person'
			});
		},
		
		goThrowRecord: function() { //跳转到扔单记录
			uni.navigateTo({
				url: '../order/throwRecord'
			});
		},
		
		goGrabOrderInfo: function(item) { //跳转到抢单详情
			 let url = '../order/grabOrderInfo'  
			 let param = item;
			 console.log(param)
			 this.$navTo.togo(url,param);
		},
		
		goGradOrderInfo: function() { //跳转到抢单记录
			uni.navigateTo({
				url: '../order/grabRecord'
			});
		},
		
		getList: function() { //发送网络请求
			let that = this;
			this.$mtRequest.post(this.$mtConfig.getPlatformUrl('api/order_info/wait_grab_record'), {}, function(res) {
				that.carList = res.data;
				// console.log(that.carList);
				//结束操作
				that.$mtRequest.stop();
			});
		},
		
	}
};
</script>

<style lang="less" scoped>
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

.mt-card{
	position: relative;
	margin-bottom: 33.33rpx;
	padding: 13.33rpx;
	background-color: #FFFFFF;
	box-shadow:0px 0px 25.33rpx 0px rgba(0, 0, 0, 0.08);
	border-radius:13.33rpx;
	.mt-startcity{
		display: block;
		height:50rpx;
		line-height: 50rpx;
		width: 100%;
		font-size: 25.52rpx;
		.mtfa{
			display: inline-block;
			font-size: 26.66rpx;
			margin-right: 10rpx;
		}
		.mt-placebox{
			display: inline-block;
			width: 36.66rpx;
		}
		.mt-sos{
			margin-right: 10rpx;
			padding: 3.33rpx 10rpx;
			font-size: 20rpx;
			background-color: red;
			color:#FFFFFF ;
			border: 1px solid red;
			border-radius: 25%;
		}
		.mt-remark{
			margin-right: 10rpx;
			padding: 3.33rpx 10rpx;
			font-size: 20rpx;
			color:#FF571D ;
			border: 1px solid #FF571D;
			border-radius: 10.66rpx;
		}
	}
	.mt-viewbutton{
		position: absolute;
		right: 26.66rpx;
		bottom: 20rpx;
		width: 156.66rpx;
		height: 68.66rpx;
		line-height: 68.66rpx;
		background: linear-gradient(to bottom, #1880ff, #509eff);
		/*设置按钮为渐变颜色*/
		border-radius: 34.66rpx;
		font-size:36.66rpx ;
		color: #FFFFFF;
	}
}

</style>
