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
					
					</template>
						
					<template v-else>
						<span class="font-italic">{{cat.caption}} </span>
						<span class="when-opened"><font-awesome-icon :icon="['far','minus-square']" /></span> 
						<span class="when-closed"><font-awesome-icon :icon="['far','plus-square']" /></span>
					</template>
					
					
				
				<!-- 	<span class="when-opened"><font-awesome-icon :icon="[cat.isPressed?'fas':'far','minus-square']" /></span> 
					<span class="when-closed"><font-awesome-icon :icon="[cat.isPressed?'fas':'far','plus-square']" /></span> -->
					
					<!-- <span class="when-opened"><font-awesome-icon :icon="cat.isPressed?['fas','minus-square']:['fas','minus']" /></span> 
					<span class="when-closed"><font-awesome-icon :icon="cat.isPressed?['fas','plus-square']:['fas','chevron-down']" /></span> -->

				
				</b-button>
			</div>
			
			<b-collapse 
				:id="`collapse-${catId}`"
				:visible="cat.caption?null:true"
			>
				<b-list-group>
					<!-- 此div的作用是给b-list-group-item加框线-->
					<div class="pt-1 pb-1"
						v-for="(ent, idx) in cat.items"
						:key="idx"
						:class="cat.caption?`ml-3 border-bottom-0 ${borderCls}`:`border-top-0 ${borderCls}`"
						:style="{width:cat.caption?`180px`:null}"
					>
					<!-- 系统实体按钮
					
					variant="themeClr"
					:class="`${bsvAlignTwoEnds} text-${themeClr}`"
					-->
					<b-list-group-item 
						button
						class="py-1 rounded-0 border-0"
						:active="ent.isActive"
						:class="bsvAlignTwoEnds"
						@click="changeTable({
							fetchOption:{routeStr:ent.routeStr},
							navActive:{name:navName,label:ent.label},
							isBriefContent:false,
							table:{subTitle:ent.label},
						})"
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
/*
import Vue from 'vue'

import { NavPlugin } from 'bootstrap-vue'
Vue.use('b-nav',{NavPlugin})

import { CollapsePlugin } from 'bootstrap-vue'
Vue.use('b-collapse',{CollapsePlugin})
*/

import { mapState,mapActions } from 'vuex'

export default {
	name: 'TheSidebar',
	data(){
		return {
			//bsv中的"d-flex justify-content-between align-items-center"是对button中的内容进行两端对齐
			bsvAlignTwoEnds:"d-flex justify-content-between align-items-center"
		}
	},
	computed:{
		borderCls(){
			return `border border-left-0 border-right-0 border-${this.themeClr}`
		},
		...mapState({
		//activeNav对应的sidebar内容
			sidebar:state => {
				let sbObj={}
			
				/*for(let obj of state.sidebar){
					if(obj.name==entName){
						sbObj=obj
						break
					}
				}*/
				state.sidebar.forEach(obj=>{
					if(obj.name==state.navActive.name){
						sbObj=obj
					}
				})
				
				return sbObj
			},
			
			navName:state=>state.navActive.name,
			//主题颜色
			themeClr:state=>state.navActive.themeClr
			
		}),
	},
	methods: {
		... mapActions({
			changeTable: 'asyChangeTable'
		})
	},
	//lifecycle func
	//updated(){
		//alert('sidebar: I am updated.')
	//}
	
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
