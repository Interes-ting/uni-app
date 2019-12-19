<template>
	<view class="mt-body account-body">
		<view class="mt-zwf">

		</view>
		<view class="mt-uers">忘记密码</view>
		<view class="mt-back">
			<view class="mt-in padin">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge mtfa mt-avatar"></view>
					</view>
					<view class="mt-input-input">
						<input class="uni-input" v-model="account" placeholder="输入您的手机号码" />
					</view>
				</view>
			</view>

			<view class="mt-in">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge mtfa mt-suo"></view>
					</view>
					<view class="mt-input-input">
						<input password="false" class="uni-input" v-model="newpwd" placeholder="输入您的密码" />
					</view>
				</view>
			</view>
			<view class="mt-in">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge mtfa mt-suo"></view>
					</view>
					<view class="mt-input-input">
						<input password="false" class="uni-input" v-model="confirmpwd" placeholder="再次确认密码" />
					</view>
				</view>
			</view>

			<view class="mt-in yz">
				<view class="mt-input yz">
					<view class="mt-boder">
						<view class="mt-input-img">
							<view class="mt-loginimge"></view>
						</view>
						<view class="mt-input-input mt-yz">
							<input class="uni-input" v-model="code" maxlength="6" placeholder=" " />
						</view>
					</view>
					<view class="mt-input-img mt-yz">
						<!-- <view class="mt-loginimge"   @click="getAuthCode">获取验证码</view> -->
						<view v-if="showtime===null" class="mt-loginimge" @click="send">获取验证码</view>
						<view v-else class="captcha-button">{{showtime}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mt-loginbutn">
			<button class="mt-loginbutndl" @click="registration" type="primary">确认</button>
		</view>
		<view class="mt-loginbutn">
			<button class="mt-loginbutndl" type="primary" @click="logindex">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: "",
				newpwd: "",
				confirmpwd: "",
				code: '',
				rules: {
					account: [{
							//必填
							type: "require",
							msg: "请输入手机号"
						},
						{
							//正则
							type: "regexp",
							regexp: /^1[023456789]\d{9}$/,
							msg: "请输入11位正确手机号码"
						}
					],
					newpwd: [{
						//必填
						type: "require",
						msg: "请输入密码"
					}, {
						//正则
						type: "regexp",
						regexp: /[0-9A-Za-z]{6,20}/,
						msg: "请输入6~20个字符"
					}],
					confirmpwd: [{
						//必填
						type: "require",
						msg: "请再次输入密码"
					}, {
						//正则
						type: "regexp",
						regexp: /[0-9A-Za-z]{6,20}/,
						msg: "请输入6~20个字符"
					}],
					code: [{
						//必填
						type: "require",
						msg: "请输入验证码"
					}],
				},
				// 计时器,注意需要进行销毁
				timeCounter: null,
				// null 则显示按钮 秒数则显示读秒
				showtime: null
			}
		},
		methods: {
			logindex: function() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			// 倒计时显示处理
			countDownText(s) {
				this.showtime = `${s}s后重新获取`
			},
			//倒计时 60秒 不需要很精准
			countDown(times) {
				const self = this;
				// 时间间隔 1秒
				const interval = 1000;
				let count = 0;
				self.timeCounter = setTimeout(countDownStart, interval);

				function countDownStart() {
					if (self.timeCounter == null) {
						return false;
					}
					count++
					self.countDownText(times - count + 1);
					if (count > times) {
						clearTimeout(self.timeCounter)
						self.showtime = null;
					} else {
						self.timeCounter = setTimeout(countDownStart, interval)
					}
				}
			},
			send() {
				var ze = /^1[023456789]\d{9}$/;
				let user = {
					phone: this.account
				}
				
				if (this.account == '') {
					uni.showToast({
						title: "请输入手机号!",
						icon: "none"
					});
				} else if (!ze.test(this.account)) {
					uni.showToast({
						title: "请输入11位正确手机号码!",
						icon: "none"
					});
				} else {
					//防重复
					if (this.$mtRequest.isRepeat()) {
						return;
					}
					this.countDown(60);
					//发送验证码
					let that = this;
					
					this.$mtRequest.get(this.$mtConfig.getPersonUrl("api/emh/account/ret_validcode"),user,
						function(data) {
							if (data.state > 0) {
								//密码重置
								uni.showToast({
									title: "验证码已经发送"
								})
							} else {
								//登录失败
								uni.showToast({
									title: data.message,
									icon: "none"
								})

							}

							//结束请求
							that.$mtRequest.stop();
						})
				}
			},
			registration() {
				let verificacode = {
					account: this.account,
					newpwd: this.newpwd,
					confirmpwd: this.confirmpwd,
					code: this.code,
				}
				//做校验
				let validResulttwo = this.$mtValidation.valid(verificacode, this.rules);
				if (!validResulttwo) {
					return;
				} else if (this.newpwd != this.confirmpwd) {
					uni.showToast({
						title: "两次密码输入不一致!",
						icon: "none"
					});
				} else {
					//防重复
					if (this.$mtRequest.isRepeat()) {
						return;
					}
					//忘记密码
					let that = this;
					this.$mtRequest.post(this.$mtConfig.getPersonUrl("api/emh/account/retrieve"), verificacode, function(data) {
						if (data.state > 0) {
							//密码重置
							uni.showToast({
								title: "密码已重置",
								success: function() {
									setTimeout(function() {
										uni.navigateTo({
											url: '../login/login'
										});

									}, 2000)
								}
							})
						} else {
							//密码重置失败
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
		},

	}
</script>

<style>
	.mt-inputcdy{
		width: 80%;
		margin: 0 auto;
		border: 0.66rpx solid #007AFF;
		border-radius:40rpx;
	}
	.mt-zwf {
		height: 60rpx;
		width: 100%;
	}

	.mt-back {
		width: 90%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 26rpx;
		padding: 0 0 15% 0;
	}

	uni-page-body {
		height: 100%;
	}

	page {
		height: 100%;
	}

	.mt-body {
		display: block;
		height: 100%;
	}

	.mt-in.padin {
		padding: 5% 0 0 0;
	}

	.mt-in.mtin {
		padding: 0 0 50rpx 0;
	}

	/* 确认按钮宽度 */
	.mt-loginbutn {
		width: 70%;
		height: 78rpx;
		margin: 0 15%;
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

	.mt-uers {
		color: #FFFFFF;
		font-size: 50rpx;
		widows: 100%;
		text-align: center;
		font-weight: 500;
		margin: 6% 0 13% 0;
		height: 50rpx;
	}

	.mt-registration,
	.mt-forget {
		font-size: 12rpx;
		color: #FFFFFF;
		float: left;
		width: 50%;
	}

	.mt-loginimge {
		width: 100%;
		height: 100%;
	}

	.mt-in {
		text-align: center;
		width: 100%;
		margin-top: 20rpx;
	}

	.uni-input {
		width: 80%;
		height: 78rpx;
		line-height: 78rpx;
	}


	.uni-input-placeholder {
		color: #CCCCCC;
	}

	/* 验证码外部框宽度 */
/* 	.mt-input-input.mt-yz {

		float: left;
	} */

	/* 验证码输入框 */
	.mt-input-img.mt-yz {
		width: 40%;
		display: flex;
		margin: 0;
		font-size: 24rpx;
		height: 78rpx;
		line-height: 78rpx;
		background-color: #5ba4ff;
		border-top-right-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		color: #FFFFFF;
		border: 1px solid #5ba4ff;
	}

	.mt-input.yz {
		border: 0;
	}

	.mt-boder {
		width: 60%;
		height: 78rpx;
		float: left;
		border-top-left-radius: 40rpx;
		border: 1px solid #CCCCCC;
		border-bottom-left-radius: 40rpx;
		display: flex;
	}

	.mt-input-img {
		height: 50rpx;
		width: 50rpx;
		margin-left: 35rpx;
		margin-right: 15rpx;
		color: #CCCCCC;
	}

	.mt-input-input {
		height: 78rpx;
		line-height: 78rpx;
		text-align: left;
		width: 100%;

	}

	.mt-input {
		height: 78rpx;
		line-height: 78rpx;
		width: 80%;
		margin: 0 10%;
		border-radius: 40rpx;
		border: 1rpx solid #CCCCCC;
		display: flex;
	}
</style>
