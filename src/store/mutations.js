// root mutations

//import state from './state.js'

//得到route对应的item在sideObj中的完整路径
var _getSidebarEntryPathArr=(route,sideObj)=>{
	let arr=[]
	sideObj.catlog.forEach((cat,idM)=>{
		if(cat.hasOwnProperty('items')){
			cat.items.forEach((item,idN)=>{
				if(item.routeStr==route){
					arr=['catlog',idM,'items',idN]
				}
			})
		}	
				
	})
	return arr
} 

//定义递归函数修改指定属性值
var _setSidebarEntryPropVal=(name,val,arr,obj)=>{
	if(arr.includes('catlog')){
		arr=arr.slice(arr.indexOf('catlog'))
	}
			
	//递归结束条件，obj中的所有属性名都唯一
	if(obj.hasOwnProperty(name)){
		
		obj[name]=val
		
		if(name=='isPressed'){
			obj['isPressed']=obj['hasButton']?val:false
		}
			
		arr=null
		return true
	}else{
		obj=obj[arr[0]]
		arr.shift()
		return _setSidebarEntryPropVal(name,val,arr,obj)
	}
}

/* _getStateObjByPath(state,path){
		let obj=state
		
		if(!Array.isArray(path)){
			return false
		}
		
		path.forEach(el=>{
			obj=obj[el]
		})
		
		console.log(obj)
		
		return obj
	}, */

//只能通过commit mutations中的函数才能修改state中的数据
export default {
	
	//update
	updateNavbar(state,index){
		let navArr=state.navbar.items
		
		//console.log(state)

		state.navbar.index=index
		
		//将index对应的navbar.items[index]的isActive设为true
		//其余的都为false
		navArr.forEach((obj,idx)=>{
			obj.props.isActive=false
			if(idx==index){
				obj.props.isActive=true
			}
		})

		return 
	},
	updateSidebar(state,index){
		
		let actSidebar=state.sidebar.items[index]
		//后端返回的数据
		let resItems=this.getters.resItems
		
		state.sidebar.index=index
		//后端返回的数据存在
		if(resItems.length){
			//
			resItems.forEach(item=>{
				//根据actSidebar.catlog的数据结构进行判断赋值
				actSidebar.catlog.forEach((cat,idM)=>{
					if(cat.hasOwnProperty('items')){
						//重置isPressed=false	
						cat.isPressed=false
						cat.items.forEach((obj,idN)=>{
							if(obj.routeStr==item.routeStr){
								//更新total
								obj.total=item.total
								//重置isActiv=false	
								obj.isActive=false
						
								//添加item在state.sidebar中的完整路径
								obj['path']=['sidebar','items',index,'catlog',idM,'items',idN]
								
							}
						})
					
					}	
				
				})
				
			})
			
		}
		//重置activeItem
		this.commit('updateActiveEntry')
		
		
		//console.log(state.fetchCont.response.items)
		return
	},
	//更新fetchCont
	updateFetchCont(state,payload){
		state.fetchCont=Object.assign({},state.fetchCont,payload)
		//console.log(payload)
	},
	updateActiveEntry(state,payload={route:'',index:0}){
		let index=payload.hasOwnProperty('index')?payload.index:-1
		let route=payload.hasOwnProperty('route')?payload.route:''
		let itemDefault={
				isActive:false,
				label:'',
				path:[],
				routeStr:'',
				total:'',
			}

		let sideObj=index!=-1?state.sidebar.items[index]:itemDefault
		let path=route.length?_getSidebarEntryPathArr(route,sideObj):''	
		
		let getEntry=(arr,obj)=>{
			arr.forEach(el=>{
				obj=obj[el]
			})
			return obj
		}
		
		if(Array.isArray(path)){
			/* 
			console.log(state.sidebarEntry.active.isActive)//==fasle
			*/
				
			if(state.sidebarEntry.active.label.length){
				state.sidebarEntry.prev=state.sidebarEntry.active
			} 
			
			state.sidebarEntry.active=getEntry(path,sideObj)
			
			/* 
			console.log(state.sidebarEntry.active.isActive)//==true
			
			*/
		}else{
			state.sidebarEntry.active=itemDefault
		}
		
		return
		
	},
	//遍历指定sidebar，修改给定属性的值，
	//前提是sidebar内的所有对象属性名都不同
	setSidebarProps(state,payload){
		let opt=Object.assign({},{index:0,route:'',props:{}},payload)
		//需要遍历的sidebar对象
		let sideObj=state.sidebar.items[opt.index]
		let resItems=this.getters.resItems
		let pathArr=[]
		
		
		if(!opt.props.length) {
			return false
		}
		
		/* console.log(payload)
		console.log(resItems) */
		
		opt.props.forEach(prop=>{
			
			//sidebar中所有entry的isActive=false
			//sidebar中所有button的isPressed=false
			if(prop.name=='isActive' || prop.name=='isPressed'){
				resItems.forEach(itm=>{
					//递归函数所需参数
					pathArr=_getSidebarEntryPathArr(itm.routeStr,sideObj)
					//调用递归函数
					_setSidebarEntryPropVal(prop.name,false,pathArr,sideObj)
				})	
			}
			//递归函数所需参数
			pathArr=_getSidebarEntryPathArr(opt.route,sideObj)
			//调用递归函数
			_setSidebarEntryPropVal(prop.name,prop.val,pathArr,sideObj)
		
		})
			
		return 
	}
}