<template>
	<view class="backimage">
		<image src="/static/backservice.png"></image>
		<button class="btn-logout mtfa mt-dianhua" @click="phone">拨打客服电话</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		phone: function() {
			uni.makePhoneCall({
				phoneNumber: '18371155678'
			});
		}
	}
};
</script>
<style>
page {
	background-color: #ffffff;
}
image {
	height: 100%;
	width: 100%;
}
.backimage {
	height: 480rpx;
}
.btn-logout {
	margin-top: 140rpx;
	width: 70%;
	border-radius: 50rpx;
	font-size: 40rpx;
	color: #fff;
	background: linear-gradient(to bottom, #1880ff, #6fafff);
	height: 95rpx;
	line-height: 2.4;
}
</style>
