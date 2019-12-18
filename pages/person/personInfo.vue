<template>
	<view>
		<view class="topka">
			<view class="sheet">
				<view class="titlee">手机号码</view>
				<input type="text" placeholder="请输入手机号码" placeholder-class="place" v-model="merchantCode" disabled="ture" />
			</view>
			<view class="sheet">
				<view class="titlee">公司名称</view>
				<input type="text" placeholder="请输入公司名称" placeholder-class="place" v-model="merchantName" maxlength="50"/>
			</view>
			<view class="sheet">
				<view class="titlee">公司法人</view>
				<input type="text" placeholder="请输入公司法人" placeholder-class="place" v-model="companyLegalPerson" maxlength="20"/>
			</view>
			<view class="sheet">
				<view class="titlee">统一社会信用代码</view>
				<input type="text" placeholder="请输入统一社会信用代码" placeholder-class="place" v-model="businessLicense" maxlength="18"/>
			</view>
			<view class="sheet">
				<view class="titlee">公司地址</view>
				<input type="text" placeholder="请输入公司地址" placeholder-class="place" v-model="companyAddress" maxlength="50"/>
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
			merchantCode: '',
			merchantName: '',
			companyLegalPerson: '',
			businessLicense: '',
			companyAddress: '',
			rules: {
				merchantName: [
					{
						type: 'require',
						msg: '请输入公司名称',
					}
				],
			}
		}
	},

	onLoad() {
		this.inpost();
	},

	methods: {
		inpost: function() {
			let that = this;
			this.$mtRequest.post(this.$mtConfig.getPlatformUrl('/api/merchant_info/selectUser'),
			{
			merchantId:this.$mtAccount.info().merchantInfoId,
			},
			function(data) {
				that.merchantCode = data.data.merchantCode;
				that.merchantName = data.data.merchantName;
				that.companyLegalPerson = data.data.companyLegalPerson;
				that.businessLicense = data.data.businessLicense;
				that.companyAddress = data.data.companyAddress;
				//结束请求
				that.$mtRequest.stop();
			});
		},
		fnClick: function() {
			let user = {
				merchantName: this.merchantName,
			};
			
			//做校验
			let validResult = this.$mtValidation.valid(user, this.rules);
			if (!validResult) {
				return;
			}
			if (this.$mtRequest.isRepeat()) {
			     return;
			}
			this.$mtRequest.post(
				this.$mtConfig.getPlatformUrl('api/merchant_info/updatUser'),
				{
					merchantId: this.$mtAccount.info().merchantInfoId,
					merchantName: this.merchantName,
					businessLicense: this.businessLicense,
					companyAddress: this.companyAddress,
					companyLegalPerson: this.companyLegalPerson,
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
	padding: 0 0 0 30rpx;
	width: 40%;
}

input {
	width: 65%;
	margin-top: 26rpx;
	text-align: right;
	margin-right: 40rpx;
}

.place {
	font-size: 26rpx;
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
