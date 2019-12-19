<template>
	<view class="mt-body account-body">
		<view class="mt-uers">用户登录</view>
		<view class="mt-form">
			<view class="mt-form-row">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge  mtfa mt-avatar"></view>
					</view>
					<view class="mt-input-input">
						<input class="uni-input" placeholder-class="white-input-placeholder" placeholder="请输入手机号码" v-model.trim="account" />
					</view>
				</view>
			</view>
			<view class="mt-form-row" :style="{'margin-top': '73.33rpx'}">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge mt-xiedian mtfa mt-suo"></view>
					</view>
					<view class="mt-input-input">
						<input password="false" class="uni-input" placeholder-class="white-input-placeholder" placeholder="请输入账户密码"
						 v-model="password" />
					</view>
				</view>
			</view>

			<view class="mt-form-row" :style="{'margin-top':'34rpx'}">
				<view class="flex justify-between" :style="{'width': '466.66rpx'}">
					<view class="mt-registration" @click="regdex">
						新用户注册
					</view>
					<view class="mt-forget" @click="forgetdex">
						忘记密码?
					</view>
				</view>
			</view>
			<view class="mt-form-row" :style="{'margin-top':'143.33rpx'}">
				<button class="mt-loginbutn" type="primary" @click="loginbtn">登录</button>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<block v-if="privacyShow">
			<view class="cu-modal show">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">用户隐私说明</view>
					</view>
					<view class="padding-xl bg-white">
						感谢您下载并使用轻松搬家平台APP
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  text-green  solid-left " @tap="privacyPass">我同意并继续使用</view>
					</view>
				</view>
			</view>
		</block>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: "",
				password: "",
				rules: {
					account: [{
						//必填
						type: "require",
						msg: "请输入账号"
					}, {
						//正则
						type: "regexp",
						regexp: /^1[023456789]\d{9}$/,
						msg: "请输入11位正确手机号码"
					}],
					password: [{
						//必填
						type: "require",
						msg: "请输入密码"
					}, {
						//正则
						type: "regexp",
						regexp: /[0-9A-Za-z]{6,20}/,
						msg: "请输入6~20位密码"
					}, {
						//正则
						type: "regexp",
						regexp: this.$mtRegexp.numAndStr,
						msg: "请输入6~20位密码，不含特殊符号"
					}]
				},
				// #ifdef APP-PLUS
				privacyShow: false,
				// #endif
				// #ifdef MP-WEIXIN
				openId: ""
				// #endif
			}
		},
		onLoad: function() {
			// #ifdef APP-PLUS
			this.privacyValid();
			// #endif
			// #ifdef MP-WEIXIN
			this.getOpenId();
			// #endif
		},
		onReady: function() {
			//自动登录 
			let accountInfo = this.$mtAccount.info();
			if (accountInfo) {
				this.account = accountInfo.account;
				this.password = accountInfo.password;
				setTimeout(() => {
					this.loginbtn();
				}, 1000)
			}
		},
		methods: {
			regdex: function() {
				uni.navigateTo({
					url: '../account/register?id=1'
				})
			},
			forgetdex: function() {
				uni.navigateTo({
					url: '../account/forget?id=1'
				})
			},
			loginbtn: function() {
				let user = {
					account: this.account,
					password: this.password
				}
				// #ifdef APP-PLUS
				this.versionCheck(() => {
					if (!this.privacyValid()) {
						return;
					}
					this.login(user);
				})
				//#endif
				// #ifdef MP-WEIXIN
				if (this.openId) {
					user.openId = this.openId;
					this.login(user);
				} else {
					this.getOpenId(function() {
						uni.showToast({
							title: "登录失败，请重试",
							icon: "none"
						})
					});
				}
				// #endif
				// #ifdef H5
				this.login(user);
				// #endif
			},
			login: function(user) {
				//做校验
				let validResult = this.$mtValidation.valid(user, this.rules);
				if (!validResult) {
					return;
				}
				
				//请求登录
				this.$mtAccount.login(user, function() {
					setTimeout(function() {
						uni.switchTab({
							url: '../index/index'
						});
					}, 2000)
				})
			},
			// #ifdef APP-PLUS
			/**
			 * 版本校验
			 * 有新的版本返回true，否则返回false
			 */
			versionCheck(callback) {

				this.$mtRequest.get(this.$mtConfig.getPlatformUrl("api/application/app_person_version"), {}, (data) => {
					//结束请求
					this.$mtRequest.stop();

					if (data.state > 0) {
						var newVersion = Number(data.message);
						if (newVersion > this.$mtConfig.version) {
							uni.showModal({
								title: '',
								content: '有新的版本更新',
								showCancel: false,
								confirmText: "更新",
								success: function(res) {
									if (plus.os.name == "Android") {
										plus.runtime.openURL("http://m.pp.cn/detail.html?appid=8063301&ch_src=pp_dev&ch=default");
									} else {
										plus.runtime.openURL(
											"https://apps.apple.com/cn/app/%E8%BD%BB%E6%9D%BE%E6%90%AC%E5%AE%B6%E5%B9%B3%E5%8F%B0/id1478611275");
									}
								}
							});
						} else {
							callback();
						}
					}
				})

			},
			//校验是否同意用户隐私协议
			privacyValid() {
				if (uni.getStorageSync("privacy")) {
					this.privacyShow = false;
					return true;
				} else {
					this.privacyShow = true;
					return false;
				}
			},
			privacyPass() {
				uni.setStorageSync("privacy", "1");
				this.privacyShow = false;
			},
			// #endif
			// #ifdef MP-WEIXIN
			getOpenId(callback) {
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						if (loginRes.code) {
							this.$mtRequest.get(this.$mtConfig.getPlatformUrl("api/wechat/code2Session"), {
								code: loginRes.code
							}, result => {
								this.openId = result.data.openid;
								//结束请求
								this.$mtRequest.stop();
								//回调
								if (callback) {
									callback();
								}
							})
						}
					}
				});
			}
			// #endif
		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.mt-body {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mt-uers {
		position: absolute;
		top: var(--status-bar-height);
		padding-top: 33.33rpx;
		width: 100%;
		text-align: center;
		color: #FFFFFF;
		font-size: 50rpx;
		font-weight: 500;
	}

	.mt-form {
		display: flex;
		flex-direction: column;
	}

	.mt-form-row {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.mt-input {
		display: flex;
		align-items: center;
		width: 584.66rpx;
		height: 101.33rpx;
		border-radius: 20px;
		border: 1rpx solid #FFFFFF;
	}

	.mt-input-img {
		height: 42.66rpx;
		width: 38.66rpx;
		margin-left: 32.66rpx;
		margin-right: 33.33rpx;
		color: #FFFFFF;
	}

	.mt-loginimge {
		width: 100%;
		height: 100%;
	}

	.mt-input-input {
		width: 480rpx;
		height: 80rpx;
	}

	.uni-input {
		color: #F1F1F1;
		height: 100%;
	}


	.mt-registration,
	.mt-forget {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.mt-loginbutn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 584.66rpx;
		height: 101.33rpx;
		font-size: 29.33rpx;
		border-radius: 60rpx;
		background: linear-gradient(to bottom, #6FAFFF, #1880FF);
	}
</style>
