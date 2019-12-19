let regexpArry = {
	//手机号
	phone: /^(1[0-9])\d{9}$/,
	//银行卡号
	bankCard: /^([1-9]{1})(\d{15,18})$/,
	//数字或字母
	numAndStr: /^[A-Za-z0-9]+$/,
	//零和正整数
	int: /^[1-9]\d*|0$/,
	/**
	 * 小数
	 * @param {Object} m 小数位
	 */
	db: function(m) {
		return new RegExp("^[0-9]+(.[0-9]{1," + m + "})?$");
	}

}

module.exports = regexpArry
