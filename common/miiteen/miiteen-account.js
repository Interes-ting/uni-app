import mtRequest from './miiteen-request.js';
import mtConfig from './miiteen-config';

/**
 * 账号登录
 * @param {Object} user 账号信息
 * @param {Object} successcallback 登录成功回调函数
 */
function login(user, successcallback) {
	if (mtRequest.isRepeat()) {
		return;
	}
	mtRequest.post(mtConfig.getPersonUrl("api/sys/loginapi/login"), user, function(data) {
		//结束请求
		mtRequest.stop();

		if (data.state > 0) {
			//登录成功
			uni.showToast({
				title: "登录成功",
				success: function() {
					//设置当前登录用户信息
					user.merchantInfoId = data.data.platformUserId;
					uni.setStorageSync('curAccount', user);
					//获取当前登录用户商家信息
					getMerchantInfo(user.merchantInfoId);
					//更新登录信息
					updateLogin(user);
					//触发回调函数
					successcallback();
				}
			})
		} else {
			//登录失败
			uni.showToast({
				title: data.message,
				icon: "none"
			})
		}
	})
}

//获取商户信息
function getMerchantInfo(id) {
	mtRequest.post(mtConfig.getPlatformUrl('/api/merchant_info/selectUser'), {
			merchantId: id,
		},
		function(res) {
			if (res.state > 0) {
				loadCurUser(res.data);
			}
			//结束请求
			mtRequest.stop();
		});
}

//更新登录信息
function updateLogin(user) {
	// #ifdef APP-PLUS
	mtRequest.post(mtConfig.getPlatformUrl("api/merchant_info/update_applogin"), {
		id: user.merchantInfoId,
		appNoticeId: plus.push.getClientInfo().clientid
	}, function() {
		//结束请求
		mtRequest.stop();
	})
	// #endif
	// #ifdef MP-WEIXIN
	mtRequest.post(mtConfig.getPlatformUrl("api/merchant_info/update_appletlogin"), {
		id: user.merchantInfoId,
		openId: user.openId
	}, function() {
		//结束请求
		mtRequest.stop();
	})
	// #endif
}

//更新当前商户信息
function loadCurUser(merchant) {
	let user = info();
	user.city = merchant.city;
	uni.setStorageSync('curAccount', user);
}

//获取当前登录账号信息
function info() {
	return uni.getStorageSync('curAccount');
}

//注销
function logout() {
	uni.removeStorageSync('curAccount');
}


module.exports = {
	login: login,
	info: info,
	logout: logout
}
