//getters


export default {
	//主题颜色
	actNavThemeClr:state=>{
		let nav=state.navbar
		let actNav=nav.items[nav.index]
		
		return actNav.props.themeClr
						
	},
	actNavLabel:state=>{
		let nav=state.navbar
		let actNav=nav.items[nav.index]
		
		return actNav.props.label
						
	},
	resItems:state=>state.fetchCont.response.hasOwnProperty('items')?
								state.fetchCont.response.items:
								[],
	
	// resItemsComplete:state=>{
		// let items=state.fetchCont.response.hasOwnProperty('items')?
								// state.fetchCont.response.items:
								// []
		// let actSidebar=state.sidebar.items[state.sidebar.index]
		
		/*
		//得到在actSidebar中的访问路径
		let getPathArr=route=>{
			let arr=[]
			actSidebar.catlog.forEach((objX,idx)=>{
				if(objX.hasOwnProperty('items')){
					objX.items.forEach((objY,idy)=>{
						if(objY.routeStr==route){
							arr.push('catlog')
							arr.push(idx)
							arr.push('items')
							arr.push(idy)
						
						}
					})
					
				}	
				
			})
			return arr
		}
		
		//递归函数得到item的routeStr对应的label
		let getItemLabel=(arr,route,obj)=>{
				obj=obj[arr[0]]
				if(arr.length>1){
					arr.shift()
					return getItemLabel(arr,route,obj)
				}
				
				//递归结束条件，obj.routeStr与obj.label是同一层级且都存在
				if(arr.length==1){
					return obj.routeStr==route?obj.label:''
				}
			
			}
		
		if(items.length){
			items.forEach(item=>{
				//添加'path'属性值
				item['path']=getPathArr(item.routeStr)
				//添加'label'属性值
				item['label']=item.path.length
								//item.path.slice()重新复制一个数组，
								//因为js中数组的赋值是按引用传值
								?getItemLabel(item.path.slice(),item.routeStr,actSidebar)
								:''
			})
		}			
		*/
		
		/*
		if(items.length){
			items.forEach(item=>{
				//根据actSidebar.catlog的数据结构进行判断赋值
				//objY.routeStr与objY.label是同一层且都存在
				actSidebar.catlog.forEach((objX,idx)=>{
					let arr=[]
					if(objX.hasOwnProperty('items')){
						objX.items.forEach((objY,idy)=>{
							if(item.routeStr==objY.routeStr){
								arr.push('catlog')
								arr.push(idx)
								arr.push('items')
								arr.push(idy)
								//添加'path'属性值
								item['path']=arr
								//添加'label'属性值
								item['label']=objY.label
							}
						})
					
					}	
				
				})
				
			})
			
		}
		*/
		// return items
		
	// },
	
	
}