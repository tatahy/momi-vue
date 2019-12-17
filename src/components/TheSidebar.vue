<template>
<div>
	<div class="py-3 px-1 font18px border-top-0"
		:class="`${borderCls} text-${themeClr}`"
	>
		<font-awesome-icon :icon="sideObj.faIcon" />&nbsp;<span class="font-weight-bold">{{sideObj.caption}}</span>
	</div>


	<b-nav vertical>
		
	<!-- 	<b-nav-item variant="active">Active</b-nav-item>
		<b-nav-item>Link</b-nav-item>
		<b-nav-item disabled>Disabled</b-nav-item> -->
		
		
		<div v-for="(cat,catId) in sideObj.catlog" 
			:class="cat.caption?`${borderCls} border-top-0`:`border-bottom-0`"
			:key="catId"
		>
			<!-- 此div的作用是给button扩充外围空间，当button点击时不与外围的框线重合-->
			<div class="pb-1 mt-1"
				v-if="cat.hasButton"
			>
				<!-- 分类菜单隐藏/显示按钮 :pressed="cat.isPressed"-->
				<b-button 
					block
					squared
					class="font18px text-left border-0 "
					:class="`${bsvAlignTwoEnds}` "
					
					v-b-toggle="`collapse-${catId}`"
					:variant="`outline-${themeClr}`"
				>
					<template v-if="cat.isPressed">
						<span class="font-weight-bold">[{{cat.caption}}] </span>
						<span class="when-opened"><font-awesome-icon :icon="['fas','minus-square']" /></span> 
						<span class="when-closed"><font-awesome-icon :icon="['fas','plus-square']" /></span>
						<!-- <span class="when-opened"><font-awesome-icon :icon="iconFas.minus" /></span>  -->
						<!-- <span class="when-closed"><font-awesome-icon :icon="iconFas.plus" /></span> -->
					
					</template>
						
					<template v-else>
						<!-- <span class="font-italic">{{cat.caption}} </span> -->
						<span >{{cat.caption}} </span>
						<span class="when-opened"><font-awesome-icon :icon="['far','minus-square']" /></span> 
						<span class="when-closed"><font-awesome-icon :icon="['far','plus-square']" /></span>
						<!-- <span class="when-opened"><font-awesome-icon :icon="iconFar.minus" /></span>  -->
						<!-- <span class="when-closed"><font-awesome-icon :icon="iconFar.plus" /></span> -->
					</template>
				
				</b-button>
			</div>
			<!-- :visible="cat.caption?null:true" -->
			<b-collapse 
				:id="`collapse-${catId}`"
				:visible="isVisible(cat.caption,catId)"
			>
				<b-list-group>
					<!-- 此div的作用是给b-list-group-item加框线-->
					<div class="pt-1 pb-1"
						v-for="(ent, idx) in cat.items"
						:key="idx"
						:class="cat.caption?`ml-3 border-bottom-0 ${borderCls}`:`border-top-0 ${borderCls}`"
						:style="{width:cat.caption?`180px`:null}"
					>
					<!-- 各个sidebar中的item按钮
					@click="changeTable({
							fetchOption:{routeStr:ent.routeStr},
							isBriefContent:false,
							table:{subTitle:ent.label},
						})""
						
					@click="itemClick(ent.routeStr)"
					-->
					<b-list-group-item 
						button
						class="py-1 rounded-0 border-0"
						:active="ent.isActive"
						:class="bsvAlignTwoEnds"
						:style="setBackgroundClr(ent.isActive)"
						@click="itemClick(ent.routeStr)"
						
					>
						
						<!-- :variant="ent.isActive?null:themeClr"  -->
						
						<template v-if="ent.isActive">
							<span class="font-weight-bold">{{ ent.label }}</span>
							<span class="font-weight-bold" v-if="ent.total">{{ent.total}}</span>
							<span v-else >无</span>
						
						</template>
						
						<template v-else>
							<span >{{ ent.label }}</span>
							<b-badge pill
								:variant="themeClr"
								v-if="ent.total"
							>{{ent.total}}
							</b-badge> 
							<span v-else class="text-muted">无</span>
						
						</template>
						
						
					</b-list-group-item>
					</div>

				</b-list-group>
			</b-collapse>
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
	BListGroup,
	BListGroupItem,
	BBadge,
	
	//静态引入BsV定义的directive
	VBToggle

} from 'bootstrap-vue'

import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'

//import { asyGetBsvComponent as aGetBsv} from '@/components/util-bootstrap-vue'


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
faLib.add(fasPsSqr,fasMsSqr,faWarehouse,faMountain,faProjectDiagram,
		faUserGraduate,faChalkboardTeacher,faHSquare,
		farPsSqr,farMsSqr)

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
import {bs4TextColor as colorObj} from '@/conf/common.conf.js'

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
		
		...mapState({
			routeStr:state=> state.fetchCont.request.routeStr,
			index:state=>state.sidebar.index,
			sideObj:state=>state.sidebar.items[state.sidebar.index],
			
		}),
		...mapGetters({
			//主题颜色
			themeClr:'actNavThemeClr',
			resItems:'resItems'
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
			
			//console.log(id)
			return result
		},
		setBackgroundClr(isActive){
			let clrValue=isActive?colorObj[this.themeClr]:'#fff'
			//console.log(this.sidebar)
			//console.log(isActive)
			return {backgroundColor:clrValue}
		},
		//根据routeNow找到对应的path，
		//再由path访问sidebar修改对应的isActive,isPressed等属性
		itemClick(routeNow){
			let self=this
			let routeOld=self.routeStr

			//let opt={index:self.index,route:routeNow,name:'',val:''}
			
			let opt={
					index:self.index,
					route:routeNow,
					props:[]
				}
					
			if(routeNow!==routeOld){
				//将fetchCont.request.routeStr修改为routeNow
				self.changeRouteStr({routeStr:routeNow})
				
				//任意时刻Sidebar中的Item只有一项的isActive=true
				//任意时刻Sidebar中的button只有一项的isPressed=true
				opt.props=[
					{name:'isActive',val:true},
					{name:'isPressed',val:true}
				]
				self.setProps(opt)
				
				self.changeEntry({route:routeNow,index:self.index})
				
				self.setIsBriefContent(false)
			}
		},
		... mapMutations({
			setPropVal:'setSidebarProps',
			setProps:'setSidebarProps',
			setIsBriefContent:'updateIsBriefContent',
			changeEntry:'updateActiveEntry',
			
		}),		
		... mapActions({
			changeRouteStr:'asyUpdateFetchCont'
			
		})
	},
	components:{
		
		'b-nav':BNav,
		'b-button':BButton,
		'b-collapse':BCollapse,
		'b-list-group':BListGroup,
		'b-list-group-item':BListGroupItem,
		'b-badge':BBadge,
		'font-awesome-icon':FontAwesomeIcon,
		//与上一行等效
		//FontAwesomeIcon
		
		
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
	/*
	created(){
	//mounted(){
		console.log(this.resItems)
		console.log(this.index)
		console.log(this.sidebar)
		//this.updateItemsTotal()
	}
	*/
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
