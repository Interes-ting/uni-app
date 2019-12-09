<template>
	<view>
		<cmd-nav-bar back title="用户资料"></cmd-nav-bar>
		<cmd-page-body type="top">
			<cmd-transition name="fade-up">
				<view>
					<cmd-cel-item title="公司名称" addon="长沙运邦搬家" arrow></cmd-cel-item>
					<cmd-cel-item title="公司法人" addon="Lich" arrow></cmd-cel-item>
					<cmd-cel-item title="手机号码" addon="15676109501" arrow></cmd-cel-item>
					<cmd-cel-item title="营业执照" addon="450112xxxxxxxx2017" arrow></cmd-cel-item>
					<cmd-cel-item title="公司地址" addon="广西壮族自治区南宁市西乡塘区大学西路29号" arrow></cmd-cel-item>
					<button class="btn-logout" @click="fnClick">保存</button>
				</view>
			</cmd-transition>
		</cmd-page-body>
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-person/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-person/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-person/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-person/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-person/cmd-avatar/cmd-avatar.vue"

	export default {
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdCelItem,
			cmdAvatar
		},

		data() {
			return {};
		},

		mounted() {},

		methods: {
			fnClick() {
				uni.navigateTo({
					url: '/pages/person/person'
				})
			}
		}
	}
</script>

<style>
	.btn-logout {
		margin-top: 100upx;
		width: 80%;
		border-radius: 50upx;
		font-size: 16px;
		color: #fff;
		background: linear-gradient(to right, #365fff, #36bbff);
	}

	.btn-logout-hover {
		background: linear-gradient(to right, #365fdd, #36bbfa);
	}
</style>
