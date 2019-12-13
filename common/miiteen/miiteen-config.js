const config = {
	//当前App版本
	version: 120,
	//获取轻松搬家管理系统-个人版Api地址
	getPersonUrl: function(url) {
		return "http://192.168.0.109:8101/" + url;
	},
	//获取轻松搬家平台Api地址
	getPlatformUrl: function(url) {
		return "http://192.168.0.109:8102/" + url;
	}
}

module.exports = config;
