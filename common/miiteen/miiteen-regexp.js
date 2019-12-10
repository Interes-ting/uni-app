let regexpArry = {
	//手机号
	phone: /^(1[0-9])\d{9}$/,
	//银行卡号
	bankCard: /^([1-9]{1})(\d{15}|\d{18})$/,
	//零和正整数
	int: /^[1-9]\d*|0$/

}

module.exports = regexpArry
