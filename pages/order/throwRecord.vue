<template>
	<view>
		扔单记录
		<button type="primary" @tap="fn">跳转到扔单详情</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			fn:function(){
				uni.navigateTo({
				    url: './throwOrderInfo'
				});
			}
		}
	}
</script>

<style>

</style>
