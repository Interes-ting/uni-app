<template>
	<view class="mt-body account-body">
		<view class="mt-zwf">

		</view>
		<view class="mt-uers">用户注册</view>
		<view class="mt-back">
			<view class="mt-in padin">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge mtfa mt-dianhua"></view>
					</view>
					<view class="mt-input-input">
						<input class="uni-input" v-model="phone" placeholder="输入用户手机号码" />
					</view>
				</view>
			</view>

			<view class="mt-in">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge mtfa mt-gongsi"></view>
					</view>
					<view class="mt-input-input">
						<input class="uni-input" v-model="merchantName" placeholder="输入您的公司名称" />
					</view>
				</view>
			</view>
			<view class="mt-in">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge mtfa mt-suo"></view>
					</view>
					<view class="mt-input-input">
						<input password="false" class="uni-input" v-model="pwd" placeholder="输入您的密码" />
					</view>
				</view>
			</view>
			<view class="mt-in">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge mtfa mt-suo"></view>
					</view>
					<view class="mt-input-input">
						<input password="false" class="uni-input" v-model="confirmedcode" placeholder="请再次输入您的密码" />
					</view>
				</view>
			</view>

			<view class="mt-in">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge mtfa mt-yaoqingma"></view>
					</view>
					<view class="mt-input-input">
						<input class="uni-input" v-model="yqcode" placeholder="输入邀请码" />
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
							<input class="uni-input" placeholder=" " v-model="validCode" />
						</view>
					</view>
					<view class="mt-input-img mt-yz">
						<!-- <view class="mt-loginimge"   @click="getAuthCode">获取验证码</view> -->
						<view v-if="showtime===null" maxlength="6" class="mt-loginimge" @click="send">获取验证码</view>
						<view v-else class="captcha-button">{{showtime}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mt-loginbutn">
			<button class="mt-loginbutndl" @click="registration" type="primary">注册</button>
		</view>
		<view class="mt-loginbutn">
			<button class="mt-loginbutndl" type="primary" @click="goIndex">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				//手机号
				phone: "",
				//公司名称
				merchantName: "",
				//密码
				pwd: "",
				//确认密码
				confirmedcode: "",
				//邀请码
				yqcode: "",
				phoneCode: '',
				validCode: "",
				// 计时器,注意需要进行销毁
				timeCounter: null,
				// null 则显示按钮 秒数则显示读秒
				showtime: null,
				rules: {
					phone: [{
							//必填
							type: "require",
							msg: "请输入手机号"
						},
						{
							//正则
							type: "regexp",
							regexp: /[0-9A-Za-z]{6,20}/,
							msg: "请输入6~20个字符"
						}
					],
					merchantName: [{
						//必填
						type: "require",
						msg: "请输入公司名称"
					}],

					pwd: [{
						//必填
						type: "require",
						msg: "请输入密码"
					}],
					confirmedcode: [{
						//必填
						type: "require",
						msg: "请再次输入密码"
					}],
					validCode: [{
						//必填
						type: "require",
						msg: "请输入验证码"
					}],

				}
			}
		},
		methods: {
			goIndex: function() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			// 倒计时显示处理
			countDownText(s) {
				this.showtime = `${s}s后重新获取`
			},
			countDowntw(s) {
				this.showtime = `获取验证码`
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
				var ze = /[0-9A-Za-z]{6,20}/;
				let user = {
					phone: this.phone,
				}

				if (this.phone == '') {
					uni.showToast({
						title: "请输入手机号!",
						icon: "none"
					});
				} else if (!ze.test(this.phone)) {
					uni.showToast({
						title: "请输入6~20个字符!",
						icon: "none"
					});
				} else {
					this.countDown(60);
					//发送验证码
					let that = this;
					this.$mtRequest.get(this.$mtConfig.getPersonUrl("api/emh/account/reg_validcode?phone="), user,
						function(data) {

							if (data.state > 0) {
								//登录成功
								uni.showToast({
									title: "验证码已发送"
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
					phone: this.phone,
					validCode: this.validCode,
					merchantName: this.merchantName,
					pwd: this.pwd,
					confirmedcode: this.confirmedcode,
					yqcode: this.yqcode,

				}
				//做校验
				let validResulttwo = this.$mtValidation.valid(verificacode, this.rules);
				if (!validResulttwo) {
					return;
				} else if (this.pwd != this.confirmedcode) {
					uni.showToast({
						title: "两次密码输入不一致!",
						icon: "none"
					});
				} else {
					//注册
					let that = this;
					this.$mtRequest.post(this.$mtConfig.getPersonUrl("api/emh/account/register"), verificacode, function(data) {
						if (data.state > 0) {
							//注册成功
							uni.showToast({
								title: "注册成功",
								success: function() {
									setTimeout(function() {
										uni.navigateTo({
											url: '../login/login'
										});
									}, 2000)
								}
							})
						} else {
							//注册失败
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
	.mt-zwf {
		height: 60rpx;
		width: 100%;
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

	.mt-back {
		width: 90%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 26rpx;
		padding: 0 0 8% 0;
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

	.mt-loginbutn {
		width: 70%;
		height: 78rpx;
		margin: 0 15%;
		border: 20;
		font-size: 30rpx;
		font-weight: 400;
		padding: 50rpx 0 70rpx 0;
	}

	.mt-loginbutndl {

		border-radius: 40rpx;
		background: linear-gradient(to bottom, #6FAFFF, #1880FF);
		/*设置按钮为渐变颜色*/
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
		display: inline-flex;
		width: 80%;
	}


	.uni-input-placeholder {
		color: #CCCCCC;
	}

	/* 验证码外部框宽度 */
	.mt-input-input.mt-yz {
		float: left;
	}

	/* 验证码输入框 */
	.mt-input-img.mt-yz {
		width: 40%;
		float: left;
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
		border: 1rpx solid #CCCCCC;
		display: flex;
		border-bottom-left-radius: 40rpx;
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
