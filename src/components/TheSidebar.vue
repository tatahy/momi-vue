<template>
<div>
	<div class="py-3 px-1 font18px border-top-0"
		:class="`${borderCls} text-${themeClr}`"
	>
		<font-awesome-icon :icon="sideObj.faIcon" />&nbsp;<span class="font-weight-bold">{{sideObj.caption}}</span>
	</div>
	
	
	<b-nav vertical>
		<div v-for="(cat,catId) in sideObj.catalog" 
			:class="cat.label?`${borderCls} border-top-0`:`border-bottom-0`"
			:key="catId"
		>
			
			<template v-if="cat.hasButton">
			<div class="pb-1 mt-1">
				<!-- 分类菜单隐藏/显示按钮 -->
				<b-button 
					block
					squared
					class="font18px text-left border-0 "
					:class="`${bsvAlignTwoEnds}` "
					
					v-b-toggle="`collapse-${catId}`"
					:variant="`outline-${themeClr}`"
				>
					<template v-if="cat.isPressed">
						<span class="font-weight-bold">[{{cat.label}}] </span>
						<span class="when-opened"><font-awesome-icon :icon="['fas','minus-square']" /></span> 
						<span class="when-closed"><font-awesome-icon :icon="['fas','plus-square']" /></span>
						<!-- <span class="when-opened"><font-awesome-icon :icon="iconFas.minus" /></span>  -->
						<!-- <span class="when-closed"><font-awesome-icon :icon="iconFas.plus" /></span> -->
					
					</template>
						
					<template v-else>
						<!-- <span class="font-italic">{{cat.label}} </span> -->
						<span >{{cat.label}} </span>
						<span class="when-opened"><font-awesome-icon :icon="['far','minus-square']" /></span> 
						<span class="when-closed"><font-awesome-icon :icon="['far','plus-square']" /></span>
						<!-- <span class="when-opened"><font-awesome-icon :icon="iconFar.minus" /></span>  -->
						<!-- <span class="when-closed"><font-awesome-icon :icon="iconFar.plus" /></span> -->
					</template>
				
				</b-button>
			</div>
			<!-- :visible="cat.label?null:true" -->
			<b-collapse 
				:id="`collapse-${catId}`"
				:visible="isVisible(cat.label,catId)"
			>
				
				<TheSideItems
					v-bind:itemsArr='cat.items' 
					v-bind:borderStr='borderCls'
					v-bind:labelStr='cat.label'
					v-bind:alignStr='bsvAlignTwoEnds'
				/>
			</b-collapse>
			</template>
			
			<template v-else>
				<TheSideItems
					v-bind:itemsArr='cat.items' 
					v-bind:borderStr='borderCls'
					v-bind:labelStr='cat.label'
					v-bind:alignStr='bsvAlignTwoEnds'
				/>
			</template>
	
		</div>
	</b-nav>
	
</div>
</template>

<script>
import {
	//静态引入BsV的component
	BNav,
	BButton,
	BCollapse,
	//静态引入BsV定义的directive
	VBToggle

} from 'bootstrap-vue'

import { mapGetters} from 'vuex'

//静态引入fontawesome
import { 
	faPlusSquare as fasPsSqr,
	faMinusSquare as fasMsSqr,
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
import { 
	faPlusSquare as farPsSqr,
	faMinusSquare as farMsSqr
} from '@fortawesome/free-regular-svg-icons'
import { library as faLib} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
faLib.add(
	fasPsSqr, fasMsSqr, faWarehouse, faMountain, faProjectDiagram, faUserGraduate, faChalkboardTeacher, faHSquare, farPsSqr,farMsSqr
)

/*
import { asySetFaIconLibrary as aGetFa, FANAME} from '@/components/util-fontawesome'
//定义要引入的faIcon名称数组
let faObj=Object.assign({},FANAME,{
		fas:[
			'plus-square',
			'minus-square',
			//供给
			'warehouse',
			//需求
			'mountain',
			//项目
			'project-diagram',
			//导师
			'user-graduate',
			//专家
			'chalkboard-teacher',
			//系统
			'h-square'
		],
		far:[
			'plus-square',
			'minus-square',
		]
	})
*/
//console.log(VBToggle)

export default {
	name: 'TheSidebar',
	data(){
		return {
			//bsv中的"d-flex justify-content-between align-items-center"是对button中的内容进行两端对齐
			bsvAlignTwoEnds:"d-flex justify-content-between align-items-center",
			
		}
	},
	computed:{
		borderCls(){
			return `border border-left-0 border-right-0 border-${this.themeClr}`
		},
		...mapGetters({
			//主题颜色
			themeClr:'actNavThemeClr',
			sideObj:'actSidebar'
		}),
	},
	methods: {
		isVisible(str,id){
			let result=true
			
			if(str){
				if(id==0){
					result=true
				}else{
					result=false
				}
			}else{
				result=true
			}
			//console.log(str)
			//console.log(id)
			//console.log(result)
			return result
		},
	},
	components:{
		'b-nav':BNav,
		'b-button':BButton,
		'b-collapse':BCollapse,
		'font-awesome-icon':FontAwesomeIcon,
		//与上一行等效
		//FontAwesomeIcon
		
		TheSideItems:()=>import ('@/components/TheSideItems'),
		
		//异步加载组件
		/*'b-nav':()=>aGetBsv('b-nav'),
		'b-button':()=>aGetBsv('b-button'),
		'b-collapse':()=>aGetBsv('b-collapse'),
		'b-list-group':()=>aGetBsv('b-list-group'),
		'b-list-group-item':()=>aGetBsv('b-list-group-item'),
		'b-badge':()=>aGetBsv('b-badge'),
		'font-awesome-icon':()=>aGetFa(faObj)*/
	},
	directives:{
		//引入BsV定义的directive
		//bToggle:VBToggle
		'b-toggle':VBToggle
		
		
		//异步加载directive??
		//'b-toggle':()=>aGetBsv('VBToggle')
		//'b-toggle':()=>aGetBsv('VBToggle').then(dir=>{return dir})
	},
}
</script>


<style scoped>

.font18px{
	font-size:18px
}

 
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}

/*
.collapsed > .when-opened{
  display: none;
}

:not(.collapsed) > .when-closed {
  display: none;
}
*/
</style>
