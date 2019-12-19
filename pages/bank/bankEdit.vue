<template>
	<view>
		<view class="topka">
			<view class="sheet">
				<view class="titlee"><text class="red">*</text>持卡人</view>
				<input type="text" placeholder="请输入持卡人真实姓名" placeholder-class="place" v-model="personname" maxlength="15" />
			</view>
			<view class="sheet">
				<view class="titlee"><text class="red">*</text>银行卡号</view>
				<input type="text" placeholder="请输入银行卡账号" placeholder-class="place" v-model="cardname" maxlength="19" />
			</view>
			<view class="sheet">
				<view class="titlee"><text class="red">*</text>开户行</view>
				<input type="text" placeholder="请选择开户行" placeholder-class="place" disabled="ture" @click="onindexed" v-model="listname" />
			</view>
			<button class="btn-logout" @click="fnClick">保存</button>
			<uni-indexed-list :options="list" :showSelect="false" @click="bindClick" v-if="unpack==false" />
		</view>
	</view>
</template>

<script>
	import airport from '@/common/airport.js';
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue';

	export default {
		components: {
			uniIndexedList
		},

		data() {
			return {
				list: airport.list,
				unpack: true,
				listname: '',
				personname: '',
				cardname: '',
				cardNo: '',
				rules: {
					personname: [{
						type: 'require',
						msg: '请输入持卡人姓名'

					}
				],
				cardname: [
					{
						type: 'require',
						msg: '请输入银行卡号'
					},
					{
						type: 'regexp',
						regexp: /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/,
						msg: '请输入正确银行卡号'
					}
				],
				listname: [
					{
						type: 'require',
						msg: '请选择开户行'
					}]
				}
			};
		},

		onLoad() {
			this.inpost();
		},

		methods: {
			inpost: function() {
				this.$mtRequest.get(
					this.$mtConfig.getPlatformUrl('/api/bank_card/get'), {
						use_id: this.$mtAccount.info().merchantInfoId,
					},
					data => {
						if (data.state > 0) {
							this.cardname = data.data.cardNo;
							this.personname = data.data.name;
							this.listname = data.data.bankName;
						} else {}
						this.$mtRequest.stop();
					}
				);
			},
			onindexed() {
				this.unpack = false;
			},
			bindClick(e) {
				this.unpack = true;
				this.listname = e.item.name;
			},
			fnClick: function() {
				let user = {
					personname: this.personname,
					cardname: this.cardname,
					listname: this.listname
				};

				//做校验
				let validResult = this.$mtValidation.valid(user, this.rules);
				if (!validResult) {
					return;
				}
				//防重复
				if (this.$mtRequest.isRepeat()) {
					return;
				}
				this.$mtRequest.post(
					this.$mtConfig.getPlatformUrl('/api/bank_card/save'), {
						useId: this.$mtAccount.info().merchantInfoId,
						cardNo: this.cardname,
						name: this.personname,
						bankName: this.listname
					},
					data => {
						if (data.state > 0) {
							uni.showToast({
								title: '保存成功',
								success: function() {
									setTimeout(function() {
										uni.switchTab({
											url: '/pages/person/person'
										});
									}, 2000);
								}
							});
						} else {
							uni.showToast({
								title: data.message,
								icon: 'none'
							});
						}
						//结束请求
						this.$mtRequest.stop();
					}
				);
			}
		}
	};
</script>

<style>
	.reveal {
		display: none;
		z-index: 1;
		position: absolute;
	}

	.red {
		font-size: 20rpx;
		color: red;
	}

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
		width: 95%;
		margin-top: 24rpx;
		text-align: right;
		margin-right: 40rpx;
		z-index: 0;
		position: absolute;
	}

	.place {
		font-size: 24rpx;
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
</style>
