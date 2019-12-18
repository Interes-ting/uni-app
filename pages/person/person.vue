<template>
	<view class="backco">
		<view class="person-head">
			<cmd-avatar src="/static/person/portrait.jpg" size="lg" :make="{ 'background-color': '#fff' }"></cmd-avatar>
			<view class="person-head-box">
				<view class="person-head-nickname">{{merchantName}}</view>
				<view class="person-head-nickname">{{phone}}</view>
			</view>
		</view>
		<view class="person-list">
			<cmd-cell-item title="用户资料" slot-left arrow @click="fnInfoWin(information)"><image src="/static/person/order.png" class="imgs"></image></cmd-cell-item>
			<cmd-cell-item title="我的银行卡" slot-left arrow @click="Bankedit(information)"><image src="/static/person/bankcard.png" class="imgs"></image></cmd-cell-item>
			<!-- <cmd-cell-item title="车辆信息" slot-left arrow ><image src="/static/person/trucks.png" class="imgs"></image></cmd-cell-item>	 -->
			<cmd-cell-item title="建议反馈" slot-left arrow @click="Feedback(information)"><image src="/static/person/feedback.png" class="imgs"></image></cmd-cell-item>
			<!-- <cmd-cell-item title="关于我们" slot-left arrow><image src="/static/person/about.png" class="imgs"></image></cmd-cell-item> -->
			<cmd-cell-item title="联系客服" slot-left arrow @click="Service(information)"><image src="/static/person/service.png" class="imgs"></image></cmd-cell-item>
			<cmd-cell-item title="系统设置" slot-left arrow @click="Setting(information)"><image src="/static/person/set.png" class="imgs"></image></cmd-cell-item>
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
	onShow(){
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
		Service: function(information) {
			 let url = '/pages/service/service'  
			 let person = information;
			 this.$navTo.togo(url,person);
		},
	}
};
</script>

<style>
page{
	background-color: #FFFFFF !important;
}
.backco {
	background: linear-gradient(to right, #4752e8, #4987ee);
}
.imgs {
	height: 89.33rpx;
	width: 89.33rpx;
}

.person-head {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 333.33rpx;
	padding-top: 43.33rpx;
}

.person-head-box {
	padding-top: 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

.person-head-nickname {
	font-size: 30rpx;
	font-weight: 500;
	color: #fff;
	margin: auto;
}

.cmd-cell-item-left{
	margin: 20rpx 32rpx !important;
}

.person-list {
	background-color: #FFFFFF;
	line-height: 0;
	border-top-right-radius: 70rpx;
	border-top-left-radius: 70rpx;
	padding-top: 6.66rpx;
}
</style>
