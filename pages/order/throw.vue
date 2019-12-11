<!-- 扔单 -->
<template>
	<view class="throw-content">
		<view class="mt-hascar"></view>
		<!-- 底部导航栏 -->
		<view class="cu-bar tabbar bg-white mt-tabbar">
			<view class="action" @click="goIndex">
				<view class="cuIcon-cu-image">
					<image src="../../static/person.jpg"></image>
				</view>
				<view class="text-gray">首页</view>
			</view>
			<view class="action">
				<view class="cuIcon-cu-image">
					<image src="../../static/person.jpg"></image>
				</view>
				<view class="text-blue">扔单</view>
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
</template>

<script>
	export default {
		data() {
			return {
				carList:[1,2,3]
			}
		},
		methods: {
			goIndex: function (){
				//扔单
				
				 uni.navigateTo({
				     url: "../index/index"
				 });
			},
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
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color:#f4f4f4;
		color: #333333;
	}
	image{
		width: 100%;
		height: 100%;
	}
</style>
