<template>
<!-- <div> -->
	<b-list-group>
		<!-- 此div的作用是给b-list-group-item加框线-->
		<div class="p-1"
			v-for="(itm, idx) in itemsArr"
			:key="idx"
			:class="labelStr?`ml-3 border-bottom-0 ${borderStr}`:`border-top-0 ${borderStr}`"
			:style="{width:labelStr?`180px`:null}"
		>
			<!-- 各个sidebar中的item按钮	-->
			<b-list-group-item 
				button
				class="py-1 rounded-0 border-0"
				:active="itm.isActive"
				:class="alignStr"
				:style="setBackgroundClr(itm.isActive)"
				@click="itemClick(itm.routeStr)"
						
			>
						
				<template v-if="itm.isActive">
					<span class="font-weight-bold">{{ itm.label }}</span>
					<span class="font-weight-bold" v-if="itm.total">{{itm.total}}</span>
					<span v-else >无</span>
						
				</template>
						
				<template v-else>
					<span >{{ itm.label }}</span>
					<b-badge pill
						:variant="themeClr"
						v-if="itm.total"
					>{{itm.total}}
					</b-badge> 
					<span v-else class="text-muted">无</span>
						
				</template>
						
						
			</b-list-group-item>
		</div>

	</b-list-group>
			
			
			
<!-- </div> -->
</template>

<script>

import {
	
	//静态引入BsV的component
	BListGroup,
	BListGroupItem,
	BBadge,

} from 'bootstrap-vue'

import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'

//import { asyGetBsvComponent as aGetBsv} from '@/components/util-bootstrap-vue'

import {bs4TextColor as colorObj} from '@/conf/common.conf.js'

//console.log(VBToggle)

export default {
	name: 'TheSideItems',
	props:{
		itemsArr: {
			type: Array,
			required: true,
		},
		borderStr: {
			type: String,
			required: true,
		},
		labelStr: {
			type: String,
			required: true,
		},
		alignStr: {
			type: String,
			required: true,
			defaul:''
		},
		
	},
	computed:{
		...mapState({
			routeStr:state=> state.fetchCont.request.routeStr,
			index:state=>state.sidebar.index,
		}),
		...mapGetters({
			//主题颜色
			themeClr:'actNavThemeClr',
		}),
	},
	methods: {
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
			setProps:'setSidebarProps',
			setIsBriefContent:'updateIsBriefContent',
			changeEntry:'updateActiveEntry',
			
		}),		
		... mapActions({
			changeRouteStr:'asyUpdateFetchCont'
			
		})
	},
	components:{
		'b-list-group':BListGroup,
		'b-list-group-item':BListGroupItem,
		'b-badge':BBadge,
	}
}
</script>


<style >


</style>
