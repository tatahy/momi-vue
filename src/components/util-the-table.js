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

const SELECTOPTION={
	FIRST:{value: null, text: '...请选择一项...',disabled: true },
	LAST:{value: null, text: '---',disabled: true }
}

//定义字段名称及在表单中的展现类型，各项中字段的定义顺序也是显示的顺序
//根据routeStr的值进行定义
export const FIELDS={
	'supply-pat':[
		FIELDSDEF.SN,
		{isShown:true,key:'topic',label:{en:'Topic',chn:'题目'},formElement:{name:'input',type:'text'}},
		{isShown:true,key:'type',label:{en:'Type',chn:'类型'},
			formElement:{
				name:'select',
				type:'',
				options:[
					SELECTOPTION.FIRST,
					{ value: '_PATT1', text: '发明专利' },
					{ value: '_PATT2', text: '实用新型专利' },
					{ value: '_PATT3', text: '外观设计专利' },
					{ value: '_PATT4', text: '软件版权' },
					{ value: '_PATT5', text: '著作权' },
					{ value: '_PATT6', text: '集成电路图' },
					SELECTOPTION.LAST
				]
			}
		},
		{isShown:true,key:'patowner',label:{en:'Owner',chn:'所有人'},formElement:{name:'input',type:'text'}},
		{isShown:false,key:'inventor',label:{en:'Inventor',chn:'发明人'},formElement:{name:'input',type:'text'}},
		{isShown:false,key:'author',label:{en:'Author',chn:'撰写人'},formElement:{name:'input',type:'text'}},
		{isShown:false,key:'id',label:{en:'Id',chn:'系统编号'},formElement:''},
		{isShown:false,key:'patnum',label:{en:'Patent No.',chn:'专利编号'},formElement:''},
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
		{isShown:true,key:'name',label:{en:'Name',chn:'姓名'},formElement:{name:'input',type:'text'}},
		{isShown:false,key:'field',label:{en:'Field',chn:'专业领域'},
			formElement:{
				name:'select',
				type:'',
				options:[
					SELECTOPTION.FIRST,
					{ value: 'material', text: '新材料' },
					{ value: 'computer', text: '计算机' },
					{ value: 'strategy', text: '战略' },
					{ value: 'finance', text: '财务' },
					{ value: 'operation', text: '运营' },
					SELECTOPTION.LAST
				]
			}
		},
		{isShown:true,key:'research',label:{en:'Research',chn:'研究方向'},formElement:{name:'input',type:'text'}},
		{isShown:false,key:'title',label:{en:'Title',chn:'职衔'},formElement:{name:'textarea',type:''}},
		{isShown:true,key:'position',label:{en:'Position',chn:'职务'},formElement:{name:'textarea',type:''}},
		{isShown:false,key:'id',label:{en:'Id',chn:'系统编号'},formElement:''},
		{isShown:false,key:'type',label:{en:'Type',chn:'导师类型'},
			formElement:{
				name:'select',
				type:'',
				options:[
					SELECTOPTION.FIRST,
					{ value: '_TYPE1', text: '科研导师' },
					{ value: '_TYPE2', text: '管理导师' },
					SELECTOPTION.LAST
				]
			}
		},
		{isShown:false,key:'profile',label:{en:'Profile',chn:'个人简介'},formElement:{name:'textarea',type:''}},
		{isShown:false,key:'experience',label:{en:'Experience',chn:'个人经历'},formElement:{name:'textarea',type:''}},
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