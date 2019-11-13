
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

//定义字段名称映射表
export const entField={
	pat:{
		patnum:{en:'Patent No.',chn:'专利编号'},
		topic:{en:'Topic',chn:'题目'},
		type:{en:'Type',chn:'类型'},
		patowner:{en:'Owner',chn:'所有人'},
		inventor:{en:'Inventor',chn:'发明人'},
		author:{en:'Author',chn:'撰写人'},
	},
	the:{
		xx:{en:'xx',chn:'哈哈'},
		
	},
	pro:{
		xx:{en:'xx',chn:'哈哈'},
		
	},

}
