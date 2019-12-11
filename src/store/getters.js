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
	actSidebar:state=>state.sidebar.items[state.sidebar.index],
	resItems:state=>state.fetchCont.response.hasOwnProperty('items')?
								state.fetchCont.response.items:
								[],
}