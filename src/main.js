//动态加载各个模块
/* async function appInit(){
	const [
			{default:Vue},
			{default:store},
			{default:App},
			{default:asyBsVGetReady},
			{default:asyFaGetReady},
	]= await Promise.all([
			import('vue'),
			import('@/store'),
			import('@/App'),
			import('@/VueBsDyn'),
			import('@/VueFaIconDyn'),
		])
	
	const arr=await Promise.all([
			asyBsVGetReady(),
			asyFaGetReady(),
		])
	//仿照fetch对象返回值的定义
	let result={ok:arr.every(val=>{return val==true}),cont:{}}
	
	result.cont=result.ok?{Vue,App,store}:{}
	
	return result
}

appInit()	
.then(res=>{
	let isOk=res.ok
	let obj=res.cont
	if(isOk){
		let store=obj.store
		let Vue=obj.Vue
		let App=obj.App
		
		let vmRoot=new Vue({
			store,
			render: h=>h(App)
		})
		
		vmRoot.$mount('#app')
		//console.log(obj)
	}
})
.catch(err=>alert(err)) */

/* ----------------------------------------------------- */

import Vue from 'vue'

import store from '@/store'

//异步加载Vender库
async function getVendorReady(){
	const [
			{default:asyBsVGetReady},
			{default:asyFaGetReady},
	]= await Promise.all([
			import('@/VueBsDyn'),
			import('@/VueFaIconDyn'),
		])
	
	const arr=await Promise.all([
			asyBsVGetReady(),
			asyFaGetReady(),
		])
	
	return arr.every(val=>{return val==true})
}

//异步加载app运行所需组件
async function appInit(){
	//const isReady=await getVendorReady()
	const [
			isReady,
			{default:App},
	]= await Promise.all([
			getVendorReady(),
			import('@/App'),
		])
	
	return {ok:isReady,cont:isReady?Object.assign({},App):{}}
}

appInit()	
.then(res=>{
	if(res.ok){
		let App=res.cont
		let vmRoot=new Vue({
			store,
			render: h=>h(App)
		})
		Vue.config.productionTip = false 
		vmRoot.$mount('#app')
	}
})
.catch(err=>alert(err))

