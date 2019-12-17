<template>
	<view>
		<mt-alert ref="mtalert" :content="content" @change="change"> </mt-alert>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "123123"
			}
		},
		mounted: function() {
			this.$refs["mtalert"].open();
		},
		methods: {
			change: function(e) {
				if (e.show) {

				} else {
					//tiaozhuan
				}
				console.log(e)
			}
		}
	}
</script>

<style>

</style>
