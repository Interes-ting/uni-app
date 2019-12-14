<template>
	<view class="margin-top">
		<view class="cu-form-group"><textarea class="field" maxlength="-1" @input="textareaAInput" placeholder="请提出您宝贵的意见和建议" v-model="account"></textarea></view>
		<button class="btn-logout" @click="fnClick">确认提交</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			account: '',
			rules: {
				account: [
					{
						type: 'require',
						msg: '不能提交空的建议'
					}
				]
			}
		};
	},

	onLoad: function(option) {
		this.carList = option;
	},

	methods: {
		textareaAInput(e) {
			this.textareaAValue = e.detail.value;
		},
		fnClick: function() {
			let user = {
				account: this.account
			};

			//做校验
			let validResult = this.$mtValidation.valid(user, this.rules);
			if (!validResult) {
				return;
			}

			let that = this;
			this.$mtRequest.post(
				this.$mtConfig.getPlatformUrl('/api/feed_back/add'),
				{
					feedContent: this.account,
					merchantInfoId: this.carList.id
				},
				function(data) {
					if (data.state > 0) {
						uni.showToast({
							title: '提交成功',
							success: function() {
								setTimeout(function() {
									uni.switchTab({
										url: '/pages/person/person'
									});
								}, 2000);
							}
						});
					} else {
						uni.showToast({
							title: data.message,
							icon: 'none'
						});
					}

					//结束请求
					that.$mtRequest.stop();
				}
			);
			console.log(user);
		}
	}
};
</script>

<style>
.field {
	height: 360rpx !important;
	min-height: 360rpx !important;
}
.margin-top {
	margin-top: 40rpx !important;
	width: 94%;
	margin: auto;
}
.cu-form-group{
	border: 0.66rpx solid #f0f0f0;
	border-radius: 20rpx;
}
.btn-logout {
	margin-top: 100rpx;
	width: 62%;
	border-radius: 50rpx;
	font-size: 32rpx;
	color: #fff;
	background: linear-gradient(to bottom, #1880ff, #6fafff);
	height: 73.33rpx;
	line-height: 2.3;
}
</style>
