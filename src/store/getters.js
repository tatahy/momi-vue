//getters


export default {
	//主题颜色
	actNavThemeClr:state=>{
		let nav=state.navbar
		let actNav=nav.items[nav.index]
		
		return actNav.props.themeClr
		
		//return this.actNav.themeClr
						
	},
	actNavLabel:state=>{
		let nav=state.navbar
		let actNav=nav.items[nav.index]
		
		return actNav.props.label
						
	},
	actNavbar:state=>{
		let nav=state.navbar
		let actNav=nav.items[nav.index]
		
		return {
			label:actNav.props.label,
			themeClr:actNav.props.themeClr,
			routeStr:actNav.props.routeStr
		}
		
	},
	actSidebar:state=>state.sidebar.items[state.sidebar.index],
	actEntry:state=>state.sidebarEntry.active,
	/* actEntryLabel:state=>{
		let actEntry=state.sidebarEntry.active
		
		return actEntry.isActive?actEntry.label:''
		
	}, */
	
	//首页加载时有可能为空数组，因为fethchCont通过fetch异步从后端拿数据
	resItems:state=>state.fetchCont.response.items
}