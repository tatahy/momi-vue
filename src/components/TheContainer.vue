<template>
	<!-- <div class="container-fluid top56px">		 -->
	<b-container fluid class="top56px">
		<div class="bg-white border-right h-100 
					sidenav sidenav-show sidenav-show-up" 
			v-bind:style="{display:sidenavDis}"
			v-bind:class="`border-${themeClr}`"
		>
			<slot name="sidebar">
				<TheSidebar />
			</slot>
		</div>
			
		<div class="content"
			v-bind:style="{marginLeft:contentMarginLeft}"
		>
			<div class="py-2">
			
			<b-button 
				:variant="'outline-'+themeClr"
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
					<slot name="briefPage"><TheChart /></slot>
				</template>
				<template v-else>
					<TheTable />
				</template>
		
			</main>
				
			<footer>
				<slot name="footer">footer</slot>
			</footer>
		</div>
		
		<div v-bind:class="showDrop?'sidenav-backdrop':''" v-on:click="backdropHide" ></div>
	</b-container>
	<!-- </div> -->
		
	
	

</template>

<script>
import TheTable from '@/components/TheTable'
import TheSidebar from '@/components/TheSidebar'
import TheChart from '@/components/TheChart'

import { mapState } from 'vuex'

export default {
	name: 'TheContainer',
	data:function(){
		return {
			showDrop:true,
			showSidebar:true,
			contentMarginLeft:'200px',
			sidenavDis:'block',
			btnCls:'font24px py-0 px-2',
		}
	},
	computed: mapState({
		//主题颜色
		themeClr: state=>state.navActive.themeClr,
		isBriefContent:state=>state.isBriefContent,
		//isTableBusy: state=>state.table.isBusy,
	}),
	methods:{
		backdropHide:function(){
			this.showDrop=!this.showDrop
			return this.sidenavHide()
		},
		sidenavShow(){
			this.showSidebar=true
			this.contentMarginLeft='200px'
			this.sidenavDis='block'
			this.showDrop=true
		
		},
		sidenavHide(){
			this.showSidebar=false
			this.contentMarginLeft='0px'
			this.sidenavDis='none'
		},
		sidebarDis(){
			return this.showSidebar?this.sidenavHide():this.sidenavShow()
		}
	},
	props: {
		msg: String
	},
	components: {
		TheTable,
		TheSidebar,
		TheChart
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
