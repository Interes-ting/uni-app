import Vue from 'vue'
import App from './App'
import MtConifg from './common/miiteen/miiteen-config.js'
import MtValidation from './common/miiteen/miiteen-validation.js'
import MtRegExp from './common/miiteen/miiteen-regexp.js'
import MtRequest from './common/miiteen/miiteen-request.js'
import navTo from './common/miiteen/navTo.js'
import mtAlert from '@/components/miiteen/popups/mt-alert.vue'

Vue.config.productionTip = false

//全局注册组件
Vue.component("mt-alert", mtAlert);

//注册全局对象
Vue.prototype.$mtConfig = MtConifg;
Vue.prototype.$mtValidation = MtValidation;
Vue.prototype.$mtRegexp = MtRegExp;
Vue.prototype.$mtRequest = MtRequest;
Vue.prototype.$navTo = navTo

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
