// root state，整个app中需要全局使用的数据
//只能通过commit mutations中的函数才能修改state中的数据

import {navbar,sidebar} from '@/conf/adminEntity.conf.js'

// const debug = process.env.NODE_ENV !== 'production'
// const BackEndUrl=debug?'http://localhost:8090':''
function getBackEndUrl(){
	const host = new URL(window.location.href)
	const debug = process.env.NODE_ENV !== 'production'

	host.port=8090
	//console.log(host)
	return debug?host.origin:''

}

export default {
	fetchCont:{
		request:{
			routeStr:'',
			method:'GET',
			//headers: {},
			load:{}
		},
		response:{
			//放置后端返回的各项统计数据
			items: [],
			//放置后端返回的列表数据
			lists: []
		}
	},
	isBriefContent:true,
	//isNavChanged:false,
	//isITemChanged:false,
	navbar:{
		index:0,
		items:navbar
	},
	sidebar:{
		index:0,
		items:sidebar
	},
	sidebarEntry:{
		//当前高亮的sidebar中的item
		active:{},
		//最近一次高亮的sidebar中的item
		prev:{}
	},
	host:getBackEndUrl(),
	
}