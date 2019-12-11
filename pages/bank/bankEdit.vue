<template>
	<view>
		<view class="topka">
			<view class="sheet">
				<view class="titlee">持卡人</view>
				<input type="text" placeholder="请输入持卡人真实姓名" placeholder-class="place" v-model="personname" />
			</view>
			<view class="sheet">
				<view class="titlee">银行卡号</view>
				<input type="text" placeholder="请输入银行卡账号" placeholder-class="place" v-model="cardname" />
			</view>
			<view class="sheet">
				<view class="titlee">开户行</view>
				<input type="text" placeholder-class="place" disabled="ture" @click="onindexed" v-model="listname" />
			</view>
			<button class="btn-logout" @click="fnClick">保存</button>
			<uni-indexed-list :options="list" :showSelect="false" @click="bindClick" v-show="bankname" />
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
			listname: '',
			list: airport.list,
			bankname: false,
			personname: '',
			cardname: '',
			rules: {
				personname: [
					{
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
						regexp: /^([1-9]{1})(\d{14}|\d{18})$/,
						msg: '请输入正确银行卡号'
					}
				],
				listname: [
					{
						type: 'require',
						msg: '请选择开户行'
					}
				]
			}
		};
	},
	methods: {
		onindexed() {
			this.bankname = true;
		},
		bindClick(e) {
			this.bankname = false;
			this.listname = e.item.name;
		},
		fnClick: function() {
			let user = {
				personname: this.personname,
				cardname: this.cardname,
				listname: this.listname,
			};

			//做校验
			let validResult = this.$mtValidation.valid(user, this.rules);
			if (!validResult) {
				return;
			}
			uni.showToast({
				title: '修改成功',
				duration: 1500,
				icon: 'none'
			});
			setTimeout(function() {
				uni.navigateBack({
					url: '/pages/person/person'
				});
			}, 2000);
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
	font-size: 10rpx;
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
