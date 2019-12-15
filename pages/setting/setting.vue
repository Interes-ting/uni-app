<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">接收短信通知</view>
			<switch @change="SwitchA" :class="switchA ? 'checked' : ''" :checked="switchA ? true : false"></switch>
		</view>
		<view class="cu-form-group margin-tops" @tap="Modify">
			<view class="title">修改密码</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="cu-form-group margin-tops justify-center" @tap="exit">
			<view class="title contentss">退出登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchA: true,
				modalName: null,
			};
		},
		methods: {
			SwitchA(e) {
				this.switchA = e.detail.value;
				console.log(e.detail.value)
			},
			Modify() {
				uni.navigateTo({
					url: '/pages/account/modify'
				});
			},
			exit() {
				uni.showModal({
					title: '',
					content: "确定要退出登录?",
					success: res => {
						if (res.confirm) {
							this.$mtAccount.logout();
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
					}
				})
			}
		}
	};
</script>

<style>
	.margin-top {
		margin-top: 50rpx;
	}

	.margin-tops {
		margin-top: 20rpx;
	}

	.title {
		font-size: 29.33rpx;
		font-weight: 900;
		color: #333333;
		line-height: 58rpx;
		padding: 0 30rpx;
	}

	.contentss {
		color: red;
	}
</style>
