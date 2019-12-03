//注册拟使用的Fa图标

import Vue from 'vue'

import {fas} from '@fortawesome/free-solid-svg-icons'

import {fab} from '@fortawesome/free-brands-svg-icons'

//引入fontawesome核心库
import { library } from '@fortawesome/fontawesome-svg-core'

//引入fontawesome for Vue
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
	'chalkboard-teacher'
]

//拟使用的fab图标
const fabArr=[
	'font-awesome'
]

function getReady(){
	const iconObj=[
		{used:fasArr,pool:Object.keys(fas),lib:fas,},
		{used:fabArr,pool:Object.keys(fab),lib:fab,},
	]
	let res=[]
	let result=false
	
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
	//检验是否每一个icon都加入了核心库，所有的都加入了every才返回true
	result=res.every(val=>{return val==true})
	
	if(result){
		//全局注册组件'font-awesome-icon'，通过<font-awesome-icon />使用
		Vue.component('font-awesome-icon',FontAwesomeIcon)
	}
	
	return result
}

const FaReady=getReady()

export default {FaReady}

/* 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export { FontAwesomeIcon as default } 
*/

//export { FontAwesomeIcon as default } from '@fortawesome/vue-fontawesome'

