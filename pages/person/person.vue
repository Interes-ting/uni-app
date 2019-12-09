<template>
	<view class="aaa">
		<view class="person-head">
			<cmd-avatar src="https://avatar.bbs.miui.com/images/noavatar_small.gif" size="lg" :make="{'background-color': '#fff'}"></cmd-avatar>
			<view class="person-head-box">
				<view class="person-head-nickname">张三</view>
				<view class="person-head-username">长沙运邦搬家</view>
				<view class="person-head-username">18096253214</view>
			</view>
		</view>
		<view class="person-list">
			<cmd-cell-item title="用户资料" slot-left arrow @click="fnInfoWin">
				<image src="../../static/订单.png" class="imgs"></image>
			</cmd-cell-item>
			<cmd-cell-item title="车辆信息" slot-left arrow>
				<image src="../../static/货车.png" class="imgs"></image>
			</cmd-cell-item>
			<cmd-cell-item title="关于我们" slot-left arrow>
				<image src="../../static/关于我们.png" class="imgs"></image>
			</cmd-cell-item>
			<cmd-cell-item title="建议反馈" slot-left arrow>
				<image src="../../static/建议反馈.png" class="imgs"></image>
			</cmd-cell-item>
			<cmd-cell-item title="系统设置" slot-left arrow>
				<image src="../../static/设置.png" class="imgs"></image>
			</cmd-cell-item>
			<cmd-cell-item title="我的银行卡" slot-left arrow>
				<image src="../../static/银行卡.png" class="imgs"></image>
			</cmd-cell-item>
		</view>
	</view>
</template>

<script>
	import cmdAvatar from "@/components/cmd-person/cmd-avatar/cmd-avatar.vue"
	import cmdIcon from "@/components/cmd-person/cmd-icon/cmd-icon.vue"
	import cmdCellItem from "@/components/cmd-person/cmd-cell-item/cmd-cell-item.vue"

	export default {
		components: {
			cmdAvatar,
			cmdCellItem,
			cmdIcon
		},
		data() {
			return {};
		},
		methods: {
			/**
			 * 打开用户信息页
			 */
			fnInfoWin() {
				uni.navigateTo({
					url: '/pages/person/personInfo'
				})
			}
		}
	}
</script>

<style>
	.aaa {
		background: linear-gradient(to right, #4752E8, #4987EE);
	}
	
	.imgs{
		height: 111.33rpx;
		width: 111.33rpx;
	}

	.person-head {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 333.33rpx;
		padding-top: 43.33rpx;
	}

	.person-head-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.person-head-nickname {
		font-size: 32rpx;
		font-weight: 500;
		color: #fff;
		margin: 30rpx auto 3rpx;
	}

	.person-head-username {
		font-size: 28rpx;
		font-weight: 500;
		color: #fff;
		margin: 3rpx auto;
		padding-top: 2px;
	}

	.person-list {
		background-color: #fff;
		line-height: 0;
		border-top-right-radius: 30px;
		border-top-left-radius: 30px;
		padding-top: 10px;
	}
</style>
