<!-- 我的扔单详情 -->
<template>
	<view class="">
		<view class="oderList-content heis">
			
			<view class="mt-cardtwo" v-if="list!=null">
				<!-- 订单详情 -->
				<view class="mt-oderinfo">
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">提现金额：{{list.amount}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">联系电话：{{list.phone}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">申请时间：{{list.applyTime}}</text>
					</view>
					<view class="mt-startcity" >
						<view class="mt-placebox"></view>
						<text class="text-grey">提现卡号：{{list.cardNo}}</text>
					</view>
					
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">提现开户行：{{list.cardBank}}</text>
					</view>
					<view class="mt-startcity">
						<view class="mt-placebox"></view>
						<text class="text-grey">提现人姓名：{{list.names}}</text>
					</view>
				
					
				</view>
				
			</view>
		</view>
	</view>
	
	
</template>

<script>
export default {
	data() {
		return {
			names:'',
			oderList:null,
			list:'',
		};
	},
	onLoad(ddd) {
		//初始查询
		
		this.co = ddd;
		console.log(this.co)
		this.earnings();
		
	},
	methods: {
		// 收益
		earnings() {
			let merchantInfoId = this.$mtAccount.info().merchantInfoId
			console.log(merchantInfoId)
			// let that=this;
			this.$mtRequest.get(this.$mtConfig.getPlatformUrl("api/balancein/selecBalanceOut"),{id:this.co.ddd}, (data) => {
				if (data.state > 0) {
					this.list = data.data
				console.log(data.data)
				} else {
					//登录失败
					uni.showToast({
						title: data.message,
						icon: "none"
					})
				}
		
				//结束请求
				this.$mtRequest.stop();
			})
		},
			//支出
		earningstwo() {
			let merchantInfoId = this.$mtAccount.info().merchantInfoId
			// let that=this;
			this.$mtRequest.get(this.$mtConfig.getPlatformUrl("api/balancein/selecBalanceOut"), {id:merchantInfoId}, (data) => {
				console.log(data.data)
				if (data.state > 0) {
					this.list = data.data
				} else {
					//登录失败
					uni.showToast({
						title: data.message,
						icon: "none"
					})
				}
		
				//结束请求
				this.$mtRequest.stop();
			})
		},
	}
};
</script>

<style lang="scss" scoped>
.mt-kehuname {
		display: flex;
		margin: 0rpx 40rpx;
		padding: 20rpx 0rpx;
		
		.mt-name {
			display: flex;
			flex-flow: column;
			line-height: 80rpx;
			.mt-textphone {
				width: 400rpx;
			}
		}
		.mtfa {
			font-size: 60rpx;
			color: #37932A;
			margin-right: 30rpx;
		}
		.mt-callphone {
			flex: 1;
			text-align: right;
		}
	}
	.mt-kehuphone {
		text-indent: 40rpx;
		font-size: 30rpx;
		color: #ff571d;
		font-weight: 900;
		letter-spacing: 5rpx;
		padding: 20rpx 0rpx;
	}
	.text-remark-text {
		flex: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: inline-block;
		width: 100%;
		height: 100;
	}
	.text-remark {
		display: inline-block;
		width: 120rpx;
	}
	
	.oderList-content {
		padding: 20rpx;
	
		color: #333333;
	}
	.space {
		letter-spacing: 6.66rpx;
	}
	.bold {
		font-weight: 700;
		font-size: 32rpx;
	}
	.text-grey {
		color: #999999;
		font-size: 25.52rpx;
	}
	.mt-card {
		position: relative;
		padding: 13.33rpx;
		background-color: #ffffff;
		box-shadow: 0px 0px 25.33rpx 0px rgba(0, 0, 0, 0.08);
		border-radius: 13.33rpx;
		.mt-city {
			padding-top: 13.33rpx;
		}
		.mt-startcity {
			display: block;
			line-height: 50rpx;
			width: 100%;
			font-size: 25.52rpx;
			.mtfa {
				display: inline-block;
				font-size: 26.66rpx;
				margin-right: 10rpx;
			}
			.mt-placebox {
				display: inline-block;
				width: 36.66rpx;
			}
		}
		.mt-viewbutton {
			position: absolute;
			right: 26.66rpx;
			bottom: 20rpx;
			width: 124rpx;
			height: 53.33rpx;
			line-height: 53.33rpx;
			background: linear-gradient(to bottom, #1880ff, #509eff);
			/*设置按钮为渐变颜色*/
			border-radius: 26.66rpx;
			font-size: 24rpx;
			color: #ffffff;
		}
	}
	.mt-oderinfo {
		padding: 13.33rpx 0rpx;
	}
</style>
