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
						<span class="font-weight-bold">{{cat.caption}} </span>
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
							<span class="font-weight-bold" v-if="ent.itemsTotal">{{ent.itemsTotal}}</span>
							<span v-else >无</span>
						
						</template>
						
						<template v-else>
							<span >{{ ent.label }}</span>
							<b-badge pill
								:variant="themeClr"
								v-if="ent.itemsTotal"
							>{{ent.itemsTotal}}
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
//引入BsV的component
import {
	BNav,
	BButton,
	BCollapse,
	BListGroup,
	BListGroupItem,
	BBadge,
	//引入BsV定义的directive
	VBToggle

} from 'bootstrap-vue'

import {bs4TextColor as colorObj} from '@/conf/common.conf.js'

//引入font awesome
import { 
	faPlusSquare as fasPlus,
	faMinusSquare as fasMinus,
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
	faHSquare,
	
} from '@fortawesome/free-solid-svg-icons'
import { 
	faPlusSquare as farPlus,
	faMinusSquare as farMinus 
} from '@fortawesome/free-regular-svg-icons'
import { library as faLib} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
faLib.add(
	fasPlus,
	fasMinus,
	farPlus,
	farMinus,
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
	faHSquare,	
)

import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'

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
		//activeNav对应的sidebar内容
			/*resItems:state=>state.fetchCont.response.hasOwnProperty('items')?
								state.fetchCont.response.items:
								[],*/
			routeStr:state=> state.fetchCont.option.routeStr,
			//sidebar:state => sideArr[state.sideActive.index],
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
				
			//得到routeNow对应的item在actSidebar中的完整路径
			let getPathArr=route=>{
				let arr=[]
				self.sideObj.catlog.forEach((cat,idx)=>{
					if(cat.hasOwnProperty('items')){
						cat.items.forEach((item,idy)=>{
							if(item.routeStr==route){
								arr.push('catlog')
								arr.push(idx)
								arr.push('items')
								arr.push(idy)
							}
						})
					}	
				
				})
				return arr
			}
			let opt={index:self.index,path:[],name:'',val:''}
			
			if(routeNow!==routeOld){
				//将fetchCont.option.routeStr修改为routeNow
				self.changeRouteStr({routeStr:routeNow})
				
				//将sidebar中所有item的isActive=false
				self.resItems.forEach(itm=>{
					opt.name='isActive'
					opt.val=false
					opt.path=itm.path
					self.setPropVal(opt)
				})
				
				//任意时刻Sidebar中的Item只有一项的isActive=true
				opt.name='isActive'
				opt.val=true
				opt.path=getPathArr(routeNow)
				self.setPropVal(opt)
				
				//将sidebar中所有button的isPressed=false
				self.resItems.forEach(itm=>{
					opt.name='isPressed'
					opt.val=false
					opt.path=itm.path
					self.setPropVal(opt)
				})
				
				//任意时刻Sidebar中的button只有一项的isPressed=true
				opt.name='isPressed'
				opt.val=true
				opt.path=getPathArr(routeNow)
				self.setPropVal(opt)
				
			}
		},
		... mapMutations({
			setPropVal:'setSidebarProps'
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
		FontAwesomeIcon
		//'font-awesome-icon':FontAwesomeIcon
	},
	directives:{
		//引入BsV定义的directive
		bToggle:VBToggle
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
