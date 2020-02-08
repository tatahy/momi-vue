// root mutations

//import state from './state.js'

//得到route对应的item在sideObj中的完整路径
function _getSidebarEntryPathArr(routeStr,sideObj){
	let arr=[]
	sideObj.catalog.forEach((cat,idM)=>{
		if(cat.hasOwnProperty('items')){
			cat.items.forEach((item,idN)=>{
				if(item.routeStr==routeStr){
					arr=['catalog',idM,'items',idN]
				}
			})
		}	
				
	})
	return arr
} 

//定义递归函数修改指定属性值
function _setSidebarEntryPropVal(name,val,arr,obj){
	if(arr.includes('catalog')){
		arr=arr.slice(arr.indexOf('catalog'))
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


//只能通过commit mutations中的函数才能修改state中的数据
export default {
	
	//update
	updateNavbar:function(state,index){
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
	updateSidebar:function(state,index){
		
		let actSidebar=state.sidebar.items[index]
		//后端返回的数据
		let resItems=this.getters.resItems
		
		state.sidebar.index=index
		//后端返回的数据存在
		if(resItems.length){
			//
			resItems.forEach(item=>{
				//根据actSidebar.catlog的数据结构进行判断赋值
				actSidebar.catalog.forEach((cat,idM)=>{
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
								obj['path']=['sidebar','items',index,'catalog',idM,'items',idN]
								
							}
						})
					
					}	
				
				})
				
			})
			
		}
		//重置activeItem
		//this.commit('updateActiveEntry',{index:index})
		
		
		//console.log(state.fetchCont.response.items)
		return
	},
	//更新fetchCont
	updateFetchCont:function(state,payload){
		state.fetchCont=Object.assign({},state.fetchCont,payload)
		//console.log(payload)
	},
	
	
	updateActiveEntry:function(state,payload={routeStr:'',index:0}){
		let index=payload.hasOwnProperty('index')?payload.index:-1
		let routeStr=payload.hasOwnProperty('routeStr')?payload.routeStr:''
		let itemDefault={
				isActive:false,
				label:'',
				path:[],
				routeStr:'',
				total:'',
			}

		let sideObj=index!=-1?state.sidebar.items[index]:itemDefault
		let path=routeStr.length?_getSidebarEntryPathArr(routeStr,sideObj):''	
		
		let getEntry=(arr,obj)=>{
			arr.forEach(el=>{
				obj=obj[el]
			})
			return obj
		}
		
		let actEntry=state.sidebarEntry.active
		//let preEntry=state.sidebarEntry.prev
		
		
		if(actEntry.hasOwnProperty('isActive') && actEntry.isActive ){
			actEntry.isActive=false
			state.sidebarEntry.prev=actEntry
		} 
		
		if(Array.isArray(path)){
			/* 
			console.log(state.sidebarEntry.active.isActive)//==fasle
			*/
			
			if(actEntry.label){
				state.sidebarEntry.prev=actEntry
			} 
			state.sidebarEntry.active=getEntry(path,sideObj)
			
			/* 
			console.log(state.sidebarEntry.active.isActive)//==true
			
			*/
		}else{
		
			state.sidebarEntry.active=itemDefault
		}
		
		this.commit('setSidebarProps',{
			'index':index,
			'routeStr':routeStr,
			props:[
				//任意时刻Sidebar中的Item只有一项的isActive=true
				//任意时刻Sidebar中的button只有一项的isPressed=true
				{name:'isActive',val:true},
				{name:'isPressed',val:true}
			]}
		)
		
		return 
		
	},
	//更新isBriefContent
	updateIsBriefContent:function(state,val){
		state.isBriefContent=val
		
		/* if(val){
			
			this.commit('updateActiveEntry')
		}
			 */
		return
		
		//console.log(payload)
	},
	
	//遍历指定sidebar，修改给定属性的值，
	//前提是sidebar内的所有对象属性名都不同
	setSidebarProps:function(state,payload){
		let opt=Object.assign({},{index:0,routeStr:'',props:{}},payload)
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
			pathArr=_getSidebarEntryPathArr(opt.routeStr,sideObj)
			//调用递归函数
			_setSidebarEntryPropVal(prop.name,prop.val,pathArr,sideObj)
		
		})
			
		return 
	}
}