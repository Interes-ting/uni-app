<template>
	<view>
		<cmd-nav-bar back title="更多设置"></cmd-nav-bar>
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
import cmdNavBar from '@/components/cmd-person/cmd-nav-bar/cmd-nav-bar.vue';

export default {
	components: {
		cmdNavBar
	},
	data() {
		return {
			switchA: true,
		};
	},
	methods: {
		switch1Change: function(e) {
			console.log('switch1 发生 change 事件，携带值为', e.target.value);
		},
		SwitchA(e) {
			this.switchA = e.detail.value
		},
		Modify() {
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
</style>
