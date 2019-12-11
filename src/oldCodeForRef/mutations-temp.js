// root mutations

//import state from './state.js'

//只能通过commit mutations中的函数才能修改state中的数据
export default {
	initState(state,payload){
		let hasActiveNav=payload.hasOwnProperty('activeNav')?true:false
		let hasActiveSidebar=payload.hasOwnProperty('activeSidebar')?true:false
		
		if(hasActiveNav){
			this.commit('updateActiveNav',payload.activeNav)
		}
		
		if(hasActiveSidebar){
			this.commit('updateActiveSidebar',payload.activeSidebar)
			//this.commit('updateActiveSideItem')
		}
		
	},
	//update
	updateNavbar(state,index){
		let navArr=state.navbar.items
		
		state.navbar.index=index
		
		//将index对应的navbar.items[index]的isActive设为true
		//其余的都为false
		navArr.forEach((obj,idx)=>{
			obj.props.isActive=false
			if(idx==index){
				obj.props.isActive=true
			}
		})
		console.log(index)
	},
	updateActiveNav(state,payload){
		state.activeNav=Object.assign({},state.activeNav,payload)
		//console.log(payload)
		
	},
	updateActiveSidebar(state,payload){
		state.activeSidebar=Object.assign({},state.activeSidebar,payload)
		//console.log(payload)
	},
	updateFetchOption(state,payload){
		state.fetchOption=Object.assign({},state.fetchOption,payload)
		//console.log(payload)
	},
	updateFetchData(state,payload){
		state.fetchData=Object.assign({},state.fetchData,payload)
		//console.log(payload)
	},
	
	//
	changeEntity(state,payload){
		state.entity=Object.assign({},state.entity,payload)
		
		//console.log(payload)
	},
	changeTable(state,payload){
		state.table=Object.assign({},state.table,payload)
		
		/* console.log('mutation.changeTable => ')
		console.log(state.table) */
	},
	changeFetchOption(state,payload){		
		/* let result=false
		if(payload.routeStr!=state.fetchOption.routeStr){
			state.fetchOption=Object.assign({},state.fetchOption,payload)
			result=true
		}
		return result */
		
		state.fetchOption=Object.assign({},state.fetchOption,payload)
		
	},
	updateSideActiveItemActive(state,payload){
		/* state.sideActive.itemActive.label=payload.label
		state.sideActive.itemActive.routeStr=payload.routeStr */
		
		let itemActive=state.sideActive.itemActive
		
		return itemActive=Object.assign({},itemActive,payload)
	},
	
	changeNavActive(state,payload){
		state.navActive=Object.assign({},state.navActive,payload)
		return state.navActive
	},
	changeIsBriefContent(state,payload){
		state.isBriefContent=payload['value']
		return payload['value']
	},
	changeIsNavChanged(state,payload){
		state.isNavChanged=payload['value']
		
	},
	//
	updateNavActive(state,payload){
		let result=false
		let navbar=state.navbar
		let name=state.entity.name
		
		
		navbar.forEach(obj=>{
			//所有navbar中的isActive设为false
			obj['props']['isActive']=false
			if(obj.name==name){
				obj['props']['isActive']=true
				result=true	
			}
			//设定navActive的值
			state.navActive=Object.assign({},state.navActive,payload)	
		})
		return result
	},
	//更新navActive之后更新sideActive
	updateSideActive(state){
		let result=false
		let routeStr=state.fetchOption.routeStr
		let sideActive=state.sideActive
		let itemActive=state.itemActive
		let entName=state.entity.name
		
		let labels=sideActive.items.labels=[]
		let totals=sideActive.items.totals=[]
		let routeStrs=sideActive.items.routeStrs=[]
		let paths=sideActive.items.paths=[]
	
		
		state.sidebar.forEach((obj,idx)=>{
			
			if(obj.name==entName){
				sideActive.index=idx
				sideActive.caption=obj.caption 
				
				
				obj.catlog.forEach((cat,idM)=>{
					
					cat.items.forEach((item,idN)=>{
						let pathArr=[]
						
						pathArr.push('sidebar')
						pathArr.push(idx)
						pathArr.push('catlog')
						pathArr.push(idM)
						pathArr.push('items')
						pathArr.push(idN)
						
						labels.push(item.label)
						totals.push(item.itemsTotal)
						routeStrs.push(item.routeStr)
						paths.push(pathArr)
						
						if(routeStr==item.routeStr){
							itemActive.path=pathArr
							itemActive.index=idN
							itemActive.label=item.label
							itemActive.routeStr=item.routeStr
							
						}
						
						
					})
					
				})
				
				
			}
		})
		
		
		
		//console.log(payload)
		
		return result
	},
	//更新payload.index对应的sidebar中各个菜单项的总数
	/* updateSidebarItemsTotal(state,payload){
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
	}, */
	updateSidebarItemsTotal(state){
		let items=state.entity.brief.items
		let entName=state.entity.name
		let catlog={}
		
		state.sidebar.forEach(obj=>{
			if(obj.name==entName){
				catlog=obj.catlog
			}
		})
	
		catlog.forEach((obj,idx)=>{
			obj.items.forEach(ent=>{
				//console.log(ent)
				//更新各个菜单项的总数
				items.forEach(objB=>{
					if(ent.routeStr==objB.routeStr){
						ent.itemsTotal=objB.total
						
					}
					
				})
				
			})
			catlog[idx]=obj
		})
		
	},
	/* 
	//使被点中的菜单项的isActive=true，否则为false
	updateSidebarItemsActive(state,payload){
		//let sidebar=state.sidebar
		let routeNow=state.fetchOption.routeStr
		let nameNow=state.entity.name
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
			
			return pathArr
			
		}
		
		//定义递归函数修改指定sidebar的isActive和isPressed。
		let setIsActive=(arr,value,obj)=>{
			let str=Array.isArray(arr)?arr[0]:'none'
			//let sideActive=state.sideActive
			
			//是否有button，有的话设置isPressed
			if(arr[0]=='catlog' && obj[arr[0]][arr[1]]['hasButton']){
				obj[arr[0]][arr[1]]['isPressed']=value
			}
			
			//递归结束条件:arr.length==1
			if(arr.length==1 ){
				//设置item的isActive
				if(arr[0]=='isActive'){obj[str]=value}
				
				if(value){
						
						//更新table.subTitle
						state.table.subTitle=obj.label
						//更新sideActive.itemActive
						this.commit('updateSideActiveItemActive',obj)
					}
				
				return
			}
			
			arr.shift()
			return setIsActive(arr,value,obj[str])
			
		}
		
		let pathOld=getPathArr(nameOld,routeOld)
		let pathNow=getPathArr(nameNow,routeNow)
		
		// console.log('payload: ')
		// console.log(payload)
		// console.log('pathOld: '+pathOld)
		// console.log('pathNow: '+pathNow) 
		
		//任意时刻Sidebar中的Item只有一项的isActive=true
		//任意时刻Sidebar中的button只有一项的isPressed=true
		setIsActive(pathOld,false,state)
		setIsActive(pathNow,true,state)
		
	}
	 */
}