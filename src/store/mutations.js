// root mutations

//import state from './state.js'

//只能通过commit mutations中的函数才能修改state中的数据
export default {
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

		return 
	},
	updateSidebar(state,index){
		state.sidebar.index=index
		return
	},
	//更新fetchCont
	updateFetchCont(state,payload){
		state.fetchCont=Object.assign({},state.fetchCont,payload)
		//console.log(payload)
	}
}