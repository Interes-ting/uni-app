<!-- 扔单 -->
<template>
	<view>
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
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
