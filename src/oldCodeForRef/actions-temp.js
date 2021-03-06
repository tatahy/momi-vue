// root actions

//import state from './state.js'

import {asyFetchByRoute,getBSVTableByFetchResult} from '@/util.js'

export default {
	//async 函数返回Promise对象
	async asyInitState({commit,state},opt){
		let setObjValue=name=>{
				return state.hasOwnProperty(name) && opt.hasOwnProperty(name)?
						Object.assign({},state[name],opt[name])
						:state[name]
			}
		let activeNav=setObjValue('activeNav')
		let activeSidebar=setObjValue('activeSidebar')
		//let activeSideItem=setObjValue('activeSideItem')
		let fetchOption=setObjValue('fetchOption')
		
		let isNavChanged=activeNav.index!==state.activeNav.index?true:false
		let isSidebarChanged=activeSidebar.index!==state.activeSidebar.index?true:false
		let isRouteStrChanged=fetchOption.routeStr!==state.fetchOption.routeStr?true:false
		
		let res=isRouteStrChanged?await asyFetchByRoute(fetchOption):null
		let cont=res?res.cont:null
		
		if(isNavChanged){
			this.commit('updateActiveNav',activeNav)
		}
		
		if(isSidebarChanged){
			this.commit('updateActiveSidebar',activeSidebar)
			//this.commit('updateActiveSideItem')
		}
		
		/* console.log(isRouteStrChanged)
		console.log(fetchOption) */
		
		if(isRouteStrChanged){
			commit('updateFetchOption',fetchOption)
			commit('updateFetchData',
				{response:cont.hasOwnProperty('brief')?cont.brief:{}}
			)
		}
		
		return 
	},
	
	async asyUpdateNavbar({commit},index){
		commit('updateNavbar',index)
		
		return 
	},
	
	//async 函数返回Promise对象
	async asyChangeTable({dispatch},opt){
		return await dispatch('asyGetTableItems',opt)
	},
	
	//async 函数返回Promise对象
	async asyGetTableItems({commit,state},opt){
		//let navArr=state['navArr']
		let setObjValue=name=>{
				return state.hasOwnProperty(name) && opt.hasOwnProperty(name)?
						Object.assign({},state[name],opt[name])
						:state[name]
			}
		
		let entity=setObjValue('entity')
		let fetchOption=setObjValue('fetchOption')
		let navActive=setObjValue('navActive')
		let table=setObjValue('table')
				
		let isBriefContent=opt.hasOwnProperty('isBriefContent')?opt['isBriefContent']:state['isBriefContent']
		let isPageChanged=isBriefContent!=state['isBriefContent']?true:false
		let isNavChanged=entity['name']!==state['entity']['name']?true:false
		let isRouteStrChanged=fetchOption['routeStr']!==state['fetchOption']['routeStr']?true:false
		//let isRouteStrChanged=commit('changeFetchOption',fetchOption)
		/* 
		let sidebarOld={
				routeOld:state['fetchOption']['routeStr'],
				nameOld:state['entity']['name']
			} */
			
		let res=isRouteStrChanged?await asyFetchByRoute(fetchOption):null
		//isRouteStrChanged为true必然会有res，就会有cont
		let cont=res?res.cont:null
		
		let result=false
				
		//if(isNavChanged && cont.hasOwnProperty('brief')){
			
		
		
		if(isNavChanged){
			
			entity.brief=cont.brief
			commit('changeEntity',entity)
			
			commit('updateFetchData',{response:cont.brief})
			
			commit('updateNavActive',navActive)
			//计算navActive.name对应的sidebar中各个菜单项的总数
			//commit('updateSidebarItemsTotal')
			
			//commit('updateSideActive')
		}
		
		
		//更新state各个部分的值
		//只能通过commit mutations中的函数才能修改state中的数据
		if(isRouteStrChanged){
			
			commit('changeFetchOption',fetchOption)
			commit('changeIsNavChanged',{value:isNavChanged})
			
			table['isBusy']=true
			commit('changeTable',table)		
			
			
			//更新sidebar的activeItem
			//commit('updateSidebarItemsActive',sidebarOld)
			
			table=Object.assign({},
					getBSVTableByFetchResult(res,table.fieldLang),
					{'isBusy':false}
				)
			//console.log(table)
			commit('changeTable',table)
			//commit('changeEntity',entity)
			
			result=true
		}
		
		
		if(isPageChanged){
			commit('changeIsBriefContent',{value:isBriefContent})
			table['isBusy']=false
			commit('changeTable',table)
			result=true
		}
		
		return result
	},
	/* 
	//async 函数返回Promise对象
	async asyUpdateState({commit,state},opt){
		let setObjValue=name=>{
				return state.hasOwnProperty(name) && opt.hasOwnProperty(name)?
						Object.assign({},state[name],opt[name])
						:state[name]
			}
		
		let entity=setObjValue('entity')
		let fetchOption=setObjValue('fetchOption')
		let navActive=setObjValue('navActive')
		
		let isBriefContent=opt.hasOwnProperty('isBriefContent')?opt['isBriefContent']:state['isBriefContent']
		let isPageChanged=isBriefContent!=state['isBriefContent']?true:false
		let isNavChanged=entity['name']!==state['entity']['name']?true:false
		let isRouteStrChanged=fetchOption['routeStr']!==state['fetchOption']['routeStr']?true:false
		
		let res=isRouteStrChanged?await asyFetchByRoute(fetchOption):null
		//isRouteStrChanged为true必然会有res，就会有cont
		let cont=res?res.cont:null
		
		//fetchOption.routeStr是否变化
		if(fetchOption['routeStr']!==state['fetchOption']['routeStr']){
			
			commit('updateFetchOption',fetchOption)
			commit('updateIsNavChanged',{value:isNavChanged})
			
			table['isBusy']=true
			commit('changeTable',table)		
			
			
			//更新sidebar的activeItem
			commit('updateSidebarItemsActive',sidebarOld)
			
			table=Object.assign({},
					getBSVTableByFetchResult(res,table.fieldLang),
					{'isBusy':false}
				)
			//console.log(table)
			commit('changeTable',table)
			//commit('changeEntity',entity)
			
			result=true
			
			
		}
		
	}
	 */
}