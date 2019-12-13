<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">接收短信通知</view>
			<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
		</view>
		<view class="cu-form-group margin-tops" @click="Modify">
			<view class="title">修改密码</view>
			<text class='cuIcon-right'></text>
		</view>
	</view>
</template>

<script>

export default {
	components: {
	},
	data() {
		return {
			switchA: true,
		};
	},
	methods: {
		SwitchA(e) {
			this.switchA = e.detail.value
		},
		Modify: function() {
			uni.navigateTo({
				url: '/pages/account/modify'
			})
		},
	}
};
</script>

<style>
.margin-top {
	margin-top: 50rpx;
}
.margin-tops{
	margin-top: 20rpx;
}
.title {
	font-size: 29.33rpx;
	font-weight: 900;
	color: #333333;
	line-height: 58rpx;
	padding: 0 30rpx;
}
</style>
