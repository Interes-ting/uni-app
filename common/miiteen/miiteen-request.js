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
		if (!success) {
			success = function(data) {
				request.stop();
			}
		}
		if (!fail) {
			fail = function(data) {
				uni.showToast({
					title: "网络繁忙,请稍后再试",
					icon: "none"
				})
				request.stop();
			}
		}

		uni.request({
			method: "GET",
			url: url,
			data: data,
			dataType: "json",
			success: function(data) {
				success(data.data);
			},
			fail: fail
		})
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
		if (!success) {
			success = function(data) {
				request.stop();
			}
		}
		if (!fail) {
			fail = function(data) {
				uni.showToast({
					title: "网络繁忙,请稍后再试",
					icon: "none"
				})
				request.stop();
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
			success: function(data) {
				success(data.data);
			},
			fail: fail
		})
	}
}

module.exports = request
