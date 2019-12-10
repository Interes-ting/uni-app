/**
 * 校验类型:
 * {type:"require",msg:""} 必填校验
 * {type:"regexp",regexp:"正则",msg:""} 正则校验
 */
function valid(data, rules) {
	for (let key in rules) {;
		for (let i = 0; i < rules[key].length; i++) {
			let errmsg = validError(data[key], rules[key][i]);
			if (errmsg != null) {
				uni.showToast({
					title: errmsg,
					icon: "none"
				})
				return false;
			}
		}
	}

	return true;
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
	valid: valid
}
