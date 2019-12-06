<template>
<div>
	<div class="py-3 px-1 font18px border-top-0"
		:class="`${borderCls} text-${themeClr}`"
	>
		<font-awesome-icon :icon="sidebar.faIcon" />&nbsp;<span class="font-weight-bold">{{sidebar.caption}}</span>
	</div>


	<b-nav vertical>
		
	<!-- 	<b-nav-item variant="active">Active</b-nav-item>
		<b-nav-item>Link</b-nav-item>
		<b-nav-item disabled>Disabled</b-nav-item> -->
		
		
		<div v-for="(cat,catId) in sidebar.catlog" 
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

import { mapState,mapActions } from 'vuex'

export default {
	name: 'TheSidebar',
	data(){
		return {
			//bsv中的"d-flex justify-content-between align-items-center"是对button中的内容进行两端对齐
			bsvAlignTwoEnds:"d-flex justify-content-between align-items-center",
			index:0
		}
	},
	computed:{
		borderCls(){
			return `border border-left-0 border-right-0 border-${this.themeClr}`
		},
		
		...mapState({
		//activeNav对应的sidebar内容
			briefItems:state=>state.fetchData.response.hasOwnProperty('items')?
								state.fetchData.response.items:
								[],
			routeStr:state=> state.fetchOption.routeStr,
			//sidebar:state => sideArr[state.sideActive.index],
			sidebar:state=>state.sidebar.items[state.navbar.index],
			//主题颜色
			themeClr: state=>{
				let nav=state.navbar
				let actNav=nav.items[nav.index]
				let props=actNav.props
				return props.themeClr
						
			},
			
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
		itemClick(routeNow){
			let self=this
			let routeOld=self.routeStr
			
			/*
			console.log(routeOld)
			console.log(routeNow)
			*/
			
			if(routeNow!==routeOld){
				//整个sidebar中的所有item的active=false
				//触发click事件的item的active=true
				self.updateItemActive(routeNow)
				self.updateItemsTotal()
				
				//判断state中的内容是否更新
				//self.updateState(routeNow)
	
				//判断是否更新table
				//self.updateTable(routeNow)
			}
		},
		//得到添加所有item在sidebar中的访问路径数组后的items		
		_addItemPathArr(){
			let self=this
			let sidebar=self.sidebar
			//Array.slice()才是数组的复制方法，
			//arrA=arrB只是arrA引用arrB的地址
			let items=self.briefItems.slice()
			let path=[]
			
			items.forEach(item=>{
			
				sidebar.catlog.forEach((objX,idx)=>{
					
					objX.items.forEach((objY,idy)=>{
					
						if(objY.routeStr==item.routeStr){
							path=[]
							path.push('catlog')
							path.push(idx)
							path.push('items')
							path.push(idy)
						
							item['path']=path
						}
					})
				})
			})
			
			
			return items
		},		
		//任意时刻Sidebar中的Items最多只有一项的isActive=true
		updateItemActive(routeNow){
			let self=this
			let sidebar=self.sidebar
			let items=self._addItemPathArr()
			let truePath=[]
			
			//定义递归函数修改指定sidebar的isActive和isPressed。
			let setIsActive=(arr,value,obj)=>{
				let str=Array.isArray(arr)?arr[0]:'none'		
				//console.log(arr)
				
				//是否有button，有的话设置isPressed
				if(obj.hasOwnProperty('hasButton')){
					obj['isPressed']=value
				}
			
				//递归结束条件
				if(obj.hasOwnProperty('isActive')){
					obj.isActive=obj.routeStr==routeNow?value:false
					//console.log(routeNow)
					return
				}
		
				arr.shift()
				return setIsActive(arr,value,obj[str])
			
			}
			
			items.forEach(item=>{
				let arr=item.path
				let start=arr.includes('catlog')?arr.indexOf('catlog'):0
				let arrTemp=arr.slice(start)
				//触发click事件的item的path
				if(item.routeStr==routeNow){
					truePath=arr.slice(start)
				}
			
				//将所有的item的active=false
				setIsActive(arrTemp,false,sidebar)
			})
			
			//触发click事件的item的active=true
			if(truePath.length)setIsActive(truePath,true,sidebar)
		},
		updateItemsTotal(){
			let catlog=this.sidebar.hasOwnProperty('catlog')?
						this.sidebar.catlog:{}
	
			console.log(catlog)
			console.log(this.briefItems)
			console.log('updateItemsTotal()')
			
			catlog.forEach((obj,idx)=>{
				obj.items.forEach(ent=>{
					//console.log(ent)
					//更新各个菜单项的总数
					this.briefItems.forEach(objB=>{
						if(ent.routeStr==objB.routeStr){
							ent.itemsTotal=objB.total
						
						}
					
					})
				
				})
				catlog[idx]=obj
			})
		
		},
	
		... mapActions({
			//changeTable: 'asyChangeTable'
			
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
	//created(){
	mounted(){
		//console.log(this.sidebar.catlog)
		this.updateItemsTotal()
	}
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
