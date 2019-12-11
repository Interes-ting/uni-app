<template>
	<view class="margin-top">
		<view class="cu-form-group field"><textarea maxlength="-1" @input="textareaAInput" placeholder="请提出您宝贵的意见和建议" v-model="account"></textarea></view>
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
			uni.showToast({
				title: '提交成功',
				duration: 1500,
				icon: 'none'
			});
			setTimeout(function() {
				uni.navigateBack({
					url: '/pages/person/person'
				});
			}, 2000);
		}
	}
};
</script>

<style>
.margin-top {
	margin-top: 40rpx;
}
.field {
	border: 0.66rpx solid #f0f0f0;
	height: 363.33rpx;
	border-radius: 20rpx;
}
uni-page-body {
	width: 94%;
	margin: auto;
}
.cu-form-group uni-textarea {
	height: 100%;
	padding: 24rpx 0;
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
