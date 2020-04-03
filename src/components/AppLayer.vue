<template>
	<div class="container-fluid">		
		
		<div class="bg-white border-right h-100 
					sidenav sidenav-show sidenav-show-up" 
			:style="{display:sidenavDis}"
		>
			<slot name="sidebar">
				sidebar
			</slot>
		</div>
			
		<div class="content"
			:style="{marginLeft:contentMarginLeft}"
		>
			<b-button 
				class="font24px"
				variant="link" 
				@click="sidenavHide"
				:style="{display:sidenavDis}"
			>
				<font-awesome-icon :icon="['fas', 'angle-double-left']" />
			</b-button>	
			
			<b-button 
				class="font24px"
				variant="link" 
				@click="sidenavShow"
				:style="{display:contentShowButtonDis}"
			>
				<font-awesome-icon :icon="['fas', 'angle-double-right']" />
			</b-button>	
			<header>
				<slot name="header"></slot>
			</header>
				
			<main class='text-center'>
				<slot name="main">
					main
				</slot>
			</main>
				
			<footer>
				<slot name="footer">footer</slot>
			</footer>
		</div>
		
		<div :class="shownDrop?'sidenav-backdrop':''" @click="backdropHide" ></div>
	</div>
		
	
	

</template>

<script>
import Vue from 'vue'

import { ButtonPlugin } from 'bootstrap-vue';
//Vue.use(ButtonPlugin);
new Vue('b-button',{ButtonPlugin});

export default {
  name: 'AppLayer',
  data:function(){
	return {
		shownDrop:true,
		contentMarginLeft:'200px',
		sidenavDis:'block',
		contentShowButtonDis:'none',
	}
  },
  methods:{
	backdropHide:function(){
		this.shownDrop=!this.shownDrop
		return this.sidenavHide()
	},
	sidenavShow(){
		this.contentMarginLeft='200px'
		this.sidenavDis='block'
		this.contentShowButtonDis='none'
		this.shownDrop=true
		
	},
	sidenavHide(){
		this.contentMarginLeft='0px'
		this.sidenavDis='none'
		this.contentShowButtonDis='block'
	},
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.font24px{
	font-size:24px;
}

/* css实现sidenav与content的动画效果  */
.sidenav {
    /* //padding: 5px; */
    /* //height: 100%; */
    width: 0px;
    position: fixed;
    z-index: 0;
    top: 56px;
    left: 0;
    /* //border-right: 1px solid #e3e3e3; */
    /* //background-color: #f5f5f5; */
	/* //background-color: transparent; */
	/* //background-color: #ffffff; */
    
    overflow: hidden;
    transition: 0.5s;
}

.sidenav-show {
    width: 200px;
	z-index: 1;
}

.content {
    top: 56px;
    position: relative;
    /* //z-index: 0; */
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
		/* //height: 100%; */
		/* //border-radius: 3px; */
		box-shadow: 0px 0px 5px 2px #aaa;
		/* //background-color: #f2f2f2; */
		/* //background-color: #ffffff; */
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
