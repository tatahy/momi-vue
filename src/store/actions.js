// root actions

//import state from './state.js'

import {asyFetchByRoute,} from '@/util.js'
//getBSVTableByFetchResult
export default {
	//async 函数返回Promise对象
	async asyUpdateNavbar({dispatch,commit,state},index){
		let actNav=state.navbar.items[index]
		let routeStr=actNav.props.routeStr
		
		commit('updateNavbar',index)
		
		commit('updateSidebar',index)
			
		return await dispatch('asyUpdateFetchCont',{routeStr:routeStr})
	},
	async asyUpdateFetchCont({commit,state},payload){
		let option=Object.assign({},state.fetchCont.option,payload)
		let response=state.fetchCont.response
		let res=await asyFetchByRoute(option)
		
		response=res.cont.hasOwnProperty('brief')?res.cont.brief:{}
		
		commit('updateFetchCont',{option:option,response:response})
		
		return 
	}
	
}