<template>
	<view class="mt-body">
		<view class="mt-uers">用户登录</view>
		<view class="mt-in padin">
			<view class="mt-input">
				<view class="mt-input-img">
					<view  class="mt-loginimge"  >1</view>
				</view>
				<view class="mt-input-input">
					<input class="uni-input" @input="onKeyInput" placeholder="输入用户手机号码" />
				</view>
			</view>
		</view>
		<view class="mt-in">
			<view class="mt-input">
				<view class="mt-input-img">
					<view  class="mt-loginimge"  >2</view>
				</view>
				<view class="mt-input-input">
					<input class="uni-input" @input="onKeyInput" placeholder="输入用户手机号码" />
				</view>
			</view>
		</view>
		<view class="mt-in mtin">
			<view class="mt-registration">
				新用户注册
			</view>
			<view class="mt-forget">
				忘记密码?
			</view>
		</view>
		<view class="mt-loginbutn">
			 <button class="mt-loginbutndl" type="primary">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	uni-page-body{
		height: 100%;
	}
	.mt-body{
		display: block;
		height: 100%;
			background-image: url('~@/static/sylog.png') ;
			background-size: 100% 100%;
	}
	.mt-in.padin{
		padding: 35% 0 0 0;
	}
	.mt-in.mtin{
		padding: 0 0 50px 0;
	}
	.mt-loginbutn{
		width: 80%;
		height: 88rpx;
		margin: 0 10%;
		border: 20;
		font-size: 15px;
		font-weight: 400;
		margin: 10%;
		padding: 5% 0 0 0;
	}
	.mt-loginbutndl{
		border-radius: 20px;
		background:linear-gradient(to bottom, #6FAFFF,#1880FF);/*设置按钮为渐变颜色*/
	}
	.mt-uers{
		color: #FFFFFF;
		font-size: 17px;
		widows: 100%;
		text-align: center;
		font-weight: 500;
		padding: 3% 0 0 0;
	}
	.mt-registration,.mt-forget{
		font-size: 12rpx;
		color: #FFFFFF;
		float: left;
		width: 50%;
	}
	.mt-loginimge{
		width: 100%;
		height: 100%;
	}
	
.mt-in{
	text-align: center;
	width: 100%;
	margin-top: 20px;
}
.uni-input{
	    display: inline-flex;
		width: 80%;
}
.mt-input{
	height: 88rpx;
	line-height: 80rpx;
	width: 80%;
	margin: 0 10%;
	border-radius: 20px;
	border: 1px solid #FFFFFF;
}
.mt-input-img{
	height: 50rpx;
	width: 50rpx;
	margin-top: 2px;
	margin-left: 15px;
	margin-right: 10px;
	float: left;
	color: #FFFFFF;
}
.mt-input-input{
	height: 88rpx;
	line-height: 88rpx;
	text-align: left;
	width: 100%;
	
}
.uni-input-placeholder{
	color: #F1F1F1;
}
</style>
