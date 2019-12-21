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
		<view class="cu-form-group margin-tops justify-center" @tap="exit"><view class="title contentss">退出登录</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			switchA: true,
			needCar: 1,
			modalName: null
		};
	},
	methods: {
		SwitchA: function(e) {
			this.switchA = e.detail.value;
			if (this.switchA) {
				this.needCar = 1; //true
			} else {
				this.needCar = 0; //false
			}
			console.log(this.needCar);
			let url = this.$mtConfig.getPlatformUrl('api/merchant_order_notice/enable?') + 'merchantInfoId=' + this.$mtAccount.info().merchantInfoId + '&enable=' + this.needCar;
			this.$mtRequest.post(url, {}, data => {
				if (data.state > 0) {
					uni.showToast({
						title: '修改成功',
					});
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none'
					});
				}
				//结束请求
				this.$mtRequest.stop();
			});
		},
		Modify: function() {
			uni.navigateTo({
				url: '/pages/account/modify'
			});
		},
		exit: function() {
			uni.showModal({
				title: '',
				content: '确定要退出登录?',
				success: res => {
					if (res.confirm) {
						this.$mtAccount.logout();
						uni.clearStorage();
						uni.reLaunch({
							url: '/pages/login/login'
						});
					};
					
				}
			});
			
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
