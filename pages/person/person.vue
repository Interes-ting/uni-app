<template>
	<view class="backco">
		<view class="person-head">
			<cmd-avatar src="../../static/头像.jpg" size="lg" :make="{ 'background-color': '#fff' }"></cmd-avatar>
			<view class="person-head-box">
				<view class="person-head-nickname">{{companyLegalPerson}}</view>
				<view class="person-head-username">{{merchantName}}</view>
				<view class="person-head-username">{{phone}}</view>
			</view>
		</view>
		<view class="person-list">
			<cmd-cell-item title="用户资料" slot-left arrow @click="fnInfoWin(information)"><image src="../../static/订单.png" class="imgs"></image></cmd-cell-item>
			<cmd-cell-item title="车辆信息" slot-left arrow><image src="../../static/货车.png" class="imgs"></image></cmd-cell-item>
			<cmd-cell-item title="关于我们" slot-left arrow><image src="../../static/关于我们.png" class="imgs"></image></cmd-cell-item>
			<cmd-cell-item title="建议反馈" slot-left arrow @click="Feedback(information)"><image src="../../static/建议反馈.png" class="imgs"></image></cmd-cell-item>
			<cmd-cell-item title="系统设置" slot-left arrow @click="Setting(information)"><image src="../../static/设置.png" class="imgs"></image></cmd-cell-item>
			<cmd-cell-item title="我的银行卡" slot-left arrow @click="Bankedit(information)"><image src="../../static/银行卡.png" class="imgs"></image></cmd-cell-item>
		</view>
		<!-- 底部导航栏 -->
		<view class="cu-bar tabbar bg-white mt-tabbar">
			<view class="action" @click="goIndex">
				<view class="mtfa mt-shouye mt-tabbar-item"></view>
				<view class="text-grey">首页</view>
			</view>
			<view class="action" @click="goThrow">
				<view class="mtfa mt-daochu mt-tabbar-item"></view>
				<view class="text-gray">扔单</view>
			</view>
			<view class="action" @click="goWallet">
				<view class="mtfa mt-qianbao mt-tabbar-item"></view>
				<view class="text-gray">收益</view>
			</view>
			<view class="action">
				<view class="mtfa mt-person mt-tabbar-item  text-blue"></view>
				<view class="text-blue">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
import cmdAvatar from '@/components/cmd-person/cmd-avatar/cmd-avatar.vue';
import cmdIcon from '@/components/cmd-person/cmd-icon/cmd-icon.vue';
import cmdCellItem from '@/components/cmd-person/cmd-cell-item/cmd-cell-item.vue';

export default {
	components: {
		cmdAvatar,
		cmdCellItem,
		cmdIcon
	},
	data() {
		return {
			phone:'',
			merchantName:'',
			companyLegalPerson:'',
			information:'',
		};
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
				that.phone = data.data.phone;
				that.merchantName = data.data.merchantName;
				that.companyLegalPerson = data.data.companyLegalPerson;
				that.information = data.data;
				//结束请求
				that.$mtRequest.stop();
			});
		},
		goIndex: function() {
			//首页
			uni.navigateTo({
				url: '../index/index'
			});
		},
		goThrow: function (){
			//扔单
			 uni.navigateTo({
			     url: "../order/throw"
			 });
		},
		goWallet: function() {
			//收益
			uni.navigateTo({
				url: '../wallet/wallet'
			});
		},
		fnInfoWin: function(information) { 
			
			 let url = '/pages/person/personInfo'  
			 let person = information;
			 this.$navTo.togo(url,person);
		},
		Bankedit: function(information) {
			
			 let url = '/pages/bank/bankEdit'  
			 let person = information;
			 this.$navTo.togo(url,person);
		},
		Setting: function(information) {
			
			 let url = '/pages/setting/setting'  
			 let person = information;
			 this.$navTo.togo(url,person);
		},
		Feedback: function(information) {
			
			 let url = '/pages/feedback/feedback'  
			 let person = information;
			 this.$navTo.togo(url,person);
		},
	}
};
</script>

<style>
.backco {
	background: linear-gradient(to right, #4752e8, #4987ee);
}
.imgs {
	height: 111.33rpx;
	width: 111.33rpx;
}

.person-head {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 333.33rpx;
	padding-top: 43.33rpx;
}

.person-head-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

.person-head-nickname {
	font-size: 32rpx;
	font-weight: 500;
	color: #fff;
	margin: 20rpx auto 0rpx;
}

.person-head-username {
	font-size: 28rpx;
	font-weight: 500;
	color: #fff;
	margin: 3rpx auto;
	padding-top: 2rpx;
}

.person-list {
	background-color: #fff;
	line-height: 0;
	border-top-right-radius: 70rpx;
	border-top-left-radius: 70rpx;
	padding-top: 6.66rpx;
	margin-bottom: 80rpx;
}
</style>
