//util-bootstrapVue.js

//根据name值得到bootstrap-vue中plugins、components、directives
export async function asyGetBsvComponent(name){
	const BsV = await import('bootstrap-vue')
	//将name值('-'连接的字符串)转为首字母大写的字符串
	name=name.split('-')
			.map(el=>el.charAt(0).toUpperCase()+el.slice(1))
			.join('')
	if(BsV.hasOwnProperty(name)){
		return BsV[name]	
	}
	
}

//const horizontalBarData = {
export default {
	type:'horizontalBar',
	data:{},
	options:{}
}


//export {asyGetBsvComponent}