//modified Webpack configuration

//The process object is a global that provides information about, 
//and control over, the current Node.js process.
 
//The process.env property returns an object containing the user environment. 

function getProdExternals() {
  return {
    /* axios: "axios",
    "chart.js": "Chart",
    vue: "Vue", */
	//chart.js使用的第三方库
	moment: 'moment'
  }
}

module.exports = {
	
	//浏览器视角下的js工作目录，生产环境下为'/public/'，非生产环境为默认的'/'
	/* publicPath: process.env.NODE_ENV === 'production'
		? '/public/'
		: '/', */
	assetsDir: 'static',
	indexPath: 'admin.html',
	//tweak the webpack config by an object
	configureWebpack: {
		//externals: process.env.NODE_ENV === 'production' ?getProdExternals() : {}
		//申明无需打包的库
		externals: getProdExternals()
	},
	// //局域网内访问设置??
	// devServer: {
    //     host: '192.168.1.102', // ip
    //     port: 8090, // 设置端口号
    //     https: false, // https:{type:Boolean}
    //     open: false, //配置自动启动浏览器
    //     proxy:null  //设置代理
    // },
	/* css: {
    	modules: true,
		loaderOptions: {
			
			scss: {
        		prependData: `@import "./scss/custom.scss";`
      		},
		}
  	} */
}
