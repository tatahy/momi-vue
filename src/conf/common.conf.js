
//定义语言代码类别
export const langArr=['en','chn']

//bootstrap4 中字体颜色值
export const bs4TextColor={
	primary:'#007bff',
	secondary:'#6c757d',
	success:'#28a745',
	danger:'#dc3545',
	warning:'#ffc107',
	info:'#17a2b8',
	dark:'#343a40',
	light:'#f8f9fa',
	muted:'#6c757d'
	
}

/*
//chart中使用的颜色值
export const chartColor={
	labels:['blue', 'yellow', 'purple','green', 'orange','red'],
	background:{
		red:'rgba(255, 99, 132, 0.2)',
		blue:'rgba(54, 162, 235, 0.2)',
		yellow:'rgba(255, 206, 86, 0.2)',】
		
		green:'rgba(75, 192, 192, 0.2)',
		purple:'rgba(153, 102, 255, 0.2)',
		orange:'rgba(255, 159, 64, 0.2)'
	},
	border:{
		red:'rgba(255, 99, 132, 1)',
		blue:'rgba(54, 162, 235, 1)',
		yellow:'rgba(255, 206, 86, 1)',
		green:'rgba(75, 192, 192, 1)',
		purple:'rgba(153, 102, 255, 1)',
		orange:'rgba(255, 159, 64, 1)'
	}
}
*/

//BSV:Bootstrap-vue中table插件用到的field对象的属性值
export const bsvTableFieldProps={
	key:'',						//String
	label:'',					//String
	class:'',					//String or Array
	sortable:true,				//Boolean
	sortDirection:'',			//String
	thClass:'text-center',		//String or Array
	tdClass:'text-left',		//String or Array or Function
	variant:'',					//String
	headerTitle:'',				//String
	headerAbbr:'',				//String
	formatter:'',				//String or Function
	sortByFormatted:'',			//Boolean or Function
	filterByFormatted:'',		//Boolean or Function
	thStyle:'',					//Object
	thAttr:'',					//Object or Function	
	tdAttr:'',					//Object or Function	
	isRowHeader:'',				//Boolean
	stickyColumn:'',			//Boolean
}

