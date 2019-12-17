//util-the-table.js


//BSV:Bootstrap-vue中table插件用到的field对象的属性值
export let fieldProps={
	key:'',					//String
	label:'',				//String
	class:'',				//String or Array
	sortable:true,			//Boolean
	sortDirection:'',		//String
	thClass:'text-center',				//String or Array
	tdClass:'text-left',				//String or Array or Function
	variant:'',				//String
	headerTitle:'',			//String
	headerAbbr:'',			//String
	formatter:'',			//String or Function
	sortByFormatted:'',		//Boolean or Function
	filterByFormatted:'',	//Boolean or Function
	thStyle:'',				//Object
	thAttr:'',				//Object or Function	
	tdAttr:'',				//Object or Function	
	isRowHeader:'',			//Boolean
	stickyColumn:'',		//Boolean
}

const FIELDSDEF={
	SN:{isField:true,tdClass:'text-center',key:'serial-number',label:{en:'S/N',chn:'序号'}},
	ACTIONS:{isField:true,tdClass:'text-right',key:'actions',label:{en:'Actions',chn:'操作'}},
	DEFAULT:[
		{isField:true,tdClass:'text-center',key:'serial-number',label:{en:'S/N',chn:'序号'}},
		{isField:true,key:'key',label:{en:'Key',chn:'键名'}},
		{isField:true,key:'value',label:{en:'Value',chn:'键值'}},
	]
	
}
//定义字段名称映射表，各项中字段的定义顺序也是显示的顺序
//根据routeStr的值进行定义
export const FIELDS={
	'supply-pat':[
		FIELDSDEF.SN,
		{isField:true,key:'topic',label:{en:'Topic',chn:'题目'}},
		{isField:true,key:'type',label:{en:'Type',chn:'类型'}},
		{isField:true,key:'patowner',label:{en:'Owner',chn:'所有人'}},
		{isField:true,key:'inventor',label:{en:'Inventor',chn:'发明人'}},
		{isField:true,key:'author',label:{en:'Author',chn:'撰写人'}},
		{isField:false,key:'id',label:{en:'Id',chn:'系统编号'}},
		{isField:false,key:'patnum',label:{en:'Patent No.',chn:'专利编号'}},
		FIELDSDEF.ACTIONS,
			//{key:'',isField:true,label:{}},
		],
	'supply-pro':FIELDSDEF.DEFAULT,
	'supply-ach':FIELDSDEF.DEFAULT,
	'supply-sol':FIELDSDEF.DEFAULT,
	'system-env':FIELDSDEF.DEFAULT,
	'system-conf':FIELDSDEF.DEFAULT,
	'system-serv':FIELDSDEF.DEFAULT,
	'mentor-material':[
		FIELDSDEF.SN,
		{isField:true,key:'name',label:{en:'Name',chn:'姓名'}},
		{isField:true,key:'field',label:{en:'Field',chn:'专业领域'}},
		{isField:true,key:'research',label:{en:'Research',chn:'研究方向'}},
		{isField:true,key:'title',label:{en:'Title',chn:'职衔'}},
		{isField:true,key:'position',label:{en:'Position',chn:'职务'}},
		{isField:false,key:'id',label:{en:'Id',chn:'系统编号'}},
		{isField:false,key:'type',label:{en:'Type',chn:'导师类型'}},
		{isField:false,key:'profile',label:{en:'Profile',chn:'个人简介'}},
		{isField:false,key:'experience',label:{en:'Experience',chn:'个人经历'}},
		FIELDSDEF.ACTIONS,
		//{key:'',isField:false,label:{}},
	],
	'mentor-computer':FIELDSDEF.DEFAULT,
	'mentor-strategy':FIELDSDEF.DEFAULT,
	'mentor-finance':FIELDSDEF.DEFAULT,
	'mentor-operation':FIELDSDEF.DEFAULT,
		//{routeStr:'',spec:[]},
	
}

//const horizontalBarData = {
export default {
	
	zz:{},
	
}


//export {asyGetBsvComponent}