// root actions

//import state from './state.js'

import {asyFetchByRoute} from '@/util.js'
//getBSVTableByFetchResult
export default {
	//异步更新fetchCont
	asyUpdateFetchCont: async function({commit,state},payload){
		let req=Object.assign({},state.fetchCont.request,payload)
		let res=await asyFetchByRoute(req)
		
		let items=res.cont.hasOwnProperty('items')?res.cont.items:state.fetchCont.response.items
		let lists=res.cont.hasOwnProperty('lists')?res.cont.lists:state.fetchCont.response.lists
		
		//let index=state.sidebar.index
		
		//console.log('actions.js ',req)

		commit('updateFetchCont',{
						request:req,
						response:{
							items:items,
							lists:lists
						}
					}
				)
		
		//commit('updateSidebar',index)
		
		return 
	},	
	//异步更新navbar
	//async 函数返回Promise对象
	asyUpdateNavbar: async function({dispatch,commit,state},index){
		let actNav=state.navbar.items[index]
		let routeStr=actNav.props.routeStr
		//必须第一个执行以便获得后端的数据，后续的组件渲染需要用到。
		await dispatch('asyUpdateFetchCont',{'routeStr':routeStr})
		
		commit('updateNavbar',index)
		commit('updateSidebar',index)
		commit('updateIsBriefContent',true)
		
		return state
	},
	//异步更新SideItem
	//async 函数返回Promise对象
	asyChangeSideItem: async function({dispatch,commit,state},routeStr){
		let index=state.sidebar.index
		await dispatch('asyUpdateFetchCont',{'routeStr':routeStr})
		
		commit('updateSidebar',index)
		commit('updateActiveEntry',{'routeStr':routeStr,'index':index})
		commit('updateIsBriefContent',false)
		
		//console.log('asyChangeSideItem')
		//console.log(routeStr)
		
		return 
	}
	
	
}