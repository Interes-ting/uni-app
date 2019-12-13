<template>
	<view>
		我的收益

		<!-- 底部导航栏 -->
		<view class="cu-bar tabbar bg-white mt-tabbar">
			<view class="action" @click="goIndex">
				<view class="mtfa mt-shouye mt-tabbar-item"></view>
				<view class="text-grey">首页</view>
			</view>
			<view class="action" @click="goThrow">
				<view class="mtfa mt-daochu mt-tabbar-item"></view>
				<view class="text-gray">扔单</view>
			</view>
			<view class="action">
				<view class="mtfa mt-qianbao mt-tabbar-item text-blue"></view>
				<view class="text-blue">收益</view>
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
			// 是否需要车辆
			switchA: true
		};
	},
	methods: {
		goIndex: function() {
			//首页
			uni.navigateTo({
				url: '../index/index'
			});
		},
		goThrow: function() {
			//扔单
			uni.navigateTo({
				url: '../order/throw'
			});
		},
		goPerson: function() {
			//个人中心
			uni.navigateTo({
				url: '../person/person'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	font-size: 26.66rpx;
	color: #333333;
}
.bold {
	font-weight: 700;
	font-size: 29.78rpx;
}
.mt-card {
	border-radius: 13.33rpx;
	background-color: #ffffff;
	margin: 13.33rpx;
	box-shadow:0rpx 0rpx 25.33rpx 0rpx rgba(0, 0, 0, 0.08);
}
.cu-form-group{
	
}
</style>
