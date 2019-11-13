
import {langArr, entField} from '@/conf/sysEntity.conf.js'

//import {adminEntity} from '@/conf/adminEntity.conf.js'

const debug = process.env.NODE_ENV !== 'production'
const BackEndUrl=debug?'http://localhost:8090':'';
//const postmanUrl='https://a9baf5bf-a2cf-43a8-8db8-2fb9aa3f5acc.mock.pstmn.io';

function getUrlByRoute(routeStr){
	let url=routeStr?BackEndUrl+`/${routeStr.split('-').join('/')}`:''
	return url
}

/* function getEntFieldName(entType,lang=''){
	let ent=Object.keys(entFieldName).includes(entType)?entType:'';
	let langObj=ent?entFieldName[ent]:{};
	let resObj={};
		
	if(lang && Object.keys(langObj).length){
		for(var key in langObj){
			resObj[key]=langObj[key][lang];
		}
	}
	// console.log('getEntFieldName(): resObj');
	// console.table(resObj);
	return resObj;
} */


async function asyFetchByRoute(opt={routeStr:'',method:'GET'}){
	let url=getUrlByRoute(opt.routeStr)
	let typeArr=['blob','text','json','formData'];
	//js原生fetch()方法的第二参数
	let optDefault={
			method: 'GET', // *GET, POST, PUT, DELETE, etc
			//mode: 'cors', // no-cors, cors, *same-origin
			//cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			//credentials: 'same-origin', // include, *same-origin, omit
			//headers: {
				//'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			//},
			//redirect: 'follow', // manual, *follow, error
			//referrer: 'no-referrer', // no-referrer, *client
			//body:JSON.stringify({zz:11}), // body data type must match "Content-Type" header while method=='POST' or 'PUT'
			type:'json',
		};
	let res={ok:false}
	let result={
			ok:false,
			cont:[
				{ 'No.':1, age: 40},
				{ 'No.':2, age: 21},
				{ 'No.':3, age: 89},
				{ 'No.':4, age: 38}
			]
		}
	
	opt=Object.assign({},optDefault,opt);
	
	if(url && typeArr.includes(opt.type)){
		res=await fetch(url,opt);
		//console.log(res);
	}
	
	if(res.ok){
		result.ok=true;
		switch(opt.type){
			case 'blob':
				result.cont=await res.blob();
				break;
			case 'text':
				result.cont=await res.text();
				break;
			case 'formData':
				result.cont=await res.formData();
				break;
			default:
				result.cont=await res.json();
				break;
		}
	}
	
	//async函数返回的是Promise对象
	return result;
	
}


//按照bootstrap-vue的要求组装table中使用的fields
function setFieldsForBsv(entName,fields=[],lang='en',addNo=true){
	let ent=Object.keys(entField).includes(entName)?entName:''
	let langObj=ent?entField[ent]:''
	let res=[]
	//校验lang是否为预定义的值
	lang=langArr.includes(lang)?lang:'en'
	
	//fields不是数组
	if(!Array.isArray(fields)){
		return ['key','value']
	}
	
	if(ent){		
		//fields为非空数组
		/* fields.forEach((el,idx)=>{			
			res[idx]=!Object.keys(langObj).includes(el)?el
				:{
					key:el,
					label:langObj[el][lang],
					'class':'text-center'
				}
		}) */
		
		res=fields.map(el=>!Object.keys(langObj).includes(el)?el
			:{
				key:el,
				label:langObj[el][lang],
				'class':'text-center'
			}
		)
	}
	
	if(!res.length){
		res=['key','value']
	}
	
	if(addNo){
		res.unshift({
			key:'No.',
			label:lang=='chn'?'序号':'No.',
			'class':'text-center'
		})
	}
	
	fields=res
	
	return fields;
}


/* 
 *处理通过fetch方法得到的对象:res={ok:String,cont:Object}
 *要处理的对象：res.cont = {ent:String,fields:Array,items:Array};
 *
 */
function getTableByFetchResult(res,fieldLang='',addNo=true){
	
	let cont=res.cont
	//let ent=cont.hasOwnProperty('ent')?cont['ent']:''
	let sysEnt=cont.hasOwnProperty('sysEnt')?cont['sysEnt']:''
	//数组items的值为对象
	let items=cont.hasOwnProperty('items')?cont['items']:[]
	let fields=cont.hasOwnProperty('fields')?cont['fields']:[]
	
	let table={
			fields:fields.length?fields:['No.','value'],
			items:[{type:sysEnt,result:'no info!'}]
		}
	let arr=[]
	
	
	if(!res.ok){
		return table
	}
	
	//console.log(res) 
	//按照bootstrap-vue的要求组装fields
	table.fields=setFieldsForBsv(sysEnt,fields,fieldLang,addNo)
	//console.log(table.fields) 
	if(sysEnt){
		if(items.length){
			items.forEach((obj,idx)=>{
				arr[idx]=addNo?Object.assign({},{'No.':idx+1},obj):obj
			})
		}else{
			arr.push(addNo?{'No.':0,'key':'none','value':'none'}
					:{'key':'none','value':'none'}
				)
		}
		
	}
				
	if(!sysEnt){
		let n=1;
		for(var key in cont){
			arr.push(addNo?{'No.':n++,'key':key,'value':cont[key]}
					:{'key':key,'value':cont[key]}
				)
		}
	}
	
	table.items=arr
	//console.log(table)
		
	//async函数返回的是Promise对象
	return table
}

export {
	asyFetchByRoute,
	getTableByFetchResult
}