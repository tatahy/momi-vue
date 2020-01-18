
import {langArr} from '@/conf/common.conf.js'


var navbarArr=[
		{props:{themeClr:'info'}},
		{props:{themeClr:'info'}},
		{props:{themeClr:'info'}},
		{props:{themeClr:'primary'}},
		{props:{themeClr:'warning'}},
		{props:{themeClr:'danger'}}
	]

var sidebarArr=[
		{caption:'供给分类',faIcon:['fas','warehouse']},
		{caption:'需求方',faIcon:['fas','mountain']},
		{caption:'项目主导方',faIcon:['fas','project-diagram']},
		{caption:'专家来源',faIcon:['fas','chalkboard-teacher']},
		{caption:'导师分类',faIcon:['fas','user-graduate']},
		{caption:'系统信息',faIcon:['fas','h-square']},
	]

/*	完善sidebar的catArr的值
 *	算法描述：
 *	1. 得到对应对象的items:[
					{routeStr:'env'},
					{routeStr:'conf'},
					{routeStr:'serv'},
				]
		其中每一项表示访问路由的后半部分，前半部分由上一级的routeStr定义。
		以system为例，完整路由为'system-env'
 *	2. 根据sysEntPath中的每一项对应生成一个Object，结构1：
 		{
			label:'',
			items:[
				{total:0,routeStr:'syetem-env'},
				{total:0,routeStr:'syetem-conf'},
				{total:0,routeStr:'syetem-serv'},
			]
		}
		结构2：
		{
			label:'',
			total:[0,0,0],
			routeStr:['','',''],
			label:['','','']
		}
 *	3. Object的内容填充：
 		routeStr和label已在items中定义，找到后填充；
		itemsTotal则要在运行时通过fetch方法拿到数据后填充。
 *
 *	ent:String
 *	lang:String
 */
function fufillSidebarCatlog(ent){
	
	//组装成数据结构1
	adminEntity[ent].catalog.forEach((cat,idM)=>{
		//增加
		cat['hasButton']=cat.label?true:false
		cat['isPressed']=false
		
		cat.items.forEach((item,idN)=>{
			let routeArr=item.routeStr.toLowerCase().split('-')
			let path=['catalog',idM,'items',idN]
			routeArr.unshift(adminEntity[ent]['routeStr'].toLowerCase())
			//增加
			item['total']=0
			item['isActive']=false
			item['path']=path
			
			//修改
			item['routeStr']=routeArr.join('-')
			
			/* item=Object.assign({},item,
				{
					total:0,
					isActive:false,
					routeStr:routeArr.join('-')
				}
			) */

		})
	})
	return adminEntity[ent].catalog
}

/* 	得到预定义的caption值
 *	ent:string
 * 	lang:String
 */
function getLabel(ent,lang=''){
	lang=langArr.includes(lang)?lang:'chn'
	
	//return Object.keys(adminEntity).includes(ent)?
	return adminEntity.hasOwnProperty(ent)?
			adminEntity[ent]['name'][lang]
			:'none'
}

function getRoute(ent){
	
	return adminEntity.hasOwnProperty(ent)?
			adminEntity[ent]['routeStr']
			:''
}

function buildNavbar(){
	let arr=navbarArr
	const ent=Object.keys(adminEntity)
	
	if(ent.length == arr.length){
		arr.forEach((obj,idx)=>{
			let entName=ent[idx]
			//属性赋值
			obj['name']=entName
			obj['index']=idx
			//添加属性
			obj['props']['label']=getLabel(entName)
			obj['props']['fieldLang']=langArr.includes('chn')?'chn':'en'
			obj['props']['routeStr']=getRoute(entName)
			obj['props']['isActive']=idx==0?true:false
			
			arr[idx]=obj
		})
	}else{
		//console.log('wrong navbar numbers')
	}
	
	return arr
}



function buildSidebar(){
	let arr=sidebarArr
	const ent=Object.keys(adminEntity)
	
	if(ent.length == arr.length){
		arr.forEach((obj,idx)=>{
			let entName=ent[idx]
			//添加属性
			obj['name']=entName
			obj['index']=idx
			obj['catalog']=fufillSidebarCatlog(entName)
						
			arr[idx]=obj
		})
	}else{
		//console.log('wrong sidebar numbers')
	}
	
	return arr
	
}

//import {sysEntity} from '@/conf/sysEntity.conf.js'

//后台系统管理的实体定义，树形结构便于扩展
export const adminEntity={
	supply:{
		name:{en:'Supply',chn:'供给'},
		routeStr:'supply',
		//定义为数组，便于应用v-for指令
		catalog:[
			/* {label:'知识产权',sysEntPath:['pat','pro']},
			{label:'技术方案',sysEntPath:['ach','sol']}, */
			
			{
				label:'知识产权',
				items:[
					{sysEnt:'pat',routeStr:'pat',label:'专利'},
					{sysEnt:'pro',routeStr:'pro',label:'项目'}
					]
			},
			{
				label:'成果方案',
				items:[
					{sysEnt:'ach',routeStr:'ach',label:'技术成果'},
					{sysEnt:'sol',routeStr:'sol',label:'解决方案'},
				
				]
			},
			
		],
		
		
	},
	demand:{
		name:{en:'Demand',chn:'需求'},
		routeStr:'demand',
		//routeStr:['com','gov','edu','dev','ngo','person'],
		
		//定义为数组，便于应用v-for指令
		catalog:[
			/* {label:'',sysEntPath:['com','gov','edu','dev','ngo','person']}, */
			{
				label:'',
				items:[
					{sysEnt:'com',routeStr:'com',label:'商业机构'},
					{sysEnt:'gov',routeStr:'gov',label:'政府组织'},
					{sysEnt:'edu',routeStr:'edu',label:'高等院校'},
					{sysEnt:'dev',routeStr:'dev',label:'研发机构'},
					{sysEnt:'ngo',routeStr:'ngo',label:'非政府组织'},
					{sysEnt:'person',routeStr:'person',label:'自然人'},
				]
			}
			
		],			
		target:[
			{en:'intelligent property',chn:'知识产权'},
			{en:'project finacing',chn:'项目融资'},
			{en:'project partner',chn:'项目合作'},
			{en:'project incubation',chn:'项目孵化'},
			{en:'technology team',chn:'技术团队'},
			{en:'leader',chn:'领军人才'},
		],
		status:[
			{en:'',chn:''},
			{en:'',chn:''},
			{en:'',chn:''},
		]
	},
	project:{
		name:{en:'Project',chn:'项目'},
		routeStr:'project',
		//routeStr:['com','gov','edu','dev','ngo','person'],
		
		//定义为数组，便于应用v-for指令
		catalog:[
			/* {label:'',sysEntPath:['edu','dev']}, */
			{
				label:'',
				items:[
					{sysEnt:'com',routeStr:'com',label:'商业机构'},
					//{sysEnt:'gov',routeStr:'gov',label:'政府组织'},
					//{sysEnt:'edu',routeStr:'edu',label:'高等院校'},
					{sysEnt:'dev',routeStr:'dev',label:'研发机构'},
					{sysEnt:'ngo',routeStr:'ngo',label:'非政府组织'},
					{sysEnt:'person',routeStr:'person',label:'自然人'},
				]
			}
			
		],
		
	},
	expert:{
		name:{en:'Expert',chn:'专家'},
		routeStr:'expert',
		//定义为数组，便于应用v-for指令
		catalog:[
			/* {label:'',sysEntPath:['person']},
			{label:'产业界',sysEntPath:['com','gov']},
			{label:'研究组织',sysEntPath:['edu','dev','ngo']}, */
			{
				label:'',
				items:[
					{sysEnt:'com',routeStr:'com',label:'商业机构'},
					{sysEnt:'gov',routeStr:'gov',label:'政府组织'},
					{sysEnt:'edu',routeStr:'edu',label:'高等院校'},
					{sysEnt:'dev',routeStr:'dev',label:'研发机构'},
					{sysEnt:'ngo',routeStr:'ngo',label:'非政府组织'},
					{sysEnt:'person',routeStr:'person',label:'自然人'},
				]
			}
			
		],
		
	},
	mentor:{
		name:{en:'Mentor',chn:'导师'},
		routeStr:'mentor',
		//routeStr:['person','com'],
		
		//定义为数组，便于应用v-for指令
		catalog:[
			/* {label:'',sysEntPath:['person','com']}, */
			{
				label:'科研导师',
				items:[
					{sysEnt:'mentor',routeStr:'material',label:'新材料'},
					{sysEnt:'mentor',routeStr:'computer',label:'计算机'},
				]
			},
			{
				label:'管理导师',
				items:[
					{sysEnt:'mentor',routeStr:'strategy',label:'战略'},
					{sysEnt:'mentor',routeStr:'finance',label:'财务'},
					{sysEnt:'mentor',routeStr:'operation',label:'运营'},
				]
			}
			
		]
		
	},
	system:{
		name:{en:'System Info',chn:'系统信息'},
		routeStr:'system',
		catalog:[
			/* {label:'',sysEntPath:['sys/env','sys/conf','sys/serv']}, */
			{
				label:'',
				items:[
					{sysEnt:'env',routeStr:'env',label:'环境参数'},
					{sysEnt:'conf',routeStr:'conf',label:'配置参数'},
					{sysEnt:'serv',routeStr:'serv',label:'服务器参数'},
				]
			}
			
		]
	}
}

export const navbar=buildNavbar()
export const sidebar=buildSidebar()