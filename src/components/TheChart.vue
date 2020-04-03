<template>
<div>			
	<div class="chart-container" >
		<canvas :id="id"></canvas>
	</div>
	<b-form-select 
			v-model="type" 
			:options="selOpts">
	</b-form-select>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import {bs4TextColor} from '@/conf/common.conf.js'
//

import Chart from 'chart.js'

import {default as chartConf,getDataColor,typeArr} from '@/components/util-chart'

import { BFormSelect } from 'bootstrap-vue'

/* import * as chartConf from './chart-conf.js'
console.log(chartConf) */

export default {
	name: 'TheChart',
	props: {
		id:{
			type:String,
			default:'myChart',
			required:true
		},
	},
	data:function(){
		return {
			type:'bar',
			//存储Chart实例
			ctx:null
		
		}
	},
	computed:{
		//用于实例化Chart的各项参数
		config:function(){
			return Object.assign({},chartConf,{type:this.type})
		},
		selOpts:function(){
			let arr=[]
			let opt={value:'',text:''}	

			typeArr.forEach(obj=>{
				opt.value=obj.hasOwnProperty('name')?obj.name:false
				opt.text=obj.hasOwnProperty('label')?obj.label:''
				if(opt.value!=false){
					arr.push(Object.assign({},opt))
				}
			})
			
			return arr
		},
		//chart.js中的颜色使用数值，将字符转换为数值
		themeClr:function(){
			return bs4TextColor[this.navThemeClr]
		},
		...mapGetters({
			//主题颜色
			navThemeClr:'actNavThemeClr',
			title:'actNavLabel',
			//首页加载时有可能entries=[]
			entries:'resItems',
			actSidebar:'actSidebar'
			
		}),
	},
	//监视是否需要更新
	watch:{
		title:function(){			
			return this.updateChart()
		},
		type:function(){	
			//重新实例化Chart
			this.getChart()
			return this.updateChart()
		}
	},
	methods:{
		setConfig(){
			let self=this

			let config=self.config
			let entries=self.entries
	
			let title=config.options.title
			let datasets=config.data.datasets[0]
			
			let getSidebarEntry=route=>{
				let obj={}
				self.actSidebar.catalog.forEach(cat=>{
					if(cat.hasOwnProperty('items')){
						cat.items.forEach(item=>{
							if(item.routeStr==route){
								obj=item
							}
						})
					}	
				})
				return obj
			}
			//更改标题
			title.text=self.title
			title.fontColor=self.themeClr
			
			//datasets有关的数据从entries获得
			if(entries.length){
				//数据名称数组
				config.data.labels=[]
				//数据值数组
				datasets.data=[]
				entries.forEach(ent=>{
					let obj=getSidebarEntry(ent.routeStr)
					
					config.data.labels.push(obj.label)
					datasets.data.push(obj.total)
					
				})
				
			}
			
			//改变颜色
			if(datasets.data.length){
				let clrObj=getDataColor(datasets.data.length)
				datasets.backgroundColor=clrObj.background
				datasets.borderColor=clrObj.border
			}			
			return
		},
		//实例化Chart
		getChart(){
			let self=this

			if(self.ctx){
				self.ctx.destroy()
			}
			self.setConfig()
			self.ctx=new Chart(self.id,self.config)
			return
		},
		updateChart(){
			let self=this
			self.setConfig()
			return	self.ctx.update()
		}
		
	},
	components:{
		BFormSelect
		//Chart:()=>import('chart.js')
	},
	mounted(){
		//实例化Chart
		return this.getChart()
	},
	destroyed(){
		//销毁Chart实例
		return this.ctx.destroy()
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 80vh;
  /* width: 80vw; */
}
</style>