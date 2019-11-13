// root state，整个app中需要全局使用的数据
//只能通过commit mutations中的函数才能修改state中的数据

import {navbar,sidebar} from '@/conf/adminEntity.conf.js'

const tableInitFields=[
	{key:'No.','class':'text-center',},
	{key:'age','class':'text-center',},
	{key:'firstName',label:'FName','class':'',},
	{key:'lastName',label:'LName',},
]
const tableInitItems=[
    { 'No.':1, age: 40, firstName: 'Dickerson', lastName: 'Macdonald' },
    { 'No.':2, age: 21, firstName: 'Larsen', lastName: 'Shaw' },
    { 'No.':3, age: 89, firstName: 'Geneva', lastName: 'Wilson' },
    { 'No.':4, age: 38, firstName: 'Jami', lastName: 'Carney' }
]

export default {
	//navArr,
	navbar,
	navActive:{name:navbar[0]['name'],themeClr:navbar[0]['props']['themeClr'],category:{}},
	sidebar,
	table:{
		title:'Initial Info',
		fieldLang:'chn',
		fields:tableInitFields,
		items:tableInitItems,
		isBusy:false
	},
	fetchOption:{
		//routeStr:navbar[0]['props']['routeStr'],
		routeStr:'',
		method:'GET'
	},
	isBriefContent:true
	
}