// root actions

//import state from './state.js'

import {asyFetchByRoute,} from '@/util.js'
//getBSVTableByFetchResult
export default {
	async asyInitApp({dispatch,commit}){
		
		await dispatch('asyUpdateNavbar',0)
		//保存App刚开始运行时的state数据
		commit('initState')
		return 
	},
	async asyUpdateFetchCont({commit,state},payload){
		let option=Object.assign({},state.fetchCont.option,payload)
		let res=await asyFetchByRoute(option)
		let response=res.cont.hasOwnProperty('brief')?res.cont.brief:state.fetchCont.response
		
		commit('updateFetchCont',{option:option,response:response})
		
		return 
	},	
	
	//async 函数返回Promise对象
	async asyUpdateNavbar({dispatch,commit,state},index){
		let actNav=state.navbar.items[index]
		let routeStr=actNav.props.routeStr
		//必须第一个执行以便获得后端的数据，后续的组件渲染需要用到。
		await dispatch('asyUpdateFetchCont',{routeStr:routeStr})
		
		commit('updateNavbar',index)
		
		commit('updateSidebar',index)
		
		return 
	},
	
	
}