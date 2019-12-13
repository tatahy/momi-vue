<template>
	<!-- <div class="container-fluid top56px">		 -->
	
	<!-- v-bind:style="{display:sidenavDis}" -->
	<b-container fluid class="top56px">
		<div class="bg-white border-right h-100 
					sidenav sidenav-show sidenav-show-up" 
			v-if="showSidebar"
			v-bind:class="`border-${themeClr}`"
		>
			<slot name="leftSide">
				<!-- <TheSidebar /> -->
			</slot>
		</div>
			<!-- v-bind:style="`marginLeft:${showSidebar}?200px;:0px;`" -->
		<div class="content"
			
			v-bind:style="setMarginLeft"
		>
			<div class="py-2">
			
			<b-button 
				:variant="`outline-${themeClr}`"
				@click="sidebarDis"
				:class="btnCls"
			>
				<font-awesome-icon :icon="['fas', showSidebar?'angle-double-left':'angle-double-right']" />
			</b-button>	
			
			</div>
			
			<header>
				<slot name="header"></slot>
			</header>
				
			<main class="text-center">
				
				<template v-if="isBriefContent">
					<TheChart chart-id='myChart' chart-type='horizontalBar' />
				</template>
				
				<template v-else>
					<TheTable />
				</template>
		
			</main>
				
			<footer>
				<slot name="footer">
					<!-- <div>footer</div> -->
				</slot>
			</footer>
		</div>
		
		<div v-bind:class="showDrop?'sidenav-backdrop':''" v-on:click="backdropHide" ></div>
	</b-container>
	<!-- </div> -->
		
	
	

</template>

<script>


import { 
	BContainer,
	BButton,
} from 'bootstrap-vue'

import { mapState, mapGetters } from 'vuex'

//引入font awesome
import { 
	faAngleDoubleLeft,
	faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons'
import { library as faLib} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

faLib.add(faAngleDoubleLeft,faAngleDoubleRight)

export default {
	name: 'TheContainer',
	data:function(){
		return {
			showDrop:true,
			showSidebar:true,
			btnCls:'font24px py-0 px-2',
		}
	},
	computed: {
		setMarginLeft:function(){
			return {marginLeft:this.showSidebar?'200px':'0px'}
		},
		...mapState({
			isBriefContent:state=>state.isBriefContent,
		}),
		...mapGetters({
			//主题颜色
			themeClr:'actNavThemeClr'
		})
	},
	methods:{
		backdropHide:function(){
			this.showDrop=!this.showDrop
			return this.sidebarHide()
		},
		sidebarShow(){
			this.showSidebar=true
			this.showDrop=true
		
		},
		sidebarHide(){
			this.showSidebar=false			
		},
		sidebarDis(){
			return this.showSidebar?this.sidebarHide():this.sidebarShow()
		},
		showAdvice: function (advice) {
			alert(advice)
		}
	},
	
	components: {
		'b-container':BContainer,
		'b-button':BButton,
		FontAwesomeIcon,
		//异步加载组件
		TheChart:()=>import('@/components/TheChart'),
		TheTable:()=>import('@/components/TheTable'),
		
		
	},
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top56px{
	margin-top: 56px;
}

.font24px{
	font-size:24px;
}

/* css实现sidenav与content的动画效果  */
.sidenav {
    //padding: 5px;
    //height: 100%;
    width: 0px;
    position: fixed;
    z-index: 1;
    //top: 56px;
    left: 0;
    //border-right: 1px solid #e3e3e3;
    //background-color: #f5f5f5;
	//background-color: transparent;
	//background-color: #ffffff;
    
    overflow: hidden;
    transition: 0.5s;
}

.sidenav-show {
    width: 200px;
	//z-index: 1;
}

.content {
    //top: 56px;
    position: relative;
    z-index: 0;
    transition: margin-left 0.5s;
}

.sidenav-backdrop {
    z-index: 0;
}

@media (max-width: 768px){
	.content {
		margin-left: 0px !important;
	}
	.sidenav-show-up {
		z-index: 20;
		//height: 100%;
		//border-radius: 3px;
		box-shadow: 0px 0px 5px 2px #aaa;
		//background-color: #f2f2f2;
		//background-color: #ffffff;
	}
	.sidenav-backdrop {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 10;
		background-color: transparent;
	}
}



</style>
