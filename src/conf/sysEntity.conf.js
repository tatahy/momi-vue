
//定义语言代码类别
export const langArr=['en','chn']

//系统实体的定义，树形结构便于扩展，考虑与数据库中的表对应？？
export const sysEntity={	
	com:{
		name:{en:'Company',chn:'企业'},
		routeStr:''
	},
	edu:{
		name:{en:'University',chn:'高校'},
		routeStr:''
	},
	dev:{
		name:{en:'Institute',chn:'科研机构'},
		routeStr:''
	},
	gov:{
		name:{en:'Government',chn:'政府'},
		routeStr:''
	},
	ngo:{
		name:{en:'NGO',chn:'非政府组织'},
		routeStr:''
	},
	npo:{
		name:{en:'NPO',chn:'非盈利性组织'},
		routeStr:''
	},
	person:{
		name:{en:'Natural-person',chn:'自然人'},
		routeStr:'',
		adminEntArr:['expert'],
	},
	mentor:{
		name:{en:'Mentor',chn:'导师'},
		routeStr:'mentor',
	},
	pro:{
		name:{en:'Project',chn:'项目'},
		routeStr:'ent-pro'
	},
	pat:{
		name:{en:'Patent',chn:'专利'},
		//routeStr:'ent-pat'
		//routeStr:'supply-pat'
		routeStr:'pat'
		
	},
	ach:{
		name:{en:'Achievement',chn:'技术成果'},
		routeStr:'ent-ach'
	},
	sol:{
		name:{en:'Solution',chn:'解决方案'},
		routeStr:'ent-sol'
	},
	//'sys-env'表示对sys.children.env的引用
	sys:{
		name:{en:'System',chn:'系统'},
		routeStr:'system',
		children:{
			env:{
				name:{en:'Envirement',chn:'环境信息'},
				routeStr:'system-env',
			},
			conf:{
				name:{en:'Config',chn:'配置信息'},
				routeStr:'system-conf',
			},
			serv:{
				name:{en:'Server',chn:'服务器信息'},
				routeStr:'system-serv',
			}
		}
	},
	/* ip:{
		name:{en:'Intelligent Property',chn:'知识产权'},
		children:{
			entArr:['pat','the','prot'],
			pat:{
				name:{en:'Patent',chn:'专利'}
			},
			the:{
				name:{en:'Thesis',chn:'论文'}
			},
			prot:{
				name:{en:'Prototype',chn:'原型机'}
			}
		}
	}, */
	
}




//定义字段名称映射表，各项中字段的定义顺序也是显示的顺序
export const entField={
	pat:{
		topic:{en:'Topic',chn:'题目',isBSVTableField:true},
		type:{en:'Type',chn:'类型',isBSVTableField:true},
		patowner:{en:'Owner',chn:'所有人',isBSVTableField:true},
		inventor:{en:'Inventor',chn:'发明人',isBSVTableField:true},
		author:{en:'Author',chn:'撰写人',isBSVTableField:true},
		id:{en:'Id',chn:'系统编号',isBSVTableField:false},
		patnum:{en:'Patent No.',chn:'专利编号',isBSVTableField:false},
	},
	mentor:{
		name:{en:'Name',chn:'姓名',isBSVTableField:true},
		field:{en:'Field',chn:'专业领域',isBSVTableField:false},
		research:{en:'Research',chn:'研究方向',isBSVTableField:true},
		title:{en:'Title',chn:'职衔',isBSVTableField:false},
		position:{en:'Position',chn:'职务',isBSVTableField:true},
		id:{en:'Id',chn:'系统编号',isBSVTableField:false},
		type:{en:'Type',chn:'导师类型',isBSVTableField:false},
		profile:{en:'Profile',chn:'个人简介',isBSVTableField:false},
		experience:{en:'Experience',chn:'个人经历',isBSVTableField:false},
		
	},
	the:{
		xx:{en:'xx',chn:'哈哈'},
		
	},
	pro:{
		xx:{en:'xx',chn:'哈哈'},
		
	},

}
