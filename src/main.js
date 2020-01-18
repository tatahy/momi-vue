/* //引入全局变量Vue
import Vue from 'vue'

import store from '@/store'

import App from '@/App.vue'

Vue.config.productionTip = false

let vmRoot = new Vue({
	//vuex实例，所有的子组件都可以访问
	store,
	render: h => h(App),
})
vmRoot.$mount('#app') */


//-----------------------

//动态加载各个模块
async function appInit(){
	const [
			{default:Vue},
			{default:store},
			{default:App},
	]= await Promise.all([
			import('vue'),
			import('@/store'),
			import('@/App'),
		])
	
	return {Vue,App,store}
}

appInit()	
.then(obj=>{
	let store=obj.store
	let Vue=obj.Vue
	let App=obj.App
	Vue.config.productionTip = false	
	let vmRoot=new Vue({
		store,
		render: h=>h(App)
	})
		
	vmRoot.$mount('#app')

})
.catch(err=>alert(err))

//-----------------------
/* 
const Vue=()=>import('vue')

const store=()=>import('@/store')

const App=()=>import('@/App.vue')

//Vue.config.productionTip = false

Promise.all([Vue,store,App]).
then(([Vue,store,App])=>{
	
	console.log(Vue)
	//Vue.config.productionTip = false	
	Vue({
		store,
		render: h=>h(App)
	}).$mount('#app')
})
.catch(err=>alert(err))
 */
