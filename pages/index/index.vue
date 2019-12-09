<template>
	<view class="content">
		<!-- 轮播图-->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500" indicator-active-color="#133c8e" indicator-color="#999999">
						<swiper-item><view class="swiper-item">A</view></swiper-item>
						<swiper-item><view class="swiper-item">B</view></swiper-item>
						<swiper-item><view class="swiper-item">C</view></swiper-item>
						<!-- 											<swiper-item v-for="(item , index) in homeSlide" :key="index">
															<image :src="item.img" mode="aspectFill"></image>
														</swiper-item> -->
					</swiper>
				</view>
			</view>
		</view>
		<!-- 按钮组-->
		<view class="mt-buttons-box">
			<view class="mt-button-item">
				<view class="mt-image-content">
					<image src="../../static/抢单.png" ></image>
				</view>
				<text>抢单记录(1)</text>
			</view>
			<view class="mt-button-item">
				<view class="mt-image-content">
					<image src="../../static/抢单.png" ></image>
				</view>
				<text>抛单记录(0)</text>
			</view>
		</view>
		<!-- 按钮组end -->
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
	methods: {}
};
</script>

<style>
	.swiper {
		height:100%;
	}
	.uni-swiper-wrapper {
		height:100%;
	}
	.page-section-spacing {
		height:100%;
		}
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #333333;
}

.uni-padding-wrap {
	width: 100%;
	height: 200px;

	background-color: #007aff;
}
.swiper-item {
	width: 100%;
	height: 100%;
}
.mt-buttons-box {
	display: flex;
	width: 100%;
	height: 166rpx;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.mt-button-item {
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	line-height: 51px;
	text-align: center;
}
.mt-image-content{
	float: left;
	width: 83rpx;
	height:103rpx;
	vertical-align: middle;
}
.mt-image-content image{
	width: 100%;
	height:100%;
	vertical-align: middle;
}
</style>
