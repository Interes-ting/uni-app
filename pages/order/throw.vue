<!-- 扔单编辑-->
<template>
	<view class="throw">
		<view class="throw-content">
			<form>
				<view class="cu-form-group mt-hascar ">
					<view class="title bold">是否需要车辆</view>
					<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false">
					</switch>
				</view>
				<!-- 基础服务 -->
				<view class="basic-services" v-if="switchA">
					<view class="basic-services-title">基础服务</view>
					<view class="basic-services-type cu-form-group">
						<view class="title"><text class="required">*</text>车辆类型</view>
						<picker @change="PickerChange" :value="index" :range="pickerCar">
							<view class="picker">
								{{index> 0?pickerCar[index]:'请选择'}}
							</view>
						</picker>
					</view>
					<view class="basic-services-car cu-form-group" style="border-top:0">
						<view class="title"><text class="required">*</text>派车数量</view>
						<picker @change="PickerChangeNum" :value="index1" :range="pickerNum">
							<view class="picker">
								{{index1>0?pickerNum[index1]:'请选择'}}
							</view>
						</picker>
					</view>
				</view>
				<!-- 搬家信息 -->
				<view class="moving-information">
					<view class="basic-services-title">搬家信息</view>
					<view class="cu-form-group">
						<view class="title"><text class="required">*</text>客户名</view>
						<input placeholder="用户名(默认)" name="input" v-model="customName" @blur="customNameValid('customName')"></input>
					</view>
					<view class="cu-form-group">
						<view class="title1"><text class="required">*</text>手机</view>
						<input placeholder="请输入手机号" name="input" v-model="customPhone" @blur="customNameValid('customPhone')"></input>
					</view>
					<!-- 搬入搬出 start-->
					<view class="mt-moveaddress">
						<view class="mt-move-circle">
						</view>
						<view class="solid"></view>
						<view class="cu-form-group"><text class="required">*</text>
							<input placeholder="您从哪里搬出" name="input" v-model="startAddress" @blur="customNameValid('startAddress')"></input>
						</view>
						<view class="cu-form-group">

							<view class="title">是否有电梯</view>
							<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
								<view class="picker" v-if="startfloor == null"> 请选择</view>
								<view class="picker" v-else>{{startfloor}},{{floor1}}楼</view>
							</picker>
						</view>

						<view class="cu-form-group"><text class="required">*</text>
							<input placeholder="您搬到哪里去" name="input" v-model="endAddress" @blur="customNameValid('endAddress')"></input>
						</view>
						<view class="mt-move-circle newcolor"></view>
						<view class="cu-form-group">

							<view class="title">是否有电梯</view>
							<picker mode="multiSelector" @change="MultiChange1" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
								<view class="picker" v-if="endfloor == null"> 请选择</view>
								<view class="picker" v-else>{{endfloor}},{{floor2}}楼</view>
							</picker>
						</view>
					</view>

					<!-- 搬入搬出 end-->
					<view class="moving-distance cu-form-group" @click="openDatetimePicker">
						<text class="mt-iconbox mtfa mt-rili mt-iconbox" style="position: relative;right: 13.33rpx;"></text>

						<view class="move-time" style=";"><text class="required">*</text>搬家时间</view>
						<view class="checktime">
							{{time}}
						</view>
					</view>
					<!-- 时间日期选择器start-->
					<simple-datetime-picker ref="myPicker" @submit="handleSubmit" :start-year="2000" :end-year="2030" color="#488ee9">
					</simple-datetime-picker>
					<!-- 时间日期选择器end -->
					<view class="cu-form-group ">
						<view class="title" style="padding: 5rpx;"><text class="required">*</text>距离（公里）</view>
						<input placeholder="请输入距离" name="input" v-model="distance" @blur="customNameValid('distance')"></input>
					</view>
					<view class="cu-form-group ">
						<text class="mt-iconbox mtfa mt-jine" style="color:#F06523"></text>
						<view class="title" style="margin-left:10rpx;padding: 0rpx;"><text class="required">*</text>订单金额：</view>
						<input placeholder="请输入订单金额" name="input" v-model="orderAmount" @blur="customNameValid('orderAmount')"></input>
					</view>
					<view class="cu-form-group ">
						<text class="mt-iconbox mtfa mt-fuwufei1" style="float: left;font-size: 45rpx;margin-left: -5rpx"></text>
						<view class="title" style="margin-left:5rpx;padding: 0rpx;">
							<text class="required">*</text>扔单提成:</view>
						<input placeholder="请输入提成金额" name="input" v-model="pay" @blur="customNameValid('pay')" style="position: relative;left:20rpx;"></input>
						<view class="title" style="position: relative;left: 50rpx;">平台服务费：6</view>
					</view>
					<view class="basic-services-car cu-form-group" style="border-top:0">
						<view class="title">需要搬运人数</view>
						<picker @change="PickerChangeHumen" :value="index3" :range="pickerHumen">
							<view class="picker">
								{{index3>-1?pickerHumen[index3]:'禁止换行，超出容器部分会以 ... 方式截断'}}
							</view>
						</picker>
					</view>
					<view class="basic-services-car cu-form-group" style="border-top:0">
						<view class="title">是否急单</view>
						<switch @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
					</view>
					<view class="basic-services-car cu-form-group" style="border-top:0">
						<view class="title">需要拆装服务</view>
						<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
					</view>
					<view class="cu-form-group align-start" style="height: 260.87rpx;">
						<view class="title">搬运物品</view>
						<textarea maxlength="-1" @input="textareaAInput"></textarea>
					</view>
					<view class="cu-form-group align-start" style="height: 260.87rpx;border-radius:13.04rpx;">
						<view class="title">注意事项</view>
						<textarea maxlength="-1" @input="textareaBInput"></textarea>
					</view>
				</view>
			</form>
			<view style="position: relative;width: 100%;height: 387.39rpx;">
				<button class="mt-seedeil-btn" @tap="goThrow">立即扔单</button>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入时间日期选择组件
	import simpleDatetimePicker from "@buuug7/uniapp-components/lib/simple-datetime-picker";
	export default {
		components: {
			simpleDatetimePicker
		},
		data() {
			return {
				//客户名
				customName: '',
				//用户手机号
				customPhone: '',
				// 出发地址
				startAddress: '',
				//到达地址
				endAddress: '',
				// 距离
				distance: '',
				// 订单金额
				orderAmount: '',
				// 扔单提成
				pay: '',
				// 搬家时间
				time: '2019-12-10 12:01',
				// 车辆选择参数
				index: 0,
				// picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				pickerCar: [],
				// 车辆数量选择参数
				index1: 0,
				pickerNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10辆以上'],
				// 人数选择参数
				index3: 0,
				pickerHumen: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10人以上'],
				carList: [1, 2, 3],
				// 是否需要车辆
				switchA: true,
				needCar: null,
				// 是否急单
				sos: null,
				switchB: true,
				// 是否需要拆装服务
				switchC: true,
				installation: null,
				// 搬运物品
				textareaAValue: '',
				// 注意事项
				textareaBValue: '',
				// 电梯楼层参数
				lc1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				lc2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, , 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
					30
				],
				// 出发地址电梯楼层
				startfloor: null,
				floor1: null,
				multiArray: [
					['无电梯', '有电梯'],
					[]
				],
				multiIndex: [0, 0],
				// 到达地址电梯楼层
				endfloor: null,
				floor2: null,
				multiArray1: [
					['无电梯', '有电梯'],
					[]
				],
				multiIndex1: [0, 0],
				//校验规则
				rules: {
					// 客户名
					customName: [{
						type: "require",
						msg: "请输入客户姓名"
					}],
					// 客户手机号
					customPhone: [{
							type: "require",
							msg: "请输入客户手机号"
						},
						{
							type: "regexp",
							regexp: this.$mtRegexp.phone,
							msg: "请输入正确的11位手机号"
						},
					],
					// 出发地址
					startAddress: [{
						type: "require",
						msg: "请输入出发地址"
					}],
					//到达地址
					endAddress: [{
						type: "require",
						msg: "请输入到达地址"
					}],
					// 距离
					distance: [{
							type: "require",
							msg: "请输入距离"
						},
						{
							type: "regexp",
							regexp: this.$mtRegexp.int,
							msg: "距离应为数字,请重新输入"
						},
					],
					// 订单金额
					orderAmount: [{
							type: "require",
							msg: "请输入订单金额"
						},
						{
							type: "regexp",
							regexp: this.$mtRegexp.int,
							msg: "订单金额应为数字,请重新输入"
						},
					],
					// 扔单提成
					pay: [{
							type: "require",
							msg: "请输入扔单提成"
						},
						{
							type: "regexp",
							regexp: this.$mtRegexp.int,
							msg: "订单金额应为数字,请重新输入"
						},
					],
				}
			}
		},
		onLoad() {
			// 页面一加载给电梯楼层赋值
			this.multiArray[1] = this.lc1
			this.multiArray1[1] = this.lc1
			this.checkCarType();
		},
		methods: {

			// 打开时间日期选择器
			openDatetimePicker: function() {
				this.$refs.myPicker.show();
			},

			// 关闭时间日期选择器
			closeDatetimePicker: function() {
				this.$refs.myPicker.hide();
			},

			// 搬家时间
			handleSubmit: function(e) {
				console.log(e);
				this.time = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
			},

			// 车辆类型
			PickerChange: function(e) {
				this.index = e.detail.value
				console.log(this.index)
				console.log(this.pickerCar[this.index])
				this.show = e.detail.value
			},

			// 车辆数量选择
			PickerChangeNum: function(e) {
				this.index1 = e.detail.value
				console.log(this.index1)
				console.log(this.pickerNum[this.index1])
			},

			// 人数选择
			PickerChangeHumen: function(e) {
				this.index3 = e.detail.value
				console.log(this.index3)
				console.log(this.pickerHumen[this.index3])
			},

			// 车辆
			SwitchA: function(e) {
				this.switchA = e.detail.value
			},

			// 是否急单
			SwitchB: function(e) {
				this.switchB = e.detail.value
				console.log(this.switchB)
				if (this.switchB) {
					this.needCar = 1 //true
				} else {
					this.needCar = 0 //false
				}
			},

			// 是否需要拆装服务
			SwitchC: function(e) {
				this.switchC = e.detail.value
				if (this.switchC) {
					this.installation = 1 //true
				} else {
					this.installation = 0 //false
				}

			},

			// 搬运物品
			textareaAInput: function(e) {
				this.textareaAValue = e.detail.value
			},

			// 注意事项
			textareaBInput: function(e) {
				this.textareaBValue = e.detail.value
			},


			// 出发地址楼层选择
			MultiChange(e) {
				if (e.detail.value[0] === 0) {
					this.startfloor = '无电梯'
					this.floor1 = e.detail.value[1]
				} else {
					this.loginfloor = '有电梯'
					this.floor1 = e.detail.value[1]
				}
				this.multiIndex = e.detail.value;
			},
			MultiColumnChange(e) {
				let data = {
					multiIndex: this.multiIndex,
					multiArray: this.multiArray
				}
				selectchange(data, this, e.detail)
			},

			// 到达地址楼层选择
			MultiChange1(e) {
				if (e.detail.value[0] === 0) {
					this.endfloor = '无电梯'
					this.floor2 = e.detail.value[1]
				} else {
					this.endfloor = '有电梯'
					this.floor2 = e.detail.value[1]
				}
				this.multiIndex1 = e.detail.value;
				// console.log(this.logoutfloor),
				console.log(this.endfloor, this.floor2)
			},
			MultiColumnChange1(e) {
				let data = {
					multiIndex: this.multiIndex1,
					multiArray: this.multiArray1
				}
				selectchange(data, this, e.detail)
			},

			goThrow: function() { //立即扔单
				let grabInfo = {
					customName: this.customName,
					customPhone: this.customPhone,
					startAddress: this.startAddress,
					endAddress: this.endAddress,
					distance: this.distance,
					orderAmount: this.orderAmount,
					pay: this.pay,
				}
				//做校验
				let validResult = this.$mtValidation.valid(grabInfo, this.rules);
				if (!validResult) {
					return;
				}
				// 发送网络请求
				this.$mtRequest.post(this.$mtConfig.getPlatformUrl('api/order_info/throw_order'), {
						customerName: '',
						phone: '',
						fromAddress: '',
						toAddress: '',
						deliveryTime: '',
						distance: '',
						goods: '',
						carTypeId: '',
						carTypeName: '',
						price: '',
						payAmount: '',
						remark: this.textareaAValue,
						throwMerchantInfo: this.$mtAccount.info().merchantInfoId
					},
					(res) => {
						this.$mtRequest.stop(); //结束loading等待
					});
			},

			checkCarType: function() { //发送网络请求获取车辆类型
				this.$mtRequest.get(this.$mtConfig.getPlatformUrl('/api/order_info/getcartype'), {}, (res) => {
					// console.log(res);
					for (let i = 0; i <= res.length; i++) {
						// console.log(res[i]);
						this.pickerCar.push(res[i].name);
					}
					this.$mtRequest.stop();
				});
			},


			customNameValid(key) {
				this.$mtValidation.validItem(this[key], this.rules[key])
			}

		}
	}

	function selectchange(data, lcarry, selectItem) {
		data.multiIndex[selectItem.column] = selectItem.value;
		if (selectItem.column == 0) {
			switch (data.multiIndex[0]) {
				case 0:
					data.multiArray[1] = lcarry.lc1;
					break;
				case 1:
					data.multiArray[1] = lcarry.lc2;
					break;
			}
		}
	}
</script>

<style lang="less" scoped>
	.mt-moveaddress {
		margin-left: 30rpx !important;
		position: relative !important;

		.solid {
			position: absolute;
			left: -18rpx;
			top: 65rpx;
			width: 0.66rpx;
			height: 247rpx;
			background-color: #CCCCCC;
		}

		.mt-move-circle {
			position: relative;
			right: 20rpx;
			bottom: -50rpx;
			width: 8rpx;
			height: 8rpx;
			background-color: #22AC38;
			border-radius: 50%;
		}

		.newcolor {
			background-color: #B71A00;
		}
	}

	.move-time {
		position: absolute;
		left: 55rpx;
		font-size: 30rpx;
	}

	.checktime {
		position: absolute;
		right: 50rpx
	}

	.mt-iconbox {
		font-size: 33.33rpx;
		color: #F06523;
	}

	.mt-seedeil-btn {
		width: 576.52rpx;
		height: 97.82rpx;
		background: linear-gradient(0deg, rgba(67, 152, 255, 1) 0%, rgba(28, 130, 255, 1) 100%);
		border-radius: 48.91rpx;
		top: 160.43rpx;
		display: inline-block;
		text-align: center;
		line-height: 97.82rpx;
		color: #fff;
		font-size: 32rpx;

		position: absolute;
		bottom: 26.08rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	page {
		background-color: #f4f4f4;
		color: #333333;
		font-size: 26.66rpx;
	}

	image {
		width: 100%;
		height: 100%;
	}

	.fl {
		float: left;
	}

	.fr {
		float: right
	}

	.bold {
		font-weight: 700;
	}

	.throw-content {
		padding: 13.33rpx;

		.mt-hascar {
			width: 723.33rpx;
			height: 110rpx;
			background-color: #FFFFFF;
			border-radius: 13.33rpx;
			padding: 0rpx 13.33rpx;
			line-height: 110rpx;
			font-size: 29.78rpx;
			box-sizing: border-box;
			box-shadow: 0px 0px 24.78rpx 0px rgba(0, 0, 0, 0.08);
		}

		.basic-services {
			margin-top: 13.69rpx;
			width: 100%;
			// height: 263.47rpx;
			background-color: #FFFFFF;
			box-shadow: 0px 0px 38px 0px rgba(0, 0, 0, 0.08);
			border-radius: 13.04rpx;

			.basic-services-title {
				width: 100%;
				height: 86.73rpx;
				font-size: 29.34rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				padding-left: 13.69rpx;
				color: rgba(51, 51, 51, 1);
				line-height: 86.73rpx;
				border-bottom: 0.65rpx solid #eee;
			}

			.basic-services-type {
				width: 100%;
				height: 86.73rpx;
				font-size: 26.08rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				padding-left: 13.69rpx;
				color: rgba(51, 51, 51, 1);
				line-height: 86.73rpx;
				border-bottom: 0.65rpx solid #eee;
			}

			.basic-services-car {
				width: 100%;
				height: 86.73rpx;
				font-size: 26.08rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				padding-left: 13.69rpx;
				color: rgba(51, 51, 51, 1);
				line-height: 86.73rpx;
				border-radius: 13.04rpx;
			}
		}

		.moving-information {
			margin-top: 13.69rpx;
			width: 100%;
			// height: 263.47rpx;
			background-color: #FFFFFF;
			box-shadow: 0px 0px 38px 0px rgba(0, 0, 0, 0.08);
			border-radius: 13.04rpx;

			.basic-services-title {
				width: 100%;
				height: 86.73rpx;
				font-size: 29.34rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				padding-left: 13.69rpx;
				color: rgba(51, 51, 51, 1);
				line-height: 86.73rpx;
				border-bottom: 0.65rpx solid #eee;
			}

			.moving-distance {
				width: 100%;
				height: 86.73rpx;
				font-size: 29.34rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				border-bottom: 0.65rpx solid rgba(204, 204, 204, 1);
				padding-left: 13.69rpx;
				color: rgba(51, 51, 51, 1);
				line-height: 86.73rpx;

				.moving-distance-float {
					height: 86.73rpx;
					width: 100%;
					display: inline-block;
					background-color: pink;
				}
			}

			.content-icon {
				font-size: 10.43rpx;

			}

			.moving-distance-text {
				padding-left: 13.69rpx;
			}

			.cu-form-group {
				position: relative;
				height: 86.73rpx;
				min-height: 86.73rpx;
				font-size: 26.08rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				height: 86.73rpx;
				padding-left: 13.69rpx;
				border-top: 0;
				border-bottom: 0.66rpx solid #eee;

				.uni-input-placeholder {
					font-size: 18.91rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: rgba(204, 204, 204, 1);
				}
			}

			.title {
				padding-right: 84.78rpx;

			}

			.title1 {
				padding-right: 121rpx;
			}

			.order-detail-two {
				width: 100%;
				// height: 166rpx;
				margin-top: 0.65rpx;
				font-size: 40px;
				position: relative;
				font-size: 26.08rpx;
				color: #333333;
				background-color: #fff;
				position: relative;

				.order-bar {
					width: 0.65rpx;
					height: 64.56rpx;
					background-color: #cccccc;
					position: absolute;
					left: 19rpx;
					top: 50%;
					transform: translateY(-50%);
				}

				.order-detail-two-view {
					width: 100%;
					margin-top: 5rpx;
					height: 82.82rpx;
					align-items: center;
					position: relative;
					display: flex;

					.order-detail-two-view-pai {
						display: inline-block;
						height: 7.82rpx;
						width: 7.82rpx;

						background-color: #0000FF;
						border-radius: 50%;
						margin-left: 16.95rpx;
					}

					.cu-form-group {
						border-bottom: 0.66rpx solid #CCCCCC;
					}

					.order-detail-two-view-where {
						flex: 1;
						box-sizing: border-box;
						margin-left: 24rpx;
						padding-left: 10rpx;
						border-bottom: 0.66rpx solid #eee;

						.uni-input-placeholder {
							font-size: 19.33rpx;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);

						}
					}
				}
			}
		}
	}
</style>
