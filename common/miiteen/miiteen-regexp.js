let regexpArry = {
	//手机号
	phone: /^(1[0-9])\d{9}$/,
	//银行卡号
	bankCard: /^([1-9]{1})(\d{15,18})$/,
	//零和正整数
	int: /^[1-9]\d*|0$/,
	/**
	 * 小数
	 * @param {Object} m 小数位
	 */
	db: function(m) {
		return eval("/^[0-9]+(.[0-9]{1," + m + "})?$/");
	}

}

module.exports = regexpArry
