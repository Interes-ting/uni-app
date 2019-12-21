<template>
	<view class="mt-body">
		
		
		<view class="mt-in">
			<view class="mt-input">
				<view class="mt-input-img">
					<view class="mt-loginimge">密码:</view>
				</view>
				<view class="mt-input-input">
					<input password="false" class="uni-input" v-model.trim="pwd" placeholder="输入您的旧密码" />
				</view>
			</view>
		</view>
		<view class="mt-in">
			<view class="mt-input">
				<view class="mt-input-img">
					<view class="mt-loginimge">修改密码:</view>
				</view>
				<view class="mt-input-input">
					<input password="false" class="uni-input" v-model.trim="newpwd" placeholder="输入您的新密码" />
				</view>
			</view>
		</view>
		<view class="mt-in">
			<view class="mt-input">
				<view class="mt-input-img">
					<view class="mt-loginimge">确认密码:</view>
				</view>
				<view class="mt-input-input">
					<input password="false" class="uni-input" v-model.trim="confirmpwd" placeholder="再次确认您的新密码" />
				</view>
			</view>
		</view>
		<view class="mt-loginbutn">
			<button class="mt-loginbutndl" @click="registration" type="primary">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				pwd: "",
				newpwd: "",
				confirmpwd: "",
				merchantCode:'',
				rules: {
					pwd: [{
						//必填
						type: "require",
						msg: "请输入旧密码"
					}, {
						//正则
						type: "regexp",
						regexp: /[0-9A-Za-z]{6,20}/,
						msg: "请输入6~20位旧密码，不含特殊符号"
					}, {
						//正则
						type: "regexp",
						regexp: this.$mtRegexp.numAndStr,
						msg: "请输入6~20位旧密码，不含特殊符号"
					}],
					newpwd: [{
						//必填
						type: "require",
						msg: "请输入新密码"
					}, {
						//正则
						type: "regexp",
						regexp: /[0-9A-Za-z]{6,20}/,
						msg: "请输入6~20位新密码，不含特殊符号"
					}, {
						//正则
						type: "regexp",
						regexp: this.$mtRegexp.numAndStr,
						msg: "请输入6~20位新密码，不含特殊符号"
					}],
					confirmpwd: [{
						//必填
						type: "require",
						msg: "请再次输入新密码"
					}, {
						//正则
						type: "regexp",
						regexp: /[0-9A-Za-z]{6,20}/,
						msg: "请再次输入6~20位新密码，不含特殊符号"
					}, {
						//正则
						type: "regexp",
						regexp: this.$mtRegexp.numAndStr,
						msg: "请再次输入6~20位新密码，不含特殊符号"
					}],
				}
			}
		},
		onLoad(){
			this.registrationtwo();
		},
		methods: {
			registrationtwo(){
					let merchantInfoId = this.$mtAccount.info().merchantInfoId
					// let that=this;
					this.$mtRequest.post(this.$mtConfig.getPlatformUrl("api/merchant_info/selectUser"), {
						merchantId: merchantInfoId
					}, (data) => {
						if (data.state > 0) {
							console.log(data.data)
							this.merchantCode = data.data.merchantCode;
							console.log(this.merchantCode)
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
			
			registration(){
				let user = {
					pwd: this.pwd,
					newpwd: this.newpwd,
					confirmpwd: this.confirmpwd,
					account: this.merchantCode,
				}
				//做校验
				let validResult = this.$mtValidation.valid(user, this.rules);
				if (!validResult) {
					return;
				}
				
				//修改密码
				let that=this;
				//防重复
				if (this.$mtRequest.isRepeat()) {
					return;
				}
				this.$mtRequest.post(this.$mtConfig.getPersonUrl("api/emh/account/modify"), user, function(data) {
					if (data.state > 0) {
						//修改密码
						uni.showToast({
							title: "密码修改成功",
							success: function() {
								setTimeout(function() {
									uni.navigateTo({
										url: '../login/login'
									});
								}, 2000)
							}
						})
					} else {
						//修改密码失败
						uni.showToast({
							title: data.message,
							icon: "none"
						})
					}
				
					//结束请求
					that.$mtRequest.stop();
				})
			}
		}
	}
</script>

<style>
	.mt-in {
		text-align: center;
		width: 100%;
		
	}
	page{
		height: 100%;
		background: #000000;;
	}
	.uni-input {
		display: flex;
		width: 70%;
		font-size: 30rpx;
		height: 78rpx;
		line-height: 78rpx;
	}
	.mt-input-input {
		height: 78rpx;
		line-height: 78rpx;
		text-align: left;
		width: 100%;
	background-color: #FFFFFF;
	
	}
	.mt-input-img {
		height: 50rpx;
		width: 150rpx;
		margin-top: 2rpx;
		margin-left: 15rpx;
		margin-right: 10rpx;
		float: left;
		text-align: left;
		color: #000000;
		
	}
	.mt-input {
		height: 78rpx;
		line-height: 78rpx;
		width: 100%;
		margin: 0 0 10rpx 0;
		
	
	}
	.mt-body{
		display: block;
		height: 100%;
		background-color: #F8F8F8;
		background-size: 100% 100%;
	}
.mt-size{
	width: 100%;
	text-align: center;
	font-size: 35rpx;
	font-weight: bold;
	padding: 15rpx;
	background-color: #FFFFFF;
}
uni-page-body {
		height: 100%;
		background-color: red;
	}
	/* 确认按钮宽度 */
	.mt-loginbutn {
		width: 70%;
		height: 78rpx;
		margin: 15% 15%;
		border: 20;
		font-size: 30rpx;
		font-weight: 400;
		padding: 60rpx 0 80rpx 0;
	}
	
	.mt-loginbutndl {
		border-radius: 40rpx;
		background: linear-gradient(to bottom, #6FAFFF, #1880FF);
		/*设置按钮为渐变颜色*/
	}
</style>