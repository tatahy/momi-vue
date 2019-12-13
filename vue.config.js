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
		externals: getProdExternals()
	},
	/* css: {
    	modules: true,
		loaderOptions: {
			
			scss: {
        		prependData: `@import "./scss/custom.scss";`
      		},
		}
  	} */
}
