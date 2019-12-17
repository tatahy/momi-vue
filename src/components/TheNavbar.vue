<template>
<div>
  <b-navbar fixed="top" toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">
		<font-awesome-icon :icon="['fab', 'font-awesome']" />
	</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav >
		<template v-for="(nav, idx) in navArr">
			<b-nav-item 
				:active="nav.props.isActive"
				:key="idx"
				@click="navClick(nav.index)" 
			>
				{{ nav.props.label }}
			</b-nav-item>
			
		</template>		
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form> -->
          <!-- <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input> -->
          <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
        <!-- </b-nav-form> -->

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <!-- em:字体为斜体 -->
			<em>User</em>
          </template>
			<b-dropdown-item href="#">Profile</b-dropdown-item>
			<b-dropdown-item href="#">
				<font-awesome-icon :icon="['fas', 'sign-out-alt']" />
				<em>Sign Out</em>
			</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapState,mapActions} from 'vuex'

//自编函数用于异步引入Bsv组件，可减少代码量，但不能减少打包文件体积
//import { asyGetBsvComponent as aGetBsv} from '@/components/util-bootstrap-vue'

//静态引入Bsv组件，可减少打包文件体积
import {
	BNavbar,
	BNavbarNav,
	BNavbarBrand,
	BNavbarToggle,
	BNavItem,
	BNavItemDropdown,
	BDropdownItem,
	BCollapse,
	
} from 'bootstrap-vue'

/*
//自编函数用于异步引入fontawesome组件，可减少代码量，但不能减少打包文件体积
import { asySetFaIconLibrary as aGetFa, FANAME} from '@/components/util-fontawesome'
//定义要引入的faIcon名称数组
let faObj=Object.assign({},FANAME,{
		fas:[
			'sign-out-alt'
		],
		fab:[
			'font-awesome'
		]
	})
*/

//静态引入fontawesome，可减少打包文件体积
import { 
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'
import { 
	faFontAwesome,
} from '@fortawesome/free-brands-svg-icons'

import { library as faLib} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
faLib.add(faSignOutAlt,faFontAwesome)


export default {
	name: 'TheNavbar',
	data(){
		return {
			index:0
		}
	},
	computed: {
		
		...mapState({
			navArr:state=>state.navbar.items,
			actIndex:state=>state.navbar.index,
			isBriefContent:state=>state.isBriefContent,			
		})
	},
	//监视是否需要更新
	watch:{
		index(){
			//console.log(this.index)
			//return this.changeNavbar(this.index)
			return this.asyUpdateNavbar(this.index)
			
		}
	},
	methods: {
		navClick(idx){
			let self=this
			
			if(idx!=self.actIndex){
				self.index=idx
			}
			
			if(!self.isBriefContent){
				self.asyUpdateNavbar(self.index)
			}
			
		},
		...mapActions([
			//changeNavbar:'asyUpdateNavbar',
			'asyUpdateNavbar',
		]),
	},
	created(){
		return this.asyUpdateNavbar(this.index)
	},
	components:{
		'b-navbar':BNavbar,
		'b-navbar-nav':BNavbarNav,
		'b-navbar-brand':BNavbarBrand,
		'b-navbar-toggle':BNavbarToggle,
		'b-nav-item':BNavItem,
		'b-nav-item-dropdown':BNavItemDropdown,
		'b-dropdown-item':BDropdownItem,
		'b-collapse':BCollapse,
		'font-awesome-icon':FontAwesomeIcon

		/*异步引入，减少代码量，并不能减小打包文件体积
		'b-navbar':()=>aGetBsv('b-navbar'),
		'b-navbar-nav':()=>aGetBsv('b-navbar-nav'),	
		'b-navbar-brand':()=>aGetBsv('b-navbar-brand'),	
		'b-navbar-toggle':()=>aGetBsv('b-navbar-toggle'),	
		'b-nav-item':()=>aGetBsv('b-nav-item'),	
		'b-nav-item-dropdown':()=>aGetBsv('b-nav-item-dropdown'),	
		'b-dropdown-item':()=>aGetBsv('b-dropdown-item'),	
		'b-collapse':()=>aGetBsv('b-collapse'),	
		'font-awesome-icon':()=>aGetFa(faObj)*/	
	}
	
}
</script>


<style >


</style>
