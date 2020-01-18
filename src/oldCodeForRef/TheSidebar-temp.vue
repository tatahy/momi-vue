<template>
<div>
	<div class="py-3 px-1 font18px border-top-0"
		:class="`${borderCls} text-${themeClr}`"
	>
		<font-awesome-icon :icon="sideObj.faIcon" />&nbsp;<span class="font-weight-bold">{{sideObj.caption}}</span>
	</div>
	
	<TheSideItems
		catlogArr=sideObj.catlog
		borderStr=borderCls
		themeStr=themeClr
	/>

</div>
</template>

<script>

import { mapState,mapGetters} from 'vuex'

//静态引入fontawesome
import { 
	//供给
	faWarehouse,
	//需求
	faMountain,
	//项目
	faProjectDiagram,
	//导师
	faUserGraduate,
	//专家
	faChalkboardTeacher,
	//系统
	faHSquare
} from '@fortawesome/free-solid-svg-icons'
import { library as faLib} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
faLib.add(faWarehouse,faMountain,faProjectDiagram,
		faUserGraduate,faChalkboardTeacher,faHSquare,)

//console.log(VBToggle)

export default {
	name: 'TheSidebar',
	computed:{
		borderCls(){
			return `border border-left-0 border-right-0 border-${this.themeClr}`
		},
		
		...mapState({
			sideObj:state=>state.sidebar.items[state.sidebar.index],
			
		}),
		...mapGetters({
			//主题颜色
			themeClr:'actNavThemeClr',
			
		}),
	},
	components:{
		'font-awesome-icon':FontAwesomeIcon,
		TheSideItems:()=>import ('@/components/TheSideItems'),
		//与上一行等效
		//FontAwesomeIcon
	},
}
</script>


<style scoped>

.font18px{
	font-size:18px
}


</style>
