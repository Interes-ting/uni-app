//是否正在操作
let isOperate = false;

/**
 * Http请求
 */
const request = {
	//开始请求
	start: function() {
		if (isOperate) {
			uni.showToast({
				title: "正在操作,请稍后再试...",
				icon: "none"
			})
			return false;
		} else {
			uni.showLoading({
				title: "加载中"
			})
			return true;
		}
	},
	//停止请求
	stop: function() {
		isOperate = false;
		uni.hideLoading();
	},
	/**
	 * Get请求
	 * @param {Object} url
	 * @param {Object} data
	 * @param {Object} success
	 * @param {Object} fail
	 */
	get: function(url, data, success, fail) {
		if (!request.start()) {
			return;
		}
		if (!fail) {
			fail = function(res) {
				if (process.env.NODE_ENV === 'development') {
					let msg = "POST请求:" + url;
					msg += "\n参数:" + JSON.stringify(data);
					msg += "\n返回:" + JSON.stringify(res);
					console.log(msg);
				}
				failCallback();
			}
		}

		uni.request({
			method: "GET",
			url: url,
			data: data,
			dataType: "json",
			success: function(res) {
				successCallback(res, success);
			},
			fail: fail
		});
	},
	/**
	 * Post请求
	 * @param {Object} url
	 * @param {Object} data
	 * @param {Object} success
	 * @param {Object} fail
	 */
	post: function(url, data, success, fail) {
		if (!request.start()) {
			return;
		}
		if (!fail) {
			fail = function(res) {
				if (process.env.NODE_ENV === 'development') {
					let msg = "POST请求:" + url;
					msg += "\n参数:" + JSON.stringify(data);
					msg += "\n返回:" + JSON.stringify(res);
					console.log(msg);
				}
				failCallback();
			}
		}

		uni.request({
			method: "POST",
			url: url,
			data: data,
			header: {
				'content-type': 'application/json'
			},
			dataType: "json",
			success: function(res) {
				successCallback(res, success);
			},
			fail: fail
		})
	}
}

//请求成功回调函数
function successCallback(res, success) {
	if (res.statusCode == 200) {
		if (success && typeof(success) == "function") {
			success(res.data);
		} else {
			defaultSuccess();
			request.stop();
		}
	} else {
		if (process.env.NODE_ENV === 'development') {
			console.log(JSON.stringify(res));
		}
		switch (res.statusCode) {
			case 400:
				error400(res);
				break;
			case 404:
				error404();
				break;
			case 500:
				error500();
				break;
		}
		request.stop();
	}
}

//请求失败回调函数
function failCallback() {
	uni.getNetworkType({
		success: function(res) {
			if (res.networkType == "none") {
				uni.showToast({
					title: "请查看网络连接是否打开",
					icon: "none"
				})
			} else if (res.networkType == "wifi") {
				uni.showToast({
					title: "请查看wifi是否已联网",
					icon: "none"
				})
			} else {
				uni.showToast({
					title: "网络繁忙,请稍后再试",
					icon: "none"
				})
			}
		}
	});
	request.stop();
}

//默认请求成功处理
function defaultSuccess() {
	uni.showToast({
		title: "操作成功",
		icon: "none"
	})
}

//400错误处理
function error400(res) {
	let errmsg = decodeURI(res.header.paramerror);
	uni.showModal({
		title: '',
		content: errmsg,
		showCancel: false
	});
}


//404错误处理
function error404() {
	uni.showToast({
		title: "请求的资源未找到,请稍后重试",
		icon: "none"
	})
}

//500错误处理
function error500() {
	uni.showToast({
		title: "请求服务器失败",
		icon: "none"
	})
}

module.exports = request
