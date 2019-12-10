<template>
	<view>
		<cmd-nav-bar back title="银行卡"></cmd-nav-bar>
		<view class="topka">
			<view class="sheet">
				<view class="titlee">持卡人</view>
				<input type="text" placeholder="请输入持卡人真实姓名" placeholder-class="place" />
			</view>
			<view class="sheet">
				<view class="titlee">银行卡号</view>
				<input type="text" placeholder="请输入银行卡账号" placeholder-class="place" />
			</view>
			<view class="sheet">
				<view class="titlee">开户行</view>
				<input type="text" placeholder-class="place" disabled="ture" @click="onindexed" v-model="listname"/>
			</view>
			<button class="btn-logout" @click="fnClick" >立刻绑定</button>
			<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"  v-show="bankname"/>
		</view>
	</view>
</template>

<script>
import cmdNavBar from '@/components/cmd-person/cmd-nav-bar/cmd-nav-bar.vue';
import airport from '@/common/airport.js';
import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue';

export default {
	components: {
		cmdNavBar,
		uniIndexedList
	},

	data() {
		return {
			listname:'',
			list: airport.list,
			bankname:false,
		};
	},
	methods: {
		onindexed(){
			this.bankname=true;
		},
		bindClick(e) {
			this.bankname=false;
			this.listname= e.item.name;
		},
		fnClick() {
			uni.navigateBack({
				url:'/pages/person/person'
			})
		}
	}
};
</script>

<style>

.topka {
	padding-top: 40rpx;
}

.sheet {
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
	line-height: 100rpx;
	padding: 0 30rpx;
	width: 30%;
}

input {
	width: 70%;
	margin-top: 27rpx;
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
