<template>
	<view>
		<view class="topka">
			<view class="sheet">
				<view class="titlee">手机号码</view>
				<input type="text" placeholder="请输入手机号码" placeholder-class="place" v-model="account" />
			</view>
			<view class="sheet">
				<view class="titlee">公司名称</view>
				<input type="text" placeholder="请输入公司名称" placeholder-class="place" />
			</view>
			<view class="sheet">
				<view class="titlee">公司法人</view>
				<input type="text" placeholder="请输入公司法人" placeholder-class="place" />
			</view>
			<view class="sheet">
				<view class="titlee">营业执照</view>
				<input type="text" placeholder="请输入营业执照" placeholder-class="place" />
			</view>
			<view class="sheet">
				<view class="titlee">公司地址</view>
				<input type="text" placeholder="请输入公司地址" placeholder-class="place" />
			</view>
			<button class="btn-logout" @click="fnClick">保存</button>
		</view>
	</view>
</template>

<script>
export default {
	components: {},

	data() {
		return {
			account: '',
			rules: {
				account: [
					{
						type: 'require',
						msg: '请输入手机号码'
					},
					{
						type: 'regexp',
						regexp: /^1[34578]\d{9}$/,
						msg: '请输入正确手机号'
					}
				]
			}
		};
	},

	mounted() {},

	methods: {
		fnClick() {
			let user = {
				account: this.account
			};

			//做校验
			let validResult = this.$mtValidation.valid(user, this.rules);
			if (!validResult) {
				return;
			}
			uni.showToast({
				title: '修改成功',
				duration: 1500,
				icon:"none",
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
.topka {
	padding-top: 13.33rpx;
}

.sheet {
	background-color: #fff;
	margin: auto;
	width: 98%;
	height: 110rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.07);
}

.titlee {
	font-size: 29.33rpx;
	font-weight: 900;
	color: #333333;
	line-height: 104rpx;
	padding: 0 30rpx;
	width: 30%;
}

input {
	width: 70%;
	margin-top: 32rpx;
	text-align: right;
	margin-right: 40rpx;
}

.place {
	font-size: 10rpx;
	text-align: right;
}

.btn-logout {
	margin-top: 100rpx;
	width: 80%;
	border-radius: 50rpx;
	font-size: 32rpx;
	color: #fff;
	background: linear-gradient(to bottom, #1880ff, #6fafff);
	height: 106.66rpx;
	line-height: 3.4;
}

.btn-logout-hover {
	background: linear-gradient(to bottom, #1880ff, #6fafff);
}
</style>
