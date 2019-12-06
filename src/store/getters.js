//getters


export default {
	//主题颜色
	actNavThemeClr:state=>{
		let nav=state.navbar
		let actNav=nav.items[nav.index]
		let props=actNav.props
		return props.themeClr
						
	},
	
	
}