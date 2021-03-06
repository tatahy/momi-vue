//util-the-table.js


//BSV:Bootstrap-vue中table插件用到的field对象的属性值
export let fieldProps={
	key:'',					//String
	label:'',				//String
	class:'',				//String or Array
	sortable:true,			//Boolean
	sortDirection:'',		//String
	thClass:'text-center align-middle',				//String or Array
	tdClass:'text-left align-middle',				//String or Array or Function
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

const SELECTOPTION={
	FIRST:{value: null, text: '...请选择一项...',disabled: true},
	LAST:{value: null, text: '——',disabled: true }
}

const FIELDSDEF={
	SN:{
		isInDetail:false,key:'serial-number',label:{en:'S/N',chn:'序号'},	
		tdClass:'align-middle',
	},
	ACTIONS:{
		isInDetail:false,key:'actions',label:{en:'Actions',chn:'操作'},
		tdClass:'align-middle',
		sortable:false
	},
	DEFAULT:[
		{
			isInDetail:false,key:'serial-number',label:{en:'S/N',chn:'序号'},
			tdClass:'align-middle'
		},
		{
			isInDetail:false,key:'key',label:{en:'Key',chn:'键名'}
		},
		{
			isInDetail:false,key:'value',label:{en:'Value',chn:'键值'}
		},
	]
}

const MENTOROPTIONS={
	'field':[
		SELECTOPTION.FIRST,
		{ value: 'material', text: '新材料' },
		{ value: 'computer', text: '计算机' },
		{ value: 'strategy', text: '战略' },
		{ value: 'finance', text: '财务' },
		{ value: 'operation', text: '运营' },
		SELECTOPTION.LAST
	]
}

const MENTORFIELDS=[
		FIELDSDEF.SN,
		//input
		{isInDetail:false,key:'name',label:{en:'Name',chn:'姓名'},
			tdClass:'font-weight-bold align-middle',
			formElement:{name:'input',type:'text'}
		},
		{isInDetail:false,key:'research',label:{en:'Research',chn:'研究方向'},formElement:{name:'textarea',type:''}},
		//select
		/* {isInDetail:true,key:'type',label:{en:'Type',chn:'导师类型'},
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
		}, */
		{isInDetail:true,key:'field',label:{en:'Field',chn:'专业领域'},
			formElement:{
				name:'select',
				type:'',
				options:MENTOROPTIONS['field']
			}
		},
		//textarea
		{isInDetail:true,key:'title',label:{en:'Title',chn:'头衔'},formElement:{name:'textarea',type:''}},
		{isInDetail:false,key:'position',label:{en:'Position',chn:'职位'},formElement:{name:'textarea',type:''}},
		{isInDetail:true,key:'profile',label:{en:'Profile',chn:'个人简介'},formElement:{name:'textarea',type:''}},
		{isInDetail:true,key:'experience',label:{en:'Experience',chn:'个人经历'},formElement:{name:'textarea',type:''}},
		{isInDetail:true,key:'award',label:{en:'Award',chn:'个人获奖'},formElement:{name:'textarea',type:''}},
		{isInDetail:true,key:'patent',label:{en:'Patent',chn:'个人专利'},formElement:{name:'textarea',type:''}},
		{isInDetail:true,key:'thesis',label:{en:'Thesis',chn:'个人论文'},formElement:{name:'textarea',type:''}},
		{isInDetail:true,key:'writing',label:{en:'Writing',chn:'个人著作'},formElement:{name:'textarea',type:''}},
		{isInDetail:true,key:'project',label:{en:'Project',chn:'参与项目'},formElement:{name:'textarea',type:''}},
		
		//none
		{isInDetail:true,key:'id',label:{en:'Id',chn:'系统编号'},formElement:''},
		{isInDetail:true,key:'picture',label:{en:'Picture',chn:'个人照片'},formElement:''},
		FIELDSDEF.ACTIONS,
		//{key:'',isInDetail:true,label:{}},
]

const SUPPLYPATOPTIONS={
	'type':[
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

const SUPPLYPATFIELDS=[
		FIELDSDEF.SN,
		//input
		{isInDetail:false,key:'topic',label:{en:'Topic',chn:'题目'},
			tdClass:'text-left font-weight-bold align-middle',
			/* tdAttr:(value, key, item)=>{
				
				console.log(value)
				console.log(key)
				console.log(item)
				
				return {zz:'font-weight-bold'}
			}, */
			formElement:{name:'input',type:'text'}
		},
		{isInDetail:false,key:'patowner',label:{en:'Owner',chn:'所有人'},formElement:{name:'input',type:'text'}},
		{isInDetail:true,key:'inventor',label:{en:'Inventor',chn:'发明人'},formElement:{name:'input',type:'text'}},
		{isInDetail:true,key:'author',label:{en:'Author',chn:'撰写人'},formElement:{name:'input',type:'text'}},
		//select
		{isInDetail:false,key:'type',label:{en:'Type',chn:'类型'},
			//BSV中的callback，转换为中文,isInDetail:false才起作用
			//formatter:(value, key, item) =>{
			formatter:value =>{
				let defArr=SUPPLYPATOPTIONS['type']
				
				defArr.forEach(obj=>{
					value=obj.value==value?obj.text:value
					
				})
				
				//console.log(value, key, item) 
				
				return value
			},
			formElement:{
				name:'select',
				type:'',
				options:SUPPLYPATOPTIONS['type']
			}
		},
		//none
		{isInDetail:false,key:'id',label:{en:'Id',chn:'系统编号'},formElement:''},
		{isInDetail:true,key:'patnum',label:{en:'Patent No.',chn:'专利编号'},formElement:''},
		FIELDSDEF.ACTIONS,
			//{key:'',isInDetail:false,label:{}},
]
	
	
//定义字段名称及在表单中的展现类型，各项中字段的定义顺序也是显示的顺序
//根据routeStr的值进行定义
export const FIELDS={
	'supply-pat':SUPPLYPATFIELDS,
	'supply-pro':FIELDSDEF.DEFAULT,
	'supply-ach':FIELDSDEF.DEFAULT,
	'supply-sol':FIELDSDEF.DEFAULT,
	'system-env':FIELDSDEF.DEFAULT,
	'system-conf':FIELDSDEF.DEFAULT,
	'system-serv':FIELDSDEF.DEFAULT,
	'mentor-material':MENTORFIELDS,
	'mentor-computer':MENTORFIELDS,
	'mentor-strategy':MENTORFIELDS,
	'mentor-finance':MENTORFIELDS,
	'mentor-operation':MENTORFIELDS,
	'default':FIELDSDEF.DEFAULT,
		//{routeStr:'',spec:[]},
	
}

export const SELECTFIELDS={
	'mentor':MENTOROPTIONS
}

//const horizontalBarData = {
/* export default {
	
	zz:{},
	
} */


//export {asyGetBsvComponent}