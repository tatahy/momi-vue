// root mutations

//import state from './state.js'

//只能通过commit mutations中的函数才能修改state中的数据
export default {
	changeTable(state,payload){
		state.table=Object.assign({},state.table,payload)
		
		/* console.log('mutation.changeTable => ')
		console.log(state.table) */
	},
	changeFetchOption(state,payload){		
		state.fetchOption=Object.assign({},state.fetchOption,payload)
			
		/* console.log('mutation.FetchOption => ')
		console.log(state.fetchOption) */
			
	},
	
	changeNavActive(state,payload){
		state.navActive=Object.assign({},state.navActive,payload)
		return state.navActive
	},
	changeIsBriefContent(state,payload){
		state.isBriefContent=payload['value']
		return payload['value']
	},
	//
	updateNavActive(state,payload){
		let result=false
		
		state.navbar.forEach((obj,idx)=>{
			//所有navbar中的isActive设为false
			state['navbar'][idx]['props']['isActive']=false
			if(obj.name==payload.name){
				//将指定name的navbar的isActive设为true
				state['navbar'][idx]['props']['isActive']=true
				payload.themeClr=obj.props.themeClr
				result=true	
				//commit('changeNavActive',payload)
			}
			
			//设定navActive的值
			state.navActive=Object.assign({},state.navActive,payload)	
		})
		return result
	},
	//更新payload.index对应的sidebar中各个菜单项的总数
	updateSidebarItemsTotal(state,payload){
		let numMap=new Map(Object.entries(payload.itemsTotal))
		let catlog=state['sidebar'][payload.index]['catlog']
		
		catlog.forEach((obj,idx)=>{
			
			obj.items.forEach((ent,idm)=>{
				//更新各个菜单项的总数
				if(numMap.has(ent.routeStr)){
					ent.itemsTotal=numMap.get(ent.routeStr)
					obj['items'][idm]=ent
				}
				
			})
			catlog[idx]=obj
			
		})
		state['sidebar'][payload.index]['catlog']=catlog
	},
	//使被点中的菜单项的isActive=true，否则为false
	updateSidebarItemsActive(state,payload){
		//let sidebar=state.sidebar
		let routeNow=state.fetchOption.routeStr
		let nameNow=state.navActive.name
		let routeOld=payload.routeOld
		let nameOld=payload.nameOld
		//
		let getPathArr=(name,route)=>{
			let pathArr=[]
			state['sidebar'].forEach((obj,idm)=>{
				if(obj.name==name){
					pathArr.push('sidebar')
					pathArr.push(idm)
					obj['catlog'].forEach((objX,idx)=>{
						
						objX['items'].forEach((objY,idy)=>{
							if(objY.routeStr==route){
								pathArr.push('catlog')
								pathArr.push(idx)
								pathArr.push('items')
								pathArr.push(idy)
								pathArr.push('isActive')
							}
						})
					})
				}
			})
			//console.log(getPathArr(nameOld,routeOld))
			return pathArr
			
		}
		
		//定义递归函数修改指定sidebar的isActive和isPressed。
		let setIsActive=(arr,value,obj)=>{
			let str=Array.isArray(arr)?arr[0]:'none'
			
			//是否有button，有的话设置isPressed
			if(arr[0]=='catlog' && obj[arr[0]][arr[1]]['hasButton']){
				obj[arr[0]][arr[1]]['isPressed']=value
			}
			
			//递归结束条件:arr.length==1
			if(arr.length==1 ){
				//设置item的isActive
				if(arr[0]=='isActive'){obj[str]=value}
				
				return
			}
			
			arr.shift()
			return setIsActive(arr,value,obj[str])
			
		}
		
		let pathOld=getPathArr(nameOld,routeOld)
		let pathNow=getPathArr(nameNow,routeNow)
		
		//任意时刻Sidebar中的Item只有一项的isActive=true
		//任意时刻Sidebar中的button只有一项的isPressed=true
		setIsActive(pathOld,false,state)
		setIsActive(pathNow,true,state)
		
	}
	
}