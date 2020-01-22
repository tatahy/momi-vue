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
	SN:{isShown:true,tdClass:'text-center',key:'serial-number',label:{en:'S/N',chn:'序号'}},
	ACTIONS:{isShown:true,tdClass:'text-right',key:'actions',label:{en:'Actions',chn:'操作'},sortable:false,},
	DEFAULT:[
		{isShown:true,tdClass:'text-center',key:'serial-number',label:{en:'S/N',chn:'序号'}},
		{isShown:true,key:'key',label:{en:'Key',chn:'键名'}},
		{isShown:true,key:'value',label:{en:'Value',chn:'键值'}},
	]
	
}
//定义字段名称及在表单中的展现类型，各项中字段的定义顺序也是显示的顺序
//根据routeStr的值进行定义
export const FIELDS={
	'supply-pat':[
		FIELDSDEF.SN,
		{isShown:true,key:'topic',label:{en:'Topic',chn:'题目'},formElement:{name:'input',type:''}},
		{isShown:true,key:'type',label:{en:'Type',chn:'类型'},formElement:{name:'select',type:''}},
		{isShown:true,key:'patowner',label:{en:'Owner',chn:'所有人'},formElement:{name:'input',type:''}},
		{isShown:false,key:'inventor',label:{en:'Inventor',chn:'发明人'},formElement:{name:'input',type:''}},
		{isShown:false,key:'author',label:{en:'Author',chn:'撰写人'},formElement:{name:'input',type:''}},
		{isShown:false,key:'id',label:{en:'Id',chn:'系统编号'},formElement:''},
		{isShown:false,key:'patnum',label:{en:'Patent No.',chn:'专利编号'},formElement:{name:'input',type:''}},
		FIELDSDEF.ACTIONS,
			//{key:'',isShown:true,label:{}},
		],
	'supply-pro':FIELDSDEF.DEFAULT,
	'supply-ach':FIELDSDEF.DEFAULT,
	'supply-sol':FIELDSDEF.DEFAULT,
	'system-env':FIELDSDEF.DEFAULT,
	'system-conf':FIELDSDEF.DEFAULT,
	'system-serv':FIELDSDEF.DEFAULT,
	'mentor-material':[
		FIELDSDEF.SN,
		{isShown:true,key:'name',label:{en:'Name',chn:'姓名'},formElement:{name:'input',type:''}},
		{isShown:false,key:'field',label:{en:'Field',chn:'专业领域'},formElement:{name:'select',type:''}},
		{isShown:true,key:'research',label:{en:'Research',chn:'研究方向'},formElement:{name:'input',type:''}},
		{isShown:false,key:'title',label:{en:'Title',chn:'职衔'},formElement:'textarea'},
		{isShown:true,key:'position',label:{en:'Position',chn:'职务'},formElement:'textarea'},
		{isShown:false,key:'id',label:{en:'Id',chn:'系统编号'},formElement:''},
		{isShown:false,key:'type',label:{en:'Type',chn:'导师类型'},formElement:{name:'select',type:''}},
		{isShown:false,key:'profile',label:{en:'Profile',chn:'个人简介'},formElement:'textarea'},
		{isShown:false,key:'experience',label:{en:'Experience',chn:'个人经历'},formElement:'textarea'},
		FIELDSDEF.ACTIONS,
		//{key:'',isShown:false,label:{}},
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