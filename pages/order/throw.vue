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
					<!-- 车辆类型 -->
					<view class="flexbox">
						<view class="flex-left">车辆类型</view>
						<view class="flex-right">
							<picker @change="PickerChange" :value="index" :range="pickerCar">
								<view class="picker-text">{{index > -1 ?  pickerCar[index] : '请选择'}}
									<text class="cuIcon-right righticon"></text>
								</view>
							</picker>
							
						</view>
					</view>
					<!-- 派车数量 -->
					<view class="flexbox">
						<view class="flex-left">派车数量</view>
						<view class="flex-right">
							<picker @change="PickerChangeNum" :value="index1" :range="pickerNum">
								<view class="picker-text"> {{pickerNum[index1]}}
									<text class="cuIcon-right righticon"></text></view>
							</picker>
						</view>
					</view>
				</view>
				<!-- 搬家信息 -->
				<view class="moving-information">
					<view class="basic-services-title">搬家信息</view>
					<view class="cu-form-group">
						<view class="title"><text class="required">*</text>客户名</view>
						<input placeholder="客户名" maxlength="10" 
						v-model.trim="customName" @blur="customNameValid('customName')"></input>
					</view>
					<view class="cu-form-group">
						<view class="title1"><text class="required">*</text>手机</view>

						<input placeholder="请输入手机号" name="input"
						v-model.trim="customPhone" @blur="customNameValid('customPhone')"
						@input="phoneChange"></input>
					</view>
					<!-- 搬入搬出 start-->
					<view class="mt-moveaddress">
						<view class="mt-move-circle">
						</view>
						<view class="solid"></view>
						<view class="cu-form-group"><text class="required">*</text>
							<input placeholder="您从哪里搬出" maxlength="50" name="input" 
							v-model.trim="startAddress" @blur="customNameValid('startAddress')"
							 style="overflow:hideen;white-space:nowrap;text-overflow:ellipsis;"></input>
						</view>
						<!-- 搬入是否有电梯 -->
						<view class="flexbox">
							<view class="flex-left">是否有电梯</view>
							<view class="flex-right">
								<!-- <picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
									<view class="picker-text" v-if="startfloor == null">
										请选择
										<text class="cuIcon-right righticon"></text>
									</view>
									<view class="picker-text" v-else>
										{{startfloor}},{{floor1}}楼
										<text class="cuIcon-right righticon"></text>
									</view>
								</picker> -->
								<picker  class="width-100" mode="multiSelector" :range="timeList" 
								:value="timesIndex" @change="bindTimeChange">			
									<view class="picker-text">
										{{timeList[0][timesIndex[0]]}}:{{timeList[1][timesIndex[1]]}}
										<text class="cuIcon-right righticon"></text>
									</view>
									
								</picker>
							</view>
						</view>
						<view class="cu-form-group">
							<text class="required">*</text>
							<input placeholder="您搬到哪里去" maxlength="50" name="input" 
							v-model.trim="endAddress" @blur="customNameValid('endAddress')"
							style="overflow:hideen;white-space:nowrap;text-overflow:ellipsis;"></input>
						</view>
						<view class="mt-move-circle newcolor"></view>
						<!-- 搬入是否有电梯 -->
						<view class="flexbox">
							<view class="flex-left">是否有电梯</view>
							<view class="flex-right">
								<!-- <picker mode="multiSelector" @change="MultiChange1" @columnchange="MultiColumnChange" :value="multiIndex"
								 :range="multiArray">
									<view class="picker-text" v-if="endfloor == null">
										请选择
										<text class="cuIcon-right righticon"></text>
									</view>
									<view class="picker-text" v-else>
										{{endfloor}},{{floor2}}楼
										<text class="cuIcon-right righticon"></text>
									</view>
								</picker> -->
							</view>
						</view>
					</view>
					<!-- 搬入搬出 end-->
					<view class="flexbox">
						<view class="flex-left" style="width: 250rpx;">
							<text class="mt-iconbox mtfa mt-rili"></text>
							<text class="required">*</text>搬家时间
						</view>
						<view class="flex-right" @click="openDatetimePicker">
							<view class="picker-text">{{time==''?'请选择':time}}
								<text class="cuIcon-right righticon"></text>
							</view>
						</view>
						<!-- 时间日期选择器start-->
						<simple-datetime-picker
						   ref="myPicker"
						   @submit="handleSubmit"
						   :start-year="2019"
						   :end-year="2030"
						   color="rgb(30, 131, 255)"
						></simple-datetime-picker>
					</view>

					<view class="cu-form-group ">
						<view class="title" style="padding: 5rpx;"><text class="required">*</text>距离（公里）</view>
						<input placeholder="请输入距离" type="number" maxlength="6" name="input" v-model.trim="distance" @blur="customNameValid('distance')"></input>

					</view>
					<view class="cu-form-group ">
						<text class="mt-iconbox mtfa mt-jine" style="color:#F06523"></text>
						<view class="title" style="margin-left:10rpx;padding: 0rpx;">
							<text class="required">*</text>订单金额：
						</view>
						<input placeholder="请输入订单金额" maxlength="6" type="number" name="input" 
						v-model.trim="orderAmount" @blur="customNameValid('orderAmount')">
						</input>
					</view>
					<view class="cu-form-group">
						<view class="title mt-title">
							<text class="mt-iconbox mtfa mt-fuwufei1"></text>
							<text class="required">*</text>扔单提成:</view>
						<input placeholder="请输入提成金额" maxlength="6" type="number" name="input" 
						v-model.trim="pay" @input="getBymeney"
						 @blur="customNameValid('pay')"></input>
						<view style="overflow: hidden;">
							平台服务费：{{fuwufei == null ? '' :fuwufei}}
						</view>
					</view>
					<!-- picker样式 -->
					<view class="flexbox">
						<view class="flex-left">搬运人数</view>
						<view class="flex-right">
							<picker @change="PickerChangeHumen" :value="index3" :range="pickerHumen">
								<view class="picker-text">{{pickerHumen[index3]}}
									<text class="cuIcon-right righticon"></text></view>
							</picker>
						</view>
					</view>
					<!-- picker样式结束 -->
					<view class="basic-services-car cu-form-group" style="border-top:0">
						<view class="title">是否急单</view>
						<switch @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false">
						</switch>
					</view>
					<view class="basic-services-car cu-form-group" style="border-top:0">
						<view class="title">需要拆装服务</view>
						<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
					</view>
					<view class="cu-form-group align-start" style="height: 260.87rpx;">
						<view class="title">搬运物品</view>
						<textarea maxlength="100" @input="textareaAInput" v-model="textareaAValue" style="height: 74%;"></textarea>
					</view>
					<view class="cu-form-group align-start" style="height: 260.87rpx;border-radius:13.04rpx;">
						<view class="title">注意事项</view>
						<textarea maxlength="100" @input="textareaBInput" v-model="textareaBValue" style="height: 74%;"></textarea>
					</view>
				</view>
			</form>
			<button class="btn-logout" @click="goThrow">立即扔单</button>
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
				timeList: [['无电梯','有电梯'],[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
				timesIndex: [0,0],

				// 保存车辆信息数组
				pieckId: [],
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
				// //平台服务费
				fuwufei: null,
				// 搬家时间
				time: '',
				// 车辆选择参数
				index: -1,
				pickerCar: [],
				// 车辆id
				carId: null,
				// 车辆数量选择参数
				index1: 0,
				pickerNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				// 人数选择参数
				index3: 0,
				pickerHumen: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				// 是否需要车辆
				switchA: true,
				needCar: 1,
				// 是否急单
				sos: 0,
				switchB: false,
				// 是否需要拆装服务
				switchC: false,
				installation: 0,
				// 搬运物品
				textareaAValue: '',
				// 注意事项
				textareaBValue: '',
				// 电梯楼层参数
				// lc1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				// lc2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
				// // 出发地址电梯楼层
				// startfloor: null,
				// floor1: null,
				// multiArray: [
				// 	['无电梯', '有电梯'],
				// 	[]
				// ],
				// multiIndex: [0, 0],
				// // 到达地址电梯楼层
				// endfloor: null,
				// floor2: null,
				// multiArray1: [
				// 	['无电梯', '有电梯'],
				// 	[]
				// ],
				// multiIndex1: [0, 0],
				//校验规则
				rules: {
					// 客户名
					customName: [{
						type: "require",
						msg: "请输入客户名"
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
						msg: "请输入搬出地址"
					}],
					//到达地址
					endAddress: [{
						type: "require",
						msg: "请输入搬入地址"
					}],
					// 距离
					distance: [{
							type: "require",
						},
						{
							type: "double",
							name: '距离',
							place: 2, //允许输入小数点个数
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
			this.checkCarType();
			// this.multiArray[1] = this.lc1,
			// this.multiArray1[1] = this.lc1
		},
		methods: {	
			bindTimeChange(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				console.log(this.timesIndex);
				// this.timesIndex = e.target.value
			},
			getBymeney(e) {
				this.pay = e.detail.value;
				this.$mtRequest.get(this.$mtConfig.getPlatformUrl(`/api/order_info/throwCommionRatioPay`), {
					payAmount: this.pay
				}, (res) => {
					if (res.state == 1) {
						this.fuwufei = res.data;
					}
					this.$mtRequest.stop(); //结束loading等待
				});
				if (this.pay === '') {
					this.fuwufei = 0
				}
			},
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
				this.time = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
			},
			
			// 车辆类型
			PickerChange: function(e) {
				if (e.detail.value <= 0) {
					e.detail.value = 0
				}
				this.index = e.detail.value
				this.show = e.detail.value
				this.pieckId.forEach((item, index) => {
					if (item.name === this.pickerCar[this.index]) {
						this.carId = item.id;
					}
				})
			},

			// 车辆数量选择
			PickerChangeNum: function(e) {
				if (e.detail.value <= 0) {
					e.detail.value = 0
				}
				this.index1 = e.detail.value
			},

			// 人数选择
			PickerChangeHumen: function(e) {
				if (e.detail.value === -1) {
					e.detail.value = 0
				}
				this.index3 = e.detail.value

			},

			// 车辆
			SwitchA: function(e) {
				this.switchA = e.detail.value
				if (this.switchA) {
					this.needCar = 1 //true
				} else {
					// this.index = 0
					this.needCar = 0 //false
					this.carId = '' //车辆类型为空
					this.index = -1
					//车辆类型信息为空
				};
				this.pickerCar[this.index];
			},
			
			// 去空格
			phoneChange: function(e) {
				this.customPhone = e.detail.value.replace(/[, ]/g,'');
				return this.customPhone;
			},
			
			// 是否急单
			SwitchB: function(e) {
				this.switchB = e.detail.value
				if (this.switchB == false) {
					this.sos = 0 //true
				} else {
					this.sos = 1 //false
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

			},


			// // 出发地址楼层选择
			// MultiChange: function(e) {
			// 	if (e.detail.value[0] === 0) {
			// 		this.startfloor = '无电梯'
			// 		this.floor1 = e.detail.value[1] + 1
			// 	} else {
			// 		this.startfloor = '有电梯'
			// 		this.floor1 = e.detail.value[1] + 1
			// 	}
			// 	this.multiIndex = e.detail.value;
			// },
			// MultiColumnChange: function(e) {
			// 	let data = {
			// 		multiIndex: this.multiIndex,
			// 		multiArray: this.multiArray
			// 	}
			// 	selectchange(data, this, e.detail);
			// },

			// // 到达地址楼层选择
			// MultiChange1: function(e) {
			// 	if (e.detail.value[0] === 0) {
			// 		this.endfloor = '无电梯'
			// 		this.floor2 = e.detail.value[1] + 1
			// 	} else {
			// 		this.endfloor = '有电梯'
			// 		this.floor2 = e.detail.value[1] + 1
			// 	}
			// 	this.multiIndex1 = e.detail.value;
			// },
			// MultiColumnChange1: function(e) {
			// 	let data = {
			// 		multiIndex: this.multiIndex1,
			// 		multiArray: this.multiArray1
			// 	}
			// 	console.log(this.multiIndex1)
			// 	console.log(this.multiArray1)
			// 	this.selectchange(data, this, e.detail);
			// },

			goThrow: function() {
				if (this.switchA == true || this.needCar == 1) {
					//判断是否选择车辆类型
					if (this.pickerCar[this.index] === undefined) {
						uni.showToast({
							title: '请选择车辆类型',
							icon: "none"
						})
						return false;
					};
				
				};
				//立即扔单
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
				
				//判断是否选择电梯楼层
				if (this.startfloor === null || this.endfloor === null ||
					this.floor1 == null || this.floor2 == null) {
					uni.showToast({
						title: '请选择是否有电梯',
						icon: "none"
					})
					return false;
				};
				
				if(!this.time){
					uni.showToast({
						title: '请选择搬家时间',
						icon: "none"
					})
					return false;
				};
				
				if(this.distance == 0 ){
					uni.showToast({
						title: '距离不能为0',
						icon: "none"
					})
					return false;
				};
				if (this.orderAmount < 1) {
					uni.showToast({
						title: '订单金额不能为0',
						icon: "none"
					})
					return false;
				};
				if (this.pay < 1) {
					uni.showToast({
						title: '扔单提成不能为0',
						icon: "none"
					})
					return false;
				};
				//防重复
				if (this.$mtRequest.isRepeat()) {
					return;
				};
				// 发送网络请求
				this.$mtRequest.post(this.$mtConfig.getPlatformUrl('api/order_info/throw_order'), {
						city: this.$mtAccount.info().city,
						customerName: this.customName,
						phone: this.customPhone,
						fromAddress: this.startAddress,
						toAddress: this.endAddress,
						deliveryTime: this.time,
						distance: this.distance,
						goods: this.textareaAValue,
						carTypeId: this.carId,
						carTypeName: this.pickerCar[this.index],
						price: this.orderAmount,
						payAmount: this.pay,
						remark: this.textareaBValue,
						throwMerchantInfoId: this.$mtAccount.info().merchantInfoId,
						intoElevator: this.endfloor,
						intoFloor: this.floor2,
						outEleveator: this.startfloor,
						outFloor: this.floor1,
						vehicleRequired: this.needCar,
						vehiceNumber: this.pickerNum[this.index1],
						isItUrgent: this.sos,
						isItchai: this.installation,
						thowPlatformFee: this.fuwufei,
						handlingNumber: this.pickerHumen[this.index3],
						handlingService: 0
					},
					(res) => {
						//扔单成功跳转到扔单记录页面
						if (res.state == 1) {
							uni.showToast({
								title: "扔单成功",
								success: function() {
									setTimeout(function() {
										uni.navigateTo({
											url: 'throwRecord'
										});
									}, 2000)
								},
							});
							this.$mtRequest.stop(); //结束loading等待
							this.pieckId = [],
								//客户名
								this.customName = '',
								//用户手机号
								this.customPhone = '',
								// 出发地址
								this.startAddress = '',
								//到达地址
								this.endAddress = '',
								// 距离
								this.distance = '',
								// 订单金额
								this.orderAmount = '',
								// 扔单提成
								this.pay = '',
								// //平台服务费
								this.fuwufei = null,
								// 搬家时间
								this.startyear = new Date(),
								this.time = '',
								// 车辆选择参数
								this.index = -1,
								this.pickerCar = [],
								// 车辆id
								this.carId = null,
								// 车辆数量选择参数
								this.index1 = 0,
								this.pickerNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
								// 人数选择参数
								this.index3 = 0,
								this.pickerHumen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
								// 是否需要车辆
								this.switchA = true,
								this.needCar = 1,
								// 是否急单
								this.sos = 0,
								this.switchB = false,
								// 是否需要拆装服务
								this.switchC = false,
								this.installation = 0,
								// 搬运物品
								this.textareaAValue = '',
								// 注意事项
								this.textareaBValue = ''
								// 电梯楼层参数
								// this.lc1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
								// this.lc2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
								// 	28, 29, 30
								// ],
								// // 出发地址电梯楼层
								// this.startfloor = null,
								// this.floor1 = null,
								// this.multiArray = [
								// 	['无电梯', '有电梯'],
								// 	[]
								// ],
								// this.multiIndex = [0, 0],
								// // 到达地址电梯楼层
								// this.endfloor = null,
								// this.floor2 = null,
								// this.multiArray1 = [
								// 	['无电梯', '有电梯'],
								// 	[]
								// ],
								// this.multiIndex1 = [0, 0]
								// this.multiArray[1] = this.lc1,
								// this.multiArray1[1] = this.lc1
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
							this.$mtRequest.stop(); //结束loading等待
						};
					});
			},

			checkCarType: function() { //发送网络请求获取车辆类型
				this.$mtRequest.get(this.$mtConfig.getPlatformUrl('api/order_info/getcartype'), {}, (res) => {
					if (res.state > 0) {
						this.pieckId = res.data;
						this.pieckId.forEach(item => {
							this.pickerCar.push(item.name)
						})
						this.$mtRequest.stop();
					} else {
						// 如果车辆为请求到,pickerCar为默认值
						this.pickerCar = ['暂无']
					}

				});
			},

			customNameValid: function(key) { //自定义校验
				this.$mtValidation.validItem(this[key], this.rules[key])
			}

		},
	};

	//楼层选择方法
	// function selectchange(data, lcarry, selectItem) {
	// 	data.multiIndex[selectItem.column] = selectItem.value;
	// 	console.log(selectItem.column)
	// 	if (selectItem.column == 0) {	
			
	// 		switch (data.multiIndex[0]) {
	// 			case 0:
				
	// 				data.multiArray[1] = lcarry.lc1;
					
	// 				break;
	// 			case 1:
	// 				data.multiArray[1] = lcarry.lc2;
	// 				break;
	// 		}
	// 	}
	// };
</script>

<style lang="less" scoped>
	.btn-logout {
		margin-top: 100rpx;
		width: 76%;
		border-radius: 50rpx;
		font-size: 32rpx;
		color: #fff;
		background: linear-gradient(to bottom, #1880ff, #6fafff);
		height: 100rpx;
		line-height: 100rpx;
	}
	.datetime-picker .wrap.show
	.cu-form-group .title {
		z-index: 99999999;
	}

	.flexbox {
		display: flex;
		/*设为伸缩容器*/
		flex-flow: row;
		/*伸缩项目单行排列*/
		font-size: 28rpx;
		border-bottom: 0.66rpx solid #eee;
		overflow: hidden;

		.flex-left {
			display: inline-block;
			width: 200rpx;
			padding: 30rpx 13.33rpx;
		}

		.flex-right {
			flex: 1;
			/*这里设置为占比1，填充满剩余空间*/
			height: 95rpx;
			line-height: 100%;

			.picker-text {
				height: 95rpx;
				line-height: 95rpx;
				text-align: right;
				font-size: 30rpx;

				.righticon {
					margin-left: 13.33rpx;
					color: #8799a3;
					font-size: 30rpx;
					padding-right: 20rpx;
				}
			}
		}
	}

	.mt-title {
		padding-right: 25rpx !important;
	}

	.mt-fuwufei1 {
		padding-right: 13.33rpx;
	}

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
		padding: 20rpx;
		padding-bottom: 110rpx;

		.mt-hascar {
			background-color: #FFFFFF;
			border-radius: 13.33rpx;
			padding: 0rpx 13.33rpx;
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

		.throwBtn {
			position: fixed;
			z-index: 1;
			left: 0;
			bottom: var(--window-bottom);
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			background-color: white;

			.mt-seedeil-btn {
				width: 80%;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: linear-gradient(0deg, rgba(67, 152, 255, 1) 0%, rgba(28, 130, 255, 1) 100%);
				border-radius: 6.66rpx;
				color: #fff;
				font-size: 32rpx;
			}
		}
	}
</style>
