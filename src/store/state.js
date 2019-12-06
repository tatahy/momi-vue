// root state，整个app中需要全局使用的数据
//只能通过commit mutations中的函数才能修改state中的数据

import {navbar,sidebar} from '@/conf/adminEntity.conf.js'

export default {
	activeSideItem:{
		label:'',
		path:'',
		routeStr:'',
		total:'',
	},
	fetchCont:{
		option:{
			routeStr:'',
			method:'GET'
		},
		response:{}
	},
	isBriefContent:true,
	isNavChanged:false,
	isITemChanged:false,
	navbar:{
		index:0,
		items:navbar
	},
	sidebar:{
		index:0,
		items:sidebar
	},
	
}