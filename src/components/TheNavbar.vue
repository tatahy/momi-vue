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
//引入font awesome
import { faFontAwesome} from '@fortawesome/free-brands-svg-icons'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { library as faLib} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
faLib.add(faFontAwesome,faSignOutAlt)

import { 
	BNavbar,
	BNavbarNav,
	BNavbarBrand,
	BNavbarToggle,
	BNavItem,
	BNavItemDropdown,
	BDropdownItem,
	BCollapse	
} from 'bootstrap-vue'

import { mapState,mapActions } from 'vuex'

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
			
		})
	},
	//监视是否需要更新
	watch:{
		index(){
			//console.log(this.index)
			return this.changeNavbar(this.index)
			
		}
	},
	methods: {
		navClick(idx){
			let self=this
			
			if(idx!=self.actIndex){
				self.index=idx
			}
		},
		... mapActions({
			initApp:'asyInitApp',
			changeNavbar:'asyUpdateNavbar',
		})
	},
	created(){
		return this.changeNavbar(this.index)
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
		FontAwesomeIcon		
	}
	
}
</script>


<style >


</style>
