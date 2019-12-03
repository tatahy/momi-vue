//引入全局变量Vue
import Vue from 'vue'

import store from '@/store'

import App from '@/App.vue'

Vue.config.productionTip = false

let vmRoot = new Vue({
	//vuex实例，所有的子组件都可以访问
	store,
	render: h => h(App),
})
vmRoot.$mount('#app')


