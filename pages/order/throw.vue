<!-- 扔单编辑-->
<template>
	<view class="throw">
		<view class="throw-content">
			<view class="cu-form-group mt-hascar">
				<view class="title bold">是否需要车辆</view>
					<switch @change="SwitchA" 
					:class="switchA?'checked':''" 
					:checked="switchA?true:false">
					</switch>
			</view>
			<!-- 基础服务 -->
			<view class="basic-services">
				<view class="basic-services-title">基础服务</view>
				<view class="basic-services-type cu-form-group"> 
					<view class="title">车辆类型</view>
						<picker @change="PickerChange" 
						:value="index" :range="pickerCar">
							<view class="picker">
								{{index>-1?pickerCar[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
							</view>
						</picker>
				</view>
				<view class="basic-services-car cu-form-group" style="border-top:0">
					<view class="title">派车数量</view>
						<picker @change="PickerChangeNum" :value="index1" :range="pickerNum">
							<view class="picker">
								{{index1>-1?pickerNum[index1]:'禁止换行，超出容器部分会以 ... 方式截断'}}
							</view>
						</picker>
				</view>
			</view>
			<!-- 搬家信息 -->
			<view class="moving-information">
				<view class="basic-services-title">搬家信息</view>
				<view class="cu-form-group">
					<view class="title">客户名</view>
					<input placeholder="用户名(默认)" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title1">手机</view>
					<input placeholder="请输入手机号" name="input"></input>
				</view>
				<view class="order-detail-two">
					<view class="order-detail-two-view">
						<view class="order-detail-two-view-pai" style="background-color: #22AC38;"></view>
					
						<view class="cu-form-group order-detail-two-view-where">
							<input placeholder="您从哪里搬出" name="input"></input>
						</view>
					</view>
					<view class="order-detail-two-view">
						<view class="order-detail-two-view-pai" style="background-color:#B71A00"></view>
						<view class="cu-form-group order-detail-two-view-where">
							<input placeholder="您搬到哪里去" name="input"></input>
						</view>
					</view>
					<view class="order-bar"></view>
				</view>
				<view class="moving-distance cu-form-group" @click="openDatetimePicker">
						<view class="cuIcon-circlefill content-icon"></view>
						<view class="move-time">搬家时间</view>
						<view class="checktime" >
							{{time}}
						</view>
				</view>
				<!-- 时间日期选择器start-->
				<simple-datetime-picker ref="myPicker" @submit="handleSubmit"
				:start-year="2000" :end-year="2030" color="#488ee9">
				</simple-datetime-picker>
				<!-- 时间日期选择器end -->
				<view class="moving-distance">
					距离  (公里)
				</view>
				<view class="moving-distance">
						<text class="cuIcon-circlefill content-icon"></text>
						<text class="moving-distance-text">订单金额</text>
				</view>
				<view class="moving-distance">
					<text class="cuIcon-circlefill content-icon"style="float: left;"></text>
					<text class="moving-distance-text" style="float: left;">扔单提成: 60</text>
					<text class="moving-distance-text" style="float: right; margin-right: 58.04rpx;">扔单提成: 60</text>
				</view>
				<view class="basic-services-car cu-form-group" style="border-top:0">
					<view class="title">楼层</view>
						<picker @change="PickerChangeFloor" :value="index2" :range="pickerFloor">
							<view class="picker">
								{{index2>-1?pickerFloor[index2]:'禁止换行，超出容器部分会以 ... 方式截断'}}
							</view>
						</picker>
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
					<view class="title">需要拆装服务</view>
					<switch  @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
				</view>
				<view class="basic-services-car cu-form-group" style="border-top:0">
					<view class="title">需要搬运服务</view>
					<switch  @change="SwitchD" :class="switchD?'checked':''" :checked="switchD?true:false"></switch>
				</view>
				<view class="basic-services-car cu-form-group" style="border-top:0">
					<view class="title">是否有电梯</view>
					<switch  @change="SwitchF" :class="switchF?'checked':''" :checked="switchF?true:false"></switch>
					<switch  @change="SwitchG" :class="switchG?'checked':''" :checked="switchG?true:false"></switch>
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
			<view style="position: relative;width: 100%;height: 387.39rpx;">
				<button class="mt-seedeil-btn" >立即扔单</button>
			</view>
	</view>
		<!-- 底部导航栏 -->
		<view class="cu-bar tabbar bg-white mt-tabbar">
			<view class="action" @click="goIndex">
				<view class="mtfa mt-shouye mt-tabbar-item"></view>
				<view class="text-grey">首页</view>
			</view>
			<view class="action" @click="goThrow">
				<view class="mtfa mt-daochu mt-tabbar-item text-blue"></view>
				<view class="text-blue">扔单</view>
			</view>
			<view class="action" @click="goWallet">
				<view class="mtfa mt-qianbao mt-tabbar-item"></view>
				<view class="text-gray">收益</view>
			</view>
			<view class="action" @click="goPerson">
				<view class="mtfa mt-person mt-tabbar-item"></view>
				<view class="text-grey">我的</view>
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
				// 搬家时间
				time: '2019-12-10 12:01',
				// 车辆选择参数
				index: 0,
				pickerCar: ['小面包车', '汪汪汪', '哼唧哼唧'],
				// 车辆数量选择参数
				index1: 0,
				pickerNum: [1, 2, 3, 4, 5, 6],
				// 楼层选择参数
				index2: 0,
				pickerFloor: [1, 2, 3, 4, 5, 6],
				// 人数选择参数
				index3: 0,
				pickerHumen: [1, 2, 3, 4, 5, 6],
				carList:[1,2,3],
				// 车辆
				switchA: true,
				// 拆装服务
				switchB: true,
				switchC: true,
				// 搬运服务
				switchD: true,
				// 是否电梯
				switchF: true,
				switchG: true,
				// 搬运物品
				textareaAValue: '',
				// 注意事项
				textareaBValue: '',
			}
		},
		methods: {
			// 打开时间日期选择器
      openDatetimePicker() {
         this.$refs.myPicker.show();
      },
      // 关闭时间日期选择器
      closeDatetimePicker() {
         this.$refs.myPicker.hide();
      },
			// 搬家时间
      handleSubmit(e) {
         console.log(e);
         this.time = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
      },
			// 车辆类型
			PickerChange(e) {
				this.index = e.detail.value
				console.log(this.index)
				console.log(this.pickerCar[this.index])
				
		},
			// 车辆数量选择
			PickerChangeNum(e) {
				this.index1 = e.detail.value
				console.log(this.index1)
				console.log(this.pickerNum[this.index1])
			},
			// 楼层选择
			PickerChangeFloor(e) {
				this.index2 = e.detail.value
				console.log(this.index2)
				console.log(this.pickerFloor[this.index2])
			},
			// 人数选择
			PickerChangeHumen(e) {
				this.index3 = e.detail.value
				console.log(this.index3)
				console.log(this.pickerHumen[this.index3])
			},
			// 车辆
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			// 拆装服务
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			
			// 搬运服务D
			SwitchD(e) {
				this.switchD = e.detail.value
			},
			// 是否电梯
			SwitchF(e) {
				this.switchF = e.detail.value
			},
			SwitchG(e) {
				this.switchG = e.detail.value
			},
			// 搬运物品
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			// 注意事项
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},
			goIndex: function (){
				//扔单
				
				 uni.navigateTo({
				     url: "../index/index"
				 });
			},
			goWallet: function (){
				//收益
				uni.navigateTo({
				    url: "../wallet/wallet"
				});
			},
			goPerson: function (){
				//个人中心
				uni.navigateTo({
				    url: "../person/person"
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.mt-tabbar {
		position: fixed;
		z-index: 999;
		bottom: 0;
		width: 100%;
	}
	.mt-tabbar-item{
		font-size: 46.66rpx;
		margin-bottom:13.33rpx
	}
	.move-time{
		position: absolute;
		left:50rpx
	}
	.checktime{
		position: absolute;
		right:50rpx
	}
	.mt-seedeil-btn {
		width:576.52rpx;
		height:97.82rpx;
		background:linear-gradient(0deg,rgba(67,152,255,1) 0%,rgba(28,130,255,1) 100%);
		border-radius:48.91rpx;
		top: 160.43rpx;
		display: inline-block;
		text-align: center;
		line-height: 97.82rpx;
		color: #fff;
		font-size: 31.3rpx;
		
		position: absolute;
		bottom: 26.08rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	page{
		background-color:#f4f4f4;
		color: #333333;
	}
	image{
		width: 100%;
		height: 100%;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right
	}
	.bold{
		font-weight: 700;
	}
	.throw-content{
		padding: 13.33rpx;
		.mt-hascar{
			width: 723.33rpx;
			height: 110rpx;
			background-color: #FFFFFF;
			border-radius: 13.33rpx;
			padding: 0rpx 13.33rpx;
			line-height: 110rpx;
			font-size:29.78rpx ;
			box-sizing: border-box;
			box-shadow:0px 0px 24.78rpx 0px rgba(0, 0, 0, 0.08);
		}
		.basic-services {
			margin-top:13.69rpx;
			width: 100%;
			// height: 263.47rpx;
			background-color: #FFFFFF;
			box-shadow:0px 0px 38px 0px rgba(0, 0, 0, 0.08);
			border-radius:13.04rpx;
			.basic-services-title {
				width:100%;
				height: 86.73rpx;
				font-size:29.34rpx;
				font-family:Microsoft YaHei;
				font-weight:bold;
				padding-left: 13.69rpx;
				color:rgba(51,51,51,1);
				line-height:86.73rpx;
				border-bottom:0.65rpx solid #eee;
			}
			.basic-services-type {
				width:100%;
				height: 86.73rpx;
				font-size:26.08rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				padding-left: 13.69rpx;
				color:rgba(51,51,51,1);
				line-height:86.73rpx;
				border-bottom:0.65rpx solid #eee;
			}
			.basic-services-car {
				width:100%;
				height: 86.73rpx;
				font-size:26.08rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				padding-left: 13.69rpx;
				color:rgba(51,51,51,1);
				line-height:86.73rpx;
				border-radius:13.04rpx;
			}
		}
		.moving-information {
			margin-top:13.69rpx;
			width: 100%;
			// height: 263.47rpx;
			background-color: #FFFFFF;
			box-shadow:0px 0px 38px 0px rgba(0, 0, 0, 0.08);
			border-radius:13.04rpx;
			.basic-services-title {
				width:100%;
				height: 86.73rpx;
				font-size:29.34rpx;
				font-family:Microsoft YaHei;
				font-weight:bold;
				padding-left: 13.69rpx;
				color:rgba(51,51,51,1);
				line-height:86.73rpx;
				border-bottom:0.65rpx solid #eee;
				
			}
			.moving-distance {
				width:100%;
				height: 86.73rpx;
				font-size:29.34rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				border-bottom:0.65rpx solid rgba(204,204,204,1);
				padding-left: 13.69rpx;
				color:rgba(51,51,51,1);
				line-height:86.73rpx;
				
				.moving-distance-float {
					height: 86.73rpx;
					width:100%;
					display: inline-block;
					background-color: pink;
				}
			}
			
			.content-icon {
				font-size:10.43rpx;
				
			}
			.moving-distance-text {
				padding-left: 13.69rpx;
			}
			.cu-form-group  {
				position: relative;
				height: 86.73rpx;
				min-height: 86.73rpx;
				font-size:26.08rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(51,51,51,1);
				height: 86.73rpx;
				padding-left: 13.69rpx;
				border-top: 0;
				border-bottom: 0.66rpx solid #eee;
				.uni-input-placeholder {
					font-size:18.91rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(204,204,204,1);
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
				height: 166rpx;
				margin-top:0.65rpx;
				font-size: 40px;
				position: relative;
				font-size: 26.08rpx;
				color: #333333;
				background-color: #fff;
				position: relative;
				.order-bar {
					width: 0.65rpx;
					height:64.56rpx;
					background-color:#cccccc;
					position: absolute;
					left: 19rpx;
					top: 50%;
					transform: translateY( -50%);
				}
				.order-detail-two-view {
					width: 100%;
					margin-top:5rpx;
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
							font-size:26.08rpx;
							font-family:Microsoft YaHei;
							font-weight:400;
							color:rgba(153,153,153,1);
							
						}
					}
				}
			}
		}
	}
</style>
