import Vue from 'vue'
import App from './App'
import MtConifg from './common/miiteen/miiteen-config.js'
import MtValidation from './common/miiteen/miiteen-validation.js'
import MtRegExp from './common/miiteen/miiteen-regexp.js'
import MtRequest from './common/miiteen/miiteen-request.js'

Vue.config.productionTip = false

Vue.prototype.$mtConfig = MtConifg;
Vue.prototype.$mtValidation = MtValidation;
Vue.prototype.$mtRegexp = MtRegExp;
Vue.prototype.$mtRequest = MtRequest;

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
