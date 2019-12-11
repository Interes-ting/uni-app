<template>
	<view>
		<mt-alert ref="mtalert" content="保存成功" @change="change"> </mt-alert>
	</view>
</template>

<script>
	import mtAlert from '@/components/miiteen/popups/mt-alert.vue'
	export default {
		name: "MtAlert",
		components: {
			mtAlert
		},
		props: {
			//内容
			content: {
				type: String,
				default: ""
			}
		},
		data() {
			return {

			}
		},
		mounted: function() {
			this.$refs["mtalert"].open();
		},
		methods: {
			change: function(e) {
				console.log(e)
			}
		}
	}
</script>

<style>

</style>
