//注册拟使用的bsv插件

import Vue from 'vue'

//引入所有的'bootstrap-vue'插件
import * as BsV from 'bootstrap-vue'

//console.log(BsV)

//拟使用的BsV插件名称
const names=[
	'NavbarPlugin',
	//TheSidebar
	'NavPlugin',
	'CollapsePlugin',
	//TheTable
	'ButtonPlugin',
	'ButtonGroupPlugin',
	'PaginationPlugin',
	'TablePlugin',
	'FormInputPlugin',
	'FormSelectPlugin',
	'BadgePlugin',
	'ListGroupPlugin',
	'SpinnerPlugin'
]

//对照拟使用的BsV插件名称，筛选'bootstrap-vue'插件
function setPluginsReady(){
	let res=[]
	let obj=[]
	let result=false
	
	names.forEach((el,idx)=>{
		res[idx]=Object.keys(BsV).includes(el)
		if(res[idx]){
			obj[idx]=BsV[el]
		}
	})
	//检验是否每一个plug都注册了，所有的都注册了every才返回true，否则返回false
	result=res.every(val=>{return val==true})
	
	if(result){
		//注册'bootstrap-vue'插件
		obj.forEach((el)=>Vue.use(el))
	}
	//console.log(obj)
	return result
}

const BsVReady=setPluginsReady()

export default {BsVReady}

/* //注册'bootstrap-vue'插件
BsvPlugins.forEach((el)=>Vue.use(el)) 
const BsvPlugins=getPluginsReady()
//export {BsvPlugins as default}
*/