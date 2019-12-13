import mtRequest from './miiteen-request.js';
import mtConfig from './miiteen-config';

/**
 * 账号登录
 * @param {Object} user 账号信息
 * @param {Object} successcallback 登录成功回调函数
 */
function login(user, successcallback) {
	mtRequest.post(mtConfig.getPersonUrl("api/sys/loginapi/login"), user, function(data) {
		if (data.state > 0) {
			//登录成功
			uni.showToast({
				title: "登录成功",
				success: function() {
					//设置当前登录用户信息
					user.merchantInfoId = data.data.platformUserId;
					uni.setStorageSync('curAccount', user);
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

		//结束请求
		mtRequest.stop();
	})
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
