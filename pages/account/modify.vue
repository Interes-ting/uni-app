<template>
	<view class="mt-body">
		<view class="mt-uers">忘记密码</view>
		<view class="mt-back">
			<view class="mt-in padin">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge">1</view>
					</view>
					<view class="mt-input-input">
						<input class="uni-input" @input="onKeyInput" placeholder="输入您的手机号码" />
					</view>
				</view>
			</view>
			
			
			<view class="mt-in">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge">2</view>
					</view>
					<view class="mt-input-input">
						<input class="uni-input" @input="onKeyInput" placeholder="输入您的密码" />
					</view>
				</view>
			</view>
			<view class="mt-in">
				<view class="mt-input">
					<view class="mt-input-img">
						<view class="mt-loginimge">2</view>
					</view>
					<view class="mt-input-input">
						<input class="uni-input" @input="onKeyInput" placeholder="再次确认密码" />
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
							<input class="uni-input" @input="onKeyInput" placeholder=""  v-model="phoneCode"/>
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
			<button class="mt-loginbutndl" type="primary">确认</button>
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
				phoneCode:'',
			  // 计时器,注意需要进行销毁
			  timeCounter: null,
			  // null 则显示按钮 秒数则显示读秒
			  showtime: null
			}
		},
		methods: {
			logindex:function(){
				uni.navigateTo({
					url:'../login/login'
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
		  this.countDown(60);
		  
		 }
		 },
		
	}
</script>

<style>
	.mt-back {
		width: 90%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 13px;
		padding: 0 0 15% 0;
	}

	uni-page-body {
		height: 100%;
	}

	.mt-body {
		display: block;
		height: 100%;
		background-image: url('~@/static/sylog.png');
		background-size: 100% 100%;
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
		font-size: 15px;
		font-weight: 400;
		padding: 60rpx 0 80rpx 0;
	}

	.mt-loginbutndl {
		border-radius: 20px;
		background: linear-gradient(to bottom, #6FAFFF, #1880FF);
		/*设置按钮为渐变颜色*/
	}

	.mt-uers {
		color: #FFFFFF;
		font-size: 17px;
		widows: 100%;
		text-align: center;
		font-weight: 500;
		padding: 3% 0 20% 0;
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

	.mt-input {
		height: 78rpx;
		line-height: 78rpx;
		width: 80%;
		margin: 0 10%;
		border-radius: 20px;
		border: 1px solid #CCCCCC;
	}

	.mt-input-img {
		height: 50rpx;
		width: 50rpx;
		margin-top: 2rpx;
		margin-left: 15rpx;
		margin-right: 10rpx;
		float: left;
		color: #CCCCCC;
	}

	.mt-input-input {
		height: 78rpx;
		line-height: 78rpx;
		text-align: left;
		width: 100%;

	}

	.uni-input-placeholder {
		color: #CCCCCC;
	}

	/* 验证码外部框宽度 */
	.mt-input-input.mt-yz {
		width: 75%;
		float: left;
	}

	/* 验证码输入框 */
	.mt-input-img.mt-yz {
		width: 40%;
		float: left;
		margin: 0;
		font-size: 12px;
		height: 78rpx;
		line-height: 78rpx;
		background-color: #5ba4ff;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
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
		border-top-left-radius: 20px;
		border: 1px solid #CCCCCC;
		border-bottom-left-radius: 20px;
	}
</style>
