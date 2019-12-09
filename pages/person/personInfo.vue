<template>
	<view>
		<cmd-nav-bar back title="用户资料"></cmd-nav-bar>
		<cmd-page-body type="top">
			<cmd-transition name="fade-up">
				<view>
					<input-box leftText="用户名:" v-model="companmy"></input-box>
					<input-box
						leftText="公司名称:"
						ref="input1"
						:verification="['isNull']"
						:verificationTip="['公司名称不能为空']"
						placeholder="请输入公司名称"
						inputValue="长沙运邦搬家"
					></input-box>
					<input-box
						leftText="手机号码:"
						ref="input2"
						:verification="['isNull', 'isPhoneNum']"
						:verificationTip="['手机号码不能为空', '请输入正确的手机号']"
						placeholder="请输入手机号码"
						maxLength="11"
					></input-box>
					<input-box
						leftText="公司法人:"
						placeholder="请输入公司法人"
					></input-box>
					<input-box
						leftText="营业执照:"
						placeholder="请输入营业执照"
					></input-box>
					<input-box
						leftText="公司地址:"
						placeholder="请输入公司地址"
						v-model="companmy"
					></input-box>
					<input v-model="companmy" />
					<button class="btn-logout" @click="fnClick">保存</button>
				</view>
			</cmd-transition>
		</cmd-page-body>
	</view>
</template>

<script>
import cmdNavBar from '@/components/cmd-person/cmd-nav-bar/cmd-nav-bar.vue';
import cmdPageBody from '@/components/cmd-person/cmd-page-body/cmd-page-body.vue';
import cmdTransition from '@/components/cmd-person/cmd-transition/cmd-transition.vue';
import cmdCelItem from '@/components/cmd-person/cmd-cell-item/cmd-cell-item.vue';
import cmdAvatar from '@/components/cmd-person/cmd-avatar/cmd-avatar.vue';
import inputBox from '@/components/input-box/input-box';

export default {
	components: {
		cmdNavBar,
		cmdPageBody,
		cmdTransition,
		cmdCelItem,
		cmdAvatar,
		inputBox
	},

	data() {
		return {
			companmy:'asadasa',

		};
	},

	mounted() {},

	methods: {
		fnClick() {
			if (this.$refs.input1.getValue() && this.$refs.input2.getValue()) {
				uni.showToast({
					icon: 'none',
					title: '校验通过',
					// #ifdef MP-WEIXIN
					duration: 2000
					// #endif
					// mask: true
				});
				uni.switchTab({
					url: '/pages/person/person'
				});
			}
		}
	}
};
</script>

<style>
.btn-logout {
	margin-top: 100upx;
	width: 80%;
	border-radius: 50upx;
	font-size: 32rpx;
	color: #fff;
	background: linear-gradient(to bottom, #1880ff, #6fafff);
}

.btn-logout-hover {
	background: linear-gradient(to bottom, #1880ff, #6fafff);
}

</style>
