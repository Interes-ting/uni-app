<template>
	<view class="mt-body">


		<view class="mt-in">
			<view class="mt-input">
				<view class="mt-input-img">
					<view class="mt-loginimge">密码:</view>

				</view>
				<view class="mt-input-input">
					<input :type="inputType" class="uni-input" v-model.trim="pwd" placeholder="输入您的旧密码" />
				</view>
				<text class='cuIcon-attentionforbid text-grey' style="position:absolute;right:60rpx;" v-if="eye" @click="showPassword"></text>
				<view class='cuIcon-attention text-grey' style="position:absolute;right:60rpx;" @click="showPassword" v-else></view>
			</view>

		</view>
		<view class="mt-in">
			<view class="mt-input">
				<view class="mt-input-img">
					<view class="mt-loginimge">修改密码:</view>
				</view>
				<view class="mt-input-input">
					<input :type="inputType1" class="uni-input" v-model.trim="newpwd" placeholder="输入您的新密码" />
				</view>
				<text class='cuIcon-attentionforbid text-grey' style="position:absolute;right:60rpx;" v-if="eye1" @click="showPassword1"></text>
				<view class='cuIcon-attention text-grey' style="position:absolute;right:60rpx;" @click="showPassword1" v-else></view>
			</view>
		</view>
		<view class="mt-in">
			<view class="mt-input">
				<view class="mt-input-img">
					<view class="mt-loginimge">确认密码:</view>
				</view>
				<view class="mt-input-input">
					<input :type="inputType2" class="uni-input" v-model.trim="confirmpwd" placeholder="再次确认您的新密码" />
				</view>
				<text class='cuIcon-attentionforbid text-grey' style="position:absolute;right:60rpx;" v-if="eye2" @click="showPassword2"></text>
				<view class='cuIcon-attention text-grey' style="position:absolute;right:60rpx;" @click="showPassword2" v-else></view>
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
				eye: true,
				inputType: 'password', //输入框类型
				eye1: true,
				inputType1: 'password', //输入框类型
				eye2: true,
				inputType2: 'password', //输入框类型
				pwd: "",
				newpwd: "",
				confirmpwd: "",
				merchantCode: '',
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
		onLoad() {
			this.registrationtwo();
		},
		methods: {
			showPassword: function() { /*密码显示 */

				if (this.eye) {
					this.eye = false
					this.inputType = 'text'
				} else {
					this.eye = true
					this.inputType = 'password'
				}
			},
			showPassword1: function() { /*密码显示 */
				if (this.eye1) {
					this.eye1 = false
					this.inputType1 = 'text'
				} else {
					this.eye1 = true
					this.inputType1 = 'password'
				}
			},
			showPassword2: function() { /*密码显示 */
				if (this.eye2) {
					this.eye2 = false
					this.inputType2 = 'text'
				} else {
					this.eye2 = true
					this.inputType2 = 'password'
				}
			},
			registrationtwo() {
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

			registration() {
				this.pwd = this.pwd.replace(/[, ]/g, '');
				this.newpwd = this.newpwd.replace(/[, ]/g, '');
				this.confirmpwd = this.confirmpwd.replace(/[, ]/g, '');
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
				let that = this;
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

	page {
		height: 100%;
		background: #000000;
		;
	}

	.uni-input {
		display: flex;
		width: 90%;
		font-size: 25rpx;
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
		height: 78rpx;
		line-height: 78rpx;
		width: 150rpx;
		margin-top: 2rpx;
		margin-left: 15rpx;
		margin-right: 10rpx;
		float: left;
		text-align: left;
		color: #000000;

	}

	uni-view {
		display: flex;
	}

	.mt-input {
		height: 78rpx;
		line-height: 78rpx;
		width: 100%;
		margin: 0 0 10rpx 0;
		background-color: #fff;
		display: flex;

	}

	.mt-body {
		display: block;
		height: 100%;
		background-color: #F8F8F8;
		background-size: 100% 100%;
	}

	.mt-size {
		width: 100%;
		text-align: center;
		font-size: 25rpx;
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
		height: 78rpx;

		font-size: 30rpx;
		margin: 20% 0;
	}

	.mt-loginbutndl {
		width: 70%;
		border-radius: 40rpx;
		background: linear-gradient(to bottom, #6FAFFF, #1880FF);
		/*设置按钮为渐变颜色*/
	}
</style>
