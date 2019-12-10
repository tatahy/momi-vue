// root mutations

//import state from './state.js'

//保存App刚开始运行时的state数据
var initData={x:1}

//只能通过commit mutations中的函数才能修改state中的数据
export default {
	//initmothds
	_initNavbar(state){
		state.navbar=initData.navbar
	},
	_initSidebar(state){
		state.sidebar=initData.sidebar
	},
	_initFetchCont(state){
		state.fetchCont=initData.fetchCont
	},
	_initActiveItem(state){
		state.activeItem=initData.activeItem
	},
	initState(state){
		
		console.log(initData)
		initData=state
		console.log(initData)
		return 
	},
	
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

		//initFetchCont
		
		//initSidebar
		
		//initActiveItem

		return 
	},
	updateSidebar(state,index){
		
		let actSidebar=state.sidebar.items[index]
		//后端返回的数据
		let resItems=state.fetchCont.response.hasOwnProperty('items')
					?state.fetchCont.response.items
					:[]
		
		state.sidebar.index=index
		//后端返回的数据存在
		if(resItems.length){
			//
			resItems.forEach(item=>{
				//根据actSidebar.catlog的数据结构进行判断赋值
				//objY.routeStr与objY.label是同一层且都存在
				actSidebar.catlog.forEach((cat,idx)=>{
					let arr=[]
					if(cat.hasOwnProperty('items')){
						cat.items.forEach((objY,idy)=>{
							if(item.routeStr==objY.routeStr){
								arr.push('sidebar')
								arr.push(index)
								arr.push('catlog')
								arr.push(idx)
								arr.push('items')
								arr.push(idy)
								//添加'path'属性值,从sidebar开始的完整路径
								item['path']=arr
								//添加'label'属性值
								item['label']=objY.label
								//更新sidebar的item数据
								objY.total=item.total
							}
						})
					
					}	
				
				})
				
			})
			
		}
		//console.log(state.fetchCont.response.items)
		return
	},
	//更新fetchCont
	updateFetchCont(state,payload){
		state.fetchCont=Object.assign({},state.fetchCont,payload)
		//console.log(payload)
	},
	
	//遍历指定sidebar，修改给定属性的值，
	//前提是sidebar内的所有对象属性名都不同
	setSidebarProps(state,payload){
		let opt=Object.assign({},{index:0,path:[],name:'',val:''},payload)
		//需要遍历的sidebar对象
		let sideObj=state.sidebar.items[opt.index]
		
		//定义递归函数修改指定属性值
		let setPropVal=(name,val,arr,obj)=>{
			if(arr.includes('catlog')){
				arr=arr.slice(arr.indexOf('catlog'))
			}
			
			//递归结束条件，obj中的所有属性名都唯一
			if(obj.hasOwnProperty(name)){
				obj[name]=val
				return true
			}else{
				obj=obj[arr[0]]
				arr.shift()
				return setPropVal(name,val,arr,obj)
			}
		}
		
		//console.log(opt)
		//console.log(state.fetchCont.response)
				
		if((typeof opt.name !='string') || !opt.name.length || !opt.path.length) {
			return false
		}
		//opt.path.slice()，复制opt.path数组内容到新数组
		return setPropVal(opt.name,opt.val,opt.path.slice(),sideObj)
		
			
	}
}