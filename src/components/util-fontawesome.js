//util-fontawesome.js

export const FANAME={fas:[],fab:[],far:[]}

//根据name值得到fontawesome中对应图标
export async function asySetFaIconLibrary(faObj){
	
	const [fasLib,fabLib,farLib,{library},{FontAwesomeIcon}]=await Promise.all([
			import('@fortawesome/free-solid-svg-icons'),
			import('@fortawesome/free-brands-svg-icons'),
			import('@fortawesome/free-regular-svg-icons'),
			//引入fontawesome核心库
			import('@fortawesome/fontawesome-svg-core'),
			//引入fontawesome for Vue
			import('@fortawesome/vue-fontawesome')
		])
		
	let addToLib=(type,arr)=>{
		let lib={}
		
		if(type=='fas')lib=fasLib
		if(type=='fab')lib=fabLib
		if(type=='far')lib=farLib
		
		arr.forEach(name=>{
			name='fa'+name.split('-')
					// Upper case
					.map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
					// Concatenated
					.join('')
			if(lib.hasOwnProperty(name)){
				library.add(lib[name])
			}
		})
	}
	let opt=Object.assign({},FANAME,faObj)
	
	/*
	let libVal=Object.values(opt)
	let libName=Object.keys(opt)
	libVal.forEach((nameArr,idx)=>{
		if(nameArr.length){
			addToLib(libName[idx],nameArr)
		}
	})
	*/
	for(let name in opt){
		let arr=opt[name]
		if(arr.length){
			addToLib(name,arr)
		}
	}
	//console.log(library)
		
	return FontAwesomeIcon
}

//const horizontalBarData = {
export default {
	type:'horizontalBar',
	data:{},
	options:{}
}


//export {asyGetBsvComponent}