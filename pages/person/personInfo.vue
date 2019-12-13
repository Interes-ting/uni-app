<template>
	<view>
		<view class="topka">
			<view class="sheet">
				<view class="titlee">手机号码</view>
				<input type="text" placeholder="请输入手机号码" placeholder-class="place" v-model="account" disabled="ture" />
			</view>
			<view class="sheet">
				<view class="titlee">公司名称</view>
				<input type="text" placeholder="请输入公司名称" placeholder-class="place" v-model="merchant" />
			</view>
			<view class="sheet">
				<view class="titlee">公司法人</view>
				<input type="text" placeholder="请输入公司法人" placeholder-class="place" v-model="companyperson" />
			</view>
			<view class="sheet">
				<view class="titlee">营业执照</view>
				<input type="text" placeholder="请输入营业执照" placeholder-class="place" v-model="cardId" />
			</view>
			<view class="sheet">
				<view class="titlee">公司地址</view>
				<input type="text" placeholder="请输入公司地址" placeholder-class="place" v-model="addresss" />
			</view>
			<view><mt-alert ref="mtalert" content="保存成功" @change="change"></mt-alert></view>
			<button class="btn-logout" @click="fnClick">保存</button>
		</view>
	</view>
</template>

<script>
import mtAlert from '@/components/miiteen/popups/mt-alert.vue';
export default {
	components: {
		mtAlert
	},

	data() {
		return {
			carList: '',
			account: '',
			merchant: '',
			companyperson: '',
			cardId: '',
			addresss: ''
		};
	},

	onLoad: function(option) {
		this.carList = option;

	},
	mounted() {
		this.Id = this.carList.id;
		this.account = this.carList.phone;
		this.merchant = this.carList.merchantName;
		this.companyperson = this.carList.companyLegalPerson;
		this.cardId = this.carList.businessLicense;
		this.addresss = this.carList.companyAddress;
	},
	methods: {
		fnClick() {
			this.$mtRequest.post(
				this.$mtConfig.getPlatformUrl('api/merchant_info/updatUser'),
				{
					merchantId: this.Id,
					merchantName: this.merchant,
					businessLicense: this.cardId,
					companyAddress: this.addresss,
					companyLegalPerson: this.companyperson,
				},
				data => {
					if (data.state > 0) {
						uni.showToast({
							title: '保存成功',
							success: function() {
								setTimeout(function() {
									uni.navigateTo({
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
	width: 70%;
	margin-top: 32rpx;
	text-align: right;
	margin-right: 40rpx;
}

.place {
	font-size: 24rpx;
	text-align: right;
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

.btn-logout-hover {
	background: linear-gradient(to bottom, #1880ff, #6fafff);
}
</style>
