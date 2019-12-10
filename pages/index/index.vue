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
			<view class="mt-buttons-item" @tap="gradOrderInfo">
				<image class="mt-order-img" src="../../static/抢单.png"></image>
				<text>我的抢单</text>
			</view>
			<view class="mt-place-content"></view>
			<view class="mt-buttons-item"  @tap="fn">
					<image class="mt-order-img imgsecond" src="../../static/扔单.png"></image>
				<text >我的扔单</text>
			</view>
		</view>
		<!-- 抢单信息 -->
			<view class="mt-throw-content" style="margin-bottom: 80rpx;">
				
				<view class="mt-subject" >
					{{carList.length}}
					 <block v-for="(item,index) in carList" :key="index">
					            <view>{{item}} - {{index}}</view>
					  </block>
					<view class="mt-start-image">
						<image class="mt-city" src="../../static/起点.png"></image>
						<text class="text-spacing fontbold">苏州市</text>
					</view>
					<view class="mt-start-image">
						<image class="mt-city" src="../../static/起点.png"></image>
						<text  class="text-spacing fontbold">苏州市</text>
					</view>
					<view class="mt-front">
						<text class="mt-front-one text-spacing fontbold">订单金额：40元</text>
						<text class="mt-front-two text-spacing fontbold">订单金额：20元</text>
					</view>
					<view class="mt-distance">
						<text class="mt-distance-icon"></text>
						<text class="mt-distance-text" text-spacing>距离：6公里</text>
					</view>
					<view class="mt-distance">
						<text class="mt-distance-icon"></text>
						<text class="mt-distance-text text-spacing">出发时间：2019-1-28  08:36</text>
					</view>
					<view class="mt-distance">
						<text class="mt-distance-icon"></text>
						<text class="mt-distance-text text-spacing">搬运物品：螺纹钢1个规格31.29吨</text>
					</view>
					<view class="mt-label">
						<text class="mt-sos">急</text>
						<text class="mt-label-car">中面包车</text>
						<text class="mt-label-car">多拍车</text>
					</view>
					<view class="mt-seedeil">
						<text class="mt-seedeil-text">此订单由长沙运邦搬家提供</text>
						<button class="mt-seedeil-btn" @tap="searchInfo">查看</button>
					</view>
				</view>
				<!-- er -->
				<!-- <view class="mt-subject1">
					<view class="mt-start-image">
						<image class="mt-city" src="../../static/起点.png"></image>
						<text class="grabed-textcolor">苏州市</text>
					</view>
					<view class="mt-start-image">
						<image class="mt-city" src="../../static/起点.png"></image>
						<text class="grabed-textcolor">苏州市</text>
					</view>
					<view class="mt-distance">
						<text class="mt-distance-icon"></text>
						<text class="mt-distance-text grabed-textcolor">螺纹钢1个规格31.29吨</text>
					</view>
					<view class="mt-distance">
						<text class="mt-distance-icon"></text>
						<text class="mt-distance-text grabed-textcolor">螺纹钢1个规格31.29吨</text>
						<button class="mt-seedeil-btn grabed-color">查看</button>
					</view>
				</view>
			</view> -->
			<!-- 底部导航栏 -->
			<view class="cu-bar tabbar bg-white mt-tabbar">
				<view class="action" >
					<view class="cuIcon-cu-image">
						<image src="../../static/person.jpg"></image>
				</view>
					<view class="text-blue">首页</view>
				</view>
				<view class="action" @click="goThrow">
					<view class="cuIcon-cu-image">
						<image src="../../static/person.jpg"></image>
					</view>
					<view class="text-gray">扔单</view>
				</view>
				<view class="action"  @click="goWallet">
					<view class="cuIcon-cu-image">
						<image src="../../static/person.jpg"></image>
						<!-- <view class="cu-tag badge">99</view> -->
					</view>
					<view class="text-gray">收益</view>
				</view>
				<view class="action"  @click="goPerson">
					<view class="cuIcon-cu-image">
						<image src="../../static/person.jpg"></image>
						<!-- <view class="cu-tag badge"></view> -->
					</view>
					<view class="text-gray">我的</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	
	data() {
		return {
			carList: [],
		};
	},
	mounted() {
		// 发送网络请求
		// this.getList();
		console.log(this.carList)

	},
	onLoad() {
		// this.getList();
	},
	methods: {
		goThrow: function (){
			//扔单
			 uni.navigateTo({
			     url: "../order/throw"
			 });
		},
		// getList:function(){
		// 	//网络请求
		// 	uni.request({
		// 	  url: 'http://192.168.0.109:8102/api/order_info/wait_grab_record',
		// 		method: 'POST',
		// 	  success: function (res) {
		// 		this.carList = res.data.data;
		// 		console.log(this.carList)
		// 	 }
		// 	});
		// },
		goWallet: function (){
			//收益
			uni.navigateTo({
			    url: "../wallet/wallet"
			});
		},
		goPerson: function (){
			//个人中心
			uni.navigateTo({
			    url: "../person/person"
			});
		},
		
		fn: function (){
			//跳转到扔单记录
			uni.navigateTo({
			    url: "../order/throwRecord"
			});
		},
		searchInfo:function(){
			//跳转到抢单详情
			uni.navigateTo({
			    url: "../order/grabOrderInfo"
			});
		},
		gradOrderInfo:function(){
			//跳转到抢单记录
			uni.navigateTo({
			    url: "../order/grabRecord"
			});
		}
	}
	
};
</script>

<style lang="less" scoped>
page {
	background-color: #f4f4f4;
	color: #333333;
}
image {
	width: 100%;
	height: 100%;
}
// .mt-tabbar{
// 	position: fixed;
// 	z-index: 999;
// 	bottom: 0;
// 	width: 100%;
// }

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #333333;
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
	background-color: #FFFFFF;
	font-size:29.33rpx ;
}
.current-active {
	color:#1A4397;
}
.mt-buttons-item{
	  flex: 1;
		justify-content: center;
		text-align: center;
}

.mt-order-img {
	width:54rpx;
	height: 68.66rpx;
	position: relative;
	right: 13.33rpx;
	top: 20%;
}
.imgsecond{
	width: 62rpx;
}
.mt-place-content {
	position: absolute;
	top: 26.66rpx;
	width: 0.66rpx;
	height: 54.66rpx;
	background-color: #cccccc;
}
.mt-throw-content{
	width: 100%;
	box-sizing: border-box;
	padding:20rpx;
}
.mt-subject {
	width: 100%;
	background-color: #FFFFFF;
	margin-bottom: 30rpx;
	border-radius: 13.04rpx;
	padding:13.04rpx ;
}
.mt-start-image {
		width: 100%;
		background-color: #fff;
		border-radius: 13.04rpx;
		font-size: 31.31rpx;
		color: #333333;
		height: 53.33rpx;
}
.mt-city {
	width: 18rpx;
	height: 24rpx;
	margin: 0 10rpx;
}
.grabed-textcolor {
	color: #999999;
}
.grabed-color {
	background-color: #CCCCCC;
}
.text-spacing{
	letter-spacing: 7rpx;
}
.fontbold{
	font-weight:700;
}
.mt-buttons-content {
	position: relative;
}

.mt-subject1 {
	width: 100%;
	background-color: #FFFFFF;
	margin-bottom: 30rpx;
	border-radius: 13.04rpx;
	padding:13.04rpx;
}
.mt-front {
	width: 100%;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 25.52rpx;
	font-weight: 400rpx;
	line-height: 60rpx;
	margin-left: 12rpx;
}
.mt-front-one {
	padding-left: 20rpx;
}
.mt-front-two {
	padding-left: 60rpx;
}
.mt-distance {
	position: relative;
	width: 100%;
	height: 50rpx;
	line-height: 50rpx;
	color: #666666;
	font-size: 25.52rpx;
}
.mt-distance-icon {
	display: inline-block;
	width: 16.66rpx;
	height: 16.66rpx;
	background-color: pink;
	margin-right: 10rpx;
	margin-left: 10rpx;
}

.mt-label {
	width: 100%;
	color: orange;
	font-size: 20rpx;
	vertical-align: middle;
	padding-top: 10rpx;
	padding-bottom: 20rpx;
}
.mt-sos{
	display: inline-block;
	background-color: red;
	padding: 6.66rpx 13.33rpx;
	 /* height: 30rpx; */
	text-align: center;
	border: 1rpx solid orange;
	border-radius: 10rpx;
	margin-left: 30rpx;
	color: #FFFFFF;
}

.mt-label-car{
	display: inline-block;
	padding: 6.66rpx 13.33rpx;
	text-align: center;
	border: 1rpx solid #FF571D;
	border-radius: 10rpx;
	margin-left: 15rpx;
}
.mt-seedeil {
	width: 100%;
	height: 70rpx;
	position: relative;
}
.mt-seedeil-text {
	margin-left: 30rpx;
	display: inline-block;
	font-size: 25.52rpx
} 
.mt-seedeil-btn {
	width: 156.66rpx;
	height: 68.66rpx;
	line-height: 68.66rpx;
	display: inline-block;
	text-align: center;
	border-radius: 51.5px;
	background:linear-gradient(to bottom, #1880FF,#509EFF);/*设置按钮为渐变颜色*/
	color: #fff;
	font-size: 30rpx;
	margin-left: 60rpx;
	position: absolute;
	right: 100rpx;
	bottom: 20rpx;
}
.grabed-color{
	background-color: #CCCCCC!important;
}
</style>
