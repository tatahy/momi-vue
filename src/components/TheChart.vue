<template>
	
	<div class="chart-container" >
	
		<canvas :id="chartId"></canvas>
	
	</div>

</template>

<script>
import { mapGetters } from 'vuex'
import {bs4TextColor} from '@/conf/common.conf.js'
//

import Chart from 'chart.js'

import {default as chartData,getDataColor} from '@/components/util-chart'

/* import * as chartConf from './chart-conf.js'
console.log(chartConf) */

export default {
	name: 'TheChart',
	data:function(){
		return {
			//chartData,
		}
	},
	props: {
		chartId:{
			type:String,
			default:'myChart',
			required:true
		},
		chartType:{
			type:String,
			default:'bar',
			required:true
		}
	},
	computed:{
		chartData:function(){
			return chartData
		},		
		ctx:function(){
			
			
			//return new Chart(this.chartId, this.chartData)
			
			return this.createChart()
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
		}
		/*title:{
			handler:function(){
				return this.updateChart()
			},
			immediate: true			
		}*/
		
	},
	methods:{
		createChart(){
			//this.chartData.type='bar'
		
			return new Chart(this.chartId, this.chartData)
		},
		setChartData(){
		//updateChart(){
			let self=this
			
			let entries=self.entries
			let chartData=self.chartData
			
			let title=chartData.options.title
			let datasets=chartData.data.datasets[0]
			
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
			
			//datasets.label=`各类${self.title}（数量）`
			
			//console.log(entries)
			
			//datasets有关的数据从entries获得
			if(entries.length){
				//数据名称数组
				chartData.data.labels=[]
				//数据值数组
				datasets.data=[]
				entries.forEach(ent=>{
					let obj=getSidebarEntry(ent.routeStr)
					
					chartData.data.labels.push(obj.label)
					datasets.data.push(obj.total)
					
				})
				
			}
			
			//改变颜色
			if(datasets.data.length){
				let clrObj=getDataColor(datasets.data.length)
				datasets.backgroundColor=clrObj.background
				datasets.borderColor=clrObj.border
				
			}
			
			//return 
		
		},
		updateChart(){
			let self=this
			//定义promise，延迟一点时间再设置数据
			let promise1 = new Promise(function(resolve) {
					setTimeout(function() {
						resolve(self.setChartData())
					}, 300)
				})
			//延迟一点时间再执行更新
			return promise1.then(()=>self.ctx.update())
			
			/*
			//无延迟设置数据，有可能无数据
			this.setChartData()
			return this.ctx.update()*/
		}
		
	},
	components:{
		//Chart:()=>import('chart.js')
	},

	mounted(){
		return this.updateChart()
	},
	destroyed(){
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
  //width: 80vw;
}
</style>