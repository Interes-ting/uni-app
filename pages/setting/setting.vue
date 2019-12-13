<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">接收短信通知</view>
			<switch @change="SwitchA" :class="switchA ? 'checked' : ''" :checked="switchA ? true : false"></switch>
		</view>
		<view class="cu-form-group margin-tops" @click="Modify">
			<view class="title">修改密码</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="cu-form-group margin-tops" @click="secede" >
			<view class="title contentss">退出登录</view>
		</view>

		<button class="cu-btn bg-green shadow" @tap="showModal" data-target="DialogModal1">隐私保护弹窗</button>
		<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end"><view class="content">温馨提示</view></view>
				<view class="padding-xl">
					感谢您下载并使用轻松搬家平台APP
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action heightow">
						<button class="cu-btn widthow" @tap="hideModal">不同意</button>
						<view class="zxian"></view>
						<button class="cu-btn  text-blue widthow" @tap="hideModal">同意</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
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
		Modify: function() {
			uni.navigateTo({
				url: '/pages/account/modify'
			});
		},
		secede:function(){
			
		},
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target;
		},
		hideModal(e) {
			this.modalName = null;
		}
	}
};
</script>

<style>
.padding-xl{
	background-color: #fff;
}
.cu-bar .action:last-child{
	margin-right: 0rpx;
}	
.cu-bar .action:first-child{
	margin-left: 0rpx;
}
.heightow{
	height: 100rpx;
	border-top: 4rpx solid #EEEEEE;
}
.zxian{
    background-color: #eee;
    width: 5rpx;
    height: 100%;
}
.action:last-child{
	width: 100%;
}
.widthow{
	width: 50%;
	background-color: #fff;
}
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

.contentss{
	text-align: center;
	width: 100%;
	color: red;
}
</style>
