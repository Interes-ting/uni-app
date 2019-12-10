import Vue from 'vue'
import App from './App'
import MtValidation from './common/miiteen/miiteen-validation.js'
import MtRegExp from './common/miiteen/miiteen-regexp.js'

Vue.config.productionTip = false

Vue.prototype.$mtValidation = MtValidation;
Vue.prototype.$mtRegexp = MtRegExp;

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
