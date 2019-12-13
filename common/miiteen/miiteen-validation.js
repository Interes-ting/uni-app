/**
 * 校验类型:
 * {type:"require",msg:""} 必填校验
 * {type:"regexp",regexp:"正则",msg:""} 正则校验
 */
function valid(data, rules) {
	for (let key in rules) {
		let errmsg = validItem(data[key], rules[key]);
		if (errmsg != null) {
			return false;
		}
	}

	return true;
}

/**
 * 校验数据项
 * @param {Object} data 数据
 * @param {Object} rules 校验规则
 */
function validItem(data, rules) {
	for (let i = 0; i < rules.length; i++) {
		let errmsg = validError(data, rules[i]);
		if (errmsg != null) {
			uni.showToast({
				title: errmsg,
				icon: "none"
			})
			return errmsg;
		}
	}

	return null;
}

/**
 * 校验
 * @param {Object} data 数据
 * @param {Object} rule 校验规则
 */
function validError(data, rule) {
	switch (rule.type) {
		case "require":
			return requireValid(data, rule.msg);
		case "regexp":
			return regExpValid(data, rule.regexp, rule.msg);
	}
}

/**
 * 必填校验
 * @param {Object} data 数据
 * @param {Object} msg 校验不通过提示
 */
function requireValid(data, msg) {
	if (!data || data.trim().length < 1) {
		return msg;
	}

	return null;
}

/**
 * 正则校验
 * @param {Object} data 数据
 * @param {Object} regexp 正则
 * @param {Object} msg 校验不通过提示
 */
function regExpValid(data, regexp, msg) {
	if (!data || data.trim().length < 1) {
		return msg;
	}
	if (!regexp.test(data)) {
		return msg;
	}

	return null;
}


module.exports = {
	valid: valid,
	validItem: validItem
}
