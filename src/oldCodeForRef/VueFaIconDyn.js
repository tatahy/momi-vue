
import Vue from 'vue'

//拟使用的fas图标
const fasArr=[
	'user-secret',
	'umbrella',
	'sign-out-alt',
	'angle-right',
	'angle-down',
	'angle-double-right',
	'angle-double-left',
	'chevron-right',
	'chevron-down',
	'tachometer-alt',
	'plus',
	'minus',
	//供给
	'warehouse',
	//需求
	'mountain',
	//项目
	'project-diagram',
	//导师
	'user-graduate',
	//专家
	'chalkboard-teacher',
	'h-square',
	//'plus-square',
	//'minus-square'
]

//拟使用的fab图标
const fabArr=[
	'font-awesome'
]

//拟使用的far图标
const farArr=[
	//'plus-square',
	//'minus-square'
]

//async 函数都是Promise对象
export default async function asyFaGetReady(){
	//动态加载模块
	/* const [fas,fab,{library},{FontAwesomeIcon},{default:Vue}]=await Promise.all([
			import('@fortawesome/free-solid-svg-icons'),
			import('@fortawesome/free-brands-svg-icons'),
			//引入fontawesome核心库
			import('@fortawesome/fontawesome-svg-core'),
			//引入fontawesome for Vue
			import('@fortawesome/vue-fontawesome'),
			import('vue'),
		]) */
	const [fas,fab,far,{library},{FontAwesomeIcon}]=await Promise.all([
			import('@fortawesome/free-solid-svg-icons'),
			import('@fortawesome/free-brands-svg-icons'),
			import('@fortawesome/free-regular-svg-icons'),
			//引入fontawesome核心库
			import('@fortawesome/fontawesome-svg-core'),
			//引入fontawesome for Vue
			import('@fortawesome/vue-fontawesome')
		])
	
	
	const iconObj=[
		{used:fasArr,pool:Object.keys(fas),lib:fas,},
		{used:fabArr,pool:Object.keys(fab),lib:fab,},
		{used:farArr,pool:Object.keys(far),lib:far,},
	]
	
	let result=false
	let res=[]
	
	
	for(let obj of iconObj){
		let arr=obj.used
		let arrAll=obj.pool
		let lib=obj.lib
	
		arr.forEach((el,idx)=>{
			let faName='fa'+el.split('-')
					// Upper case
					.map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
					// Concatenated
					.join('')	
					
			res[idx]=arrAll.includes(faName)
		
			if(res[idx]){
				//加入核心库
				library.add(lib[faName])
			}
		})
	}
	
	//检验是否每一个icon名称都存在，都存在every才返回true
	result=res.every(val=>{return val==true})
	
	if(result){
		//全局注册组件'font-awesome-icon'，通过<font-awesome-icon />使用
		Vue.component('font-awesome-icon',FontAwesomeIcon)
	}
	
	return result
}
