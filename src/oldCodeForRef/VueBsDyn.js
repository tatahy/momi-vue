//声明使用的各个BootstrapVue模块

import Vue from 'vue'

//拟使用的BsV插件名称
const plugins=[
	//'ButtonPlugin',
	'ButtonGroupPlugin',
	'FormInputPlugin',
	//'FormSelectPlugin',
	//'BadgePlugin',
	'ListGroupPlugin',
	'SpinnerPlugin',
	'LayoutPlugin',
	'LinkPlugin',
	//'FormCheckboxPlugin',
	//'CardPlugin'        
]

//async 函数都是Promise对象
export default async function asyBsVGetReady(){
	//动态加载模块
	/* const [{default:Vue},BsV] = await Promise.all([
			import('vue'),
			import('bootstrap-vue')
		]) */
	const BsV = await import('bootstrap-vue')

	let res=[]
	let obj=[]
	let result=false
		
	plugins.forEach((el,idx)=>{
		res[idx]=BsV.hasOwnProperty(el)?true:false
		obj[idx]=BsV[el]		
	})
	//检验是否每一个plug都注册了，所有的都注册了every才返回true，否则返回false
	result=res.every(val=>{return val==true})
	
	if(result){
		//注册'bootstrap-vue'插件
		obj.forEach(el=>Vue.use(el))
		/* obj.forEach(el=>{
				console.log(el)
				Vue.use(el)
			}) */
		
	}	
	
	return result
}


//export default {arr:plugins,initPlug:asyInit}

