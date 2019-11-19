// root actions

//import state from './state.js'

import {asyFetchByRoute,getTableByFetchResult} from '@/util.js'

export default {
	//async 函数都是Promise对象
	async asyChangeTable({dispatch},opt){
		return await dispatch('asyGetTableItems',opt)
	},
	
	//async 函数都是Promise对象
	async asyGetTableItems({commit,state},opt){
		//let navArr=state['navArr']
		let setObjValue=name=>{
				return Object.keys(state).includes(name) && opt.hasOwnProperty(name)?
						Object.assign({},state[name],opt[name])
						:state[name]
			}
		
		let table=setObjValue('table')
		let fetchOption=setObjValue('fetchOption')
		let navActive=setObjValue('navActive')
		let entity=setObjValue('entity')
		
		//let sideActive=state.sideActive
		
		let isBriefContent=opt.hasOwnProperty('isBriefContent')?opt['isBriefContent']:state['isBriefContent']
		
		//let isNavChanged=navActive['name']!==state['navActive']['name']?true:false
		let isNavChanged=entity['name']!==state['entity']['name']?true:false
		let isRouteStrChanged=fetchOption['routeStr']!==state['fetchOption']['routeStr']?true:false
		let isPageChanged=isBriefContent!=state['isBriefContent']?true:false
		
		let sidebarOld={routeOld:state['fetchOption']['routeStr'],
					nameOld:state['navActive']['name']
			}
			
		let res=isRouteStrChanged?await asyFetchByRoute(fetchOption):null
		//isRouteStrChanged为true必然会有res，就会有cont
		let cont=res?res.cont:null
		
		let result=false
		
		//更新state各个部分的值
		//只能通过commit mutations中的函数才能修改state中的数据
		if(isRouteStrChanged){

			commit('changeFetchOption',fetchOption)
			commit('changeIsNavChanged',{value:isNavChanged})
			
			table['isBusy']=true
			commit('changeTable',table)		
			
			if(isNavChanged){
				
				navActive.category=cont.hasOwnProperty('itemsTotal')?{itemsTotal:cont.itemsTotal}:{}
				
				//计算navActive.name对应的sidebar中各个菜单项的总数
				state['sidebar'].forEach((obj,idx)=>{
					if(obj.name==navActive.name && cont.hasOwnProperty('itemsTotal')){
						commit('updateSidebarItemsTotal',{index:idx,itemsTotal:cont.itemsTotal})
					}
					
				})
				
			}
		
			commit('updateNavActive',navActive)
			//更新navActive之后更新sideActive
			if(cont.hasOwnProperty('brief'))commit('updateSideActive',cont.brief)
			//commit('updateSideActive',cont.brief)
			
			
			//更新sidebar的activeItem
			commit('updateSidebarItemsActive',sidebarOld)
			
			table=Object.assign({},
					getTableByFetchResult(res,table.fieldLang),
					{'isBusy':false}
				)
			//console.log(table)
			commit('changeTable',table)
			commit('changeEntity',entity)
			
			result=true
		}
		
		
		if(isPageChanged){
			commit('changeIsBriefContent',{value:isBriefContent})
			table['isBusy']=false
			commit('changeTable',table)
			result=true
		}
		
		return result
	}
	
}