<template>
	<view>
		<uni-popup ref="showtip" type="center" :mask-click="false" @change="change">
			<view class="cu-dialog">
				<view class="padding-xl  bg-white text-center">
					{{content}}
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="close">确定</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		name: "MtAlert",
		components: {
			uniPopup
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
		methods: {
			change: function(e) {
				this.$emit('change', e)
			},
			//打开
			open: function() {
				this.$refs["showtip"].open();
			},
			//关闭
			close: function() {
				this.$refs['showtip'].close()
			}
		}
	}
</script>

<style>

</style>
