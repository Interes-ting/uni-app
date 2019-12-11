<template>
	<view>
		收益
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
				
			}
		},
		methods: {
			goIndex: function() {
				//首页
				uni.navigateTo({
					url: '../index/index'
				});
			},
			goThrow: function (){
				//扔单
				 uni.navigateTo({
				     url: "../order/throw"
				 });
			},
			goPerson: function() {
				//个人中心
				uni.navigateTo({
					url: '../person/person'
				});
			},
		}
	}
</script>

<style>

</style>
