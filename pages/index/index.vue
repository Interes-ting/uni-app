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
			<view class="mt-buttons-item current-active">
				<view class="mt-image-content second-image">
					<image class="mt-order-img" src="../../static/抢单.png"></image></view>
				<text class="mt-order">抢单记录(1)</text>
			</view>
			<view class="mt-place-content"></view>
			<view class="mt-buttons-item"  @tap="fn">
				<view class="mt-image-content second-image">
					<image class="mt-order-img" src="../../static/扔单.png"></image></view>
				<text class="mt-order">扔单记录(0)</text>
			</view>
		</view>
		<!-- 抢单信息 -->
			<view class="mt-throw-content">
				<view class="mt-subject">
					
					<view class="mt-start-image">
						<image class="mt-city" src="../../static/起点.png"></image>
						<text style="font-size: 30rpx;font-weight: 700;">苏州市</text>
						<image class="mt-detial" src="../../static/起点.png"></image>
					</view>
					<view class="mt-start-image">
						<image class="mt-city" src="../../static/起点.png"></image>
						<text style="font-size: 30rpx;font-weight: 700;">苏州市</text>
					</view>
					<view class="mt-front">
						<text class="mt-front-one">订单金额：40元</text>
						<text class="mt-front-two">订单金额：20元</text>
					</view>
					<view class="mt-distance">
						<text class="mt-distance-icon"></text>
						<text class="mt-distance-text">距离：6公里</text>
					</view>
					<view class="mt-distance">
						<text class="mt-distance-icon"></text>
						<text class="mt-distance-text">出发时间：2019-05-20</text>
					</view>
					<view class="mt-distance">
						<text class="mt-distance-icon"></text>
						<text class="mt-distance-text">搬运物品：爱心一枚</text>
					</view>
					<view class="mt-label">
						<text class="mt-label-car">中面包车</text>
						<text class="mt-label-car">多拍车</text>
					</view>
					<view class="mt-seedeil">
						<text class="mt-seedeil-text">此鼎带你武都区武都区武都区我</text>
						<button class="mt-seedeil-btn">查看</button>
					</view>
				</view>
				<!-- er -->
				<view class="mt-subject1">
					<view class="mt-start-image">
						<image class="mt-city" src="../../static/起点.png"></image>
						<text style="font-size: 30rpx;font-weight: 700;">苏州市</text>
						<image class="mt-detial" src="../../static/起点.png"></image>
					</view>
					<view class="mt-start-image">
						<image class="mt-city" src="../../static/起点.png"></image>
						<text style="font-size: 30rpx;font-weight: 700;">苏州市</text>
					</view>
					<view class="mt-distance">
						<text class="mt-distance-icon"></text>
						<text class="mt-distance-text">距离：6公里</text>
					</view>
					<view class="mt-distance">
						<text class="mt-distance-icon"></text>
						<text class="mt-distance-text">出发时间：2019-05-20</text>
						<button class="mt-seedeil-btn">查看</button>
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
			title: '首页'
		};
	},
	onLoad() {},
	methods: {
		fn: function (){
			//跳转到扔单记录
			uni.navigateTo({
			    url: "../order/throwRecord"
			});
		}
	}
	
};
</script>

<style>
page {
	background-color: #f4f4f4;
}
image {
	width: 100%;
	height: 100%;
}
.mt-seedeil {
	width: 100%;
	height: 70rpx;
	position: relative;
}
.mt-seedeil-text {
	margin-left: 30rpx;
	display: inline-block;
	font-size: 24rpx;
	
}
.mt-seedeil-btn {
	width: 120rpx;
	height: 50rpx;
	display: inline-block;
	text-align: center;
	line-height: 50rpx;
	border-radius: 25rpx;
	background-color: skyblue;
	color: #fff;
	font-size: 30rpx;
	margin-left: 60rpx;
	position: absolute;
	right: 100rpx;
	/* top: 10rpx; */
}
.mt-label {
	width: 100%;
	
	height: 50rpx;
	color: orange;
	font-size: 20rpx;
}
.mt-label-car{
	display: inline-block;
	/* background-color: orange; */
	width: 130rpx;
	 /* height: 30rpx; */
	text-align: center;
	border: 1rpx solid orange;
	border-radius: 10rpx;
	margin-right: 10rpx;
	margin-left: 30rpx;
}
.mt-distance {
	position: relative;
	width: 100%;
	height: 50rpx;
	color: #ccc;
	font-size: 24rpx;
}
.mt-distance-icon {
	display: inline-block;
	width: 20rpx;
	height: 20rpx;
	margin-left: 10rpx;
	margin-right: 10rpx;
	background-color: pink;
	
}
.mt-front {
	width: 100%;
	height: 60rpx;
	font-size: 20rpx;
	font-weight: 700;
}
.mt-front-one {
	padding-left: 20rpx;
}
.mt-front-two {
	padding-left: 90rpx;
}
.mt-detial{
	float: right;
	margin: 10rpx 20rpx 0 0;
	width: 50rpx;
	height: 50rpx;
	background-color: pink;
}

.mt-start-image {
	width: 100%;
	height: 60rpx;
	
}
.mt-subject {
	width: 100%;
	background-color: #FFFFFF;
	margin-bottom: 30rpx;
}
.mt-subject1 {
	width: 100%;
	background-color: #FFFFFF;
	height: 250rpx;
	/* margin-bottom: 10rpx; */
}
.mt-city {
	width: 20rpx;
	height: 20rpx;
	margin: 0 10rpx;
	
}
.mt-buttons-content {
	position: relative;
}
.mt-order-img {
	left:30rpx;
	top:50%;
	transform: translateY(-30%);
}
.mt-order {
	position: absolute;
	lefe:50%;
	top:50%;
	transform: translate(-50%,-50%);
}
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
.mt-image-content{
	width:54rpx ;
	height: 68.66rpx;
}
.second-image {
	width: 62rpx;
	
}
.mt-image-content image{
	width: 100%;
	height: 100%;
}
.mt-place-content {
	width: 0.66rpx;
	height: 54.66rpx;
	background-color: #cccccc;
}
.mt-throw-content{
	width: 100%;
	box-sizing: border-box;
	padding:10rpx;
}
.mt-start-image {
		width: 100%;
		background-color: #fff;
		
	}
.mt-start-edit{
	width: 37.33rpx;
	height: 41.33rpx;
	color: #007AFF;
}
</style>
