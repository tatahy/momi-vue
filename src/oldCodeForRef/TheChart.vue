<template>
	<div class="chart-container">
	
		<canvas :id="chartId"></canvas>
	
	</div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import {bs4TextColor,chartColor} from '@/conf/common.conf.js'
//

import Chart from 'chart.js'

//由labels的数量，根据预定义的chartColor取得颜色值
//因为chartColor.labels.length有上限，递归调用自己
//超过该上限就又按照chartColor.labels的排列顺序得到颜色值
//直到labels的数量小于上限值
let getDataColor=(labels,colorObj={})=>{
	const lenDefault=chartColor.labels.length
	const clrNameArr=chartColor.labels
	
	let minus=labels.length-lenDefault
	let len=minus<=0?labels.length:lenDefault
	let isEnd=minus<=0?true:false
	let name=''
	let clrObjDefault={names:[],background:[],border:[]}
	
	colorObj=Object.assign({},clrObjDefault,colorObj)
	
	for(var i=0;i<len;i++){
		name=clrNameArr[i]
		colorObj.names.push(name)
		colorObj.background.push(chartColor['background'][name])
		colorObj.border.push(chartColor['border'][name])
	}
	
	//递归结束条件
	if(isEnd){		
		//console.log(colorObj)
		return colorObj
	}
	
	labels=labels.slice(len)
	//console.log(labels)
	
	return getDataColor(labels,colorObj)
	//随机得到0~len范围内的整数值，不含len
	//name=clrNameArr[Math.floor(Math.random() * Math.floor(len))]
}

const dataColor=getDataColor(chartColor.labels)

let data={
		labels: dataColor.names,
		datasets: [{
			label:'数量',
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: dataColor.background,
			borderColor: dataColor.border,
			borderWidth: 1,
			barPercentage: 0.5,
			categoryPercentage: 1,
		}]
	}

let options={
		scales: {
			yAxes: [{
				gridLines: {
					display: true,
				},
				ticks: {
					//stacked: true,
					//beginAtZero: true,
					fontSize:16,
					//suggestedMin:0,
				},
				
			}],
			xAxes: [{
				gridLines: {
					display: true
				},
				ticks: {
					//stacked: true,
					beginAtZero: true,
					suggestedMin:0,
				},
			}]
		},
		title: {
            display: true,
            text: 'Custom Chart Title',
			fontSize:20,
			fontColor:''
        },
		maintainAspectRatio: false,
	}

export default {
	name: 'TheChart',
	data:function(){
		return {
			
			/*//鼠标放在chart上会显示改变前的图形
			chartData:data,
			chartOptions:options
			*/
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
		//不能用箭头函数，应为箭头函数中的‘this’指代不明
		chart:function(){
			return new Chart(this.chartId, {
					type:this.chartType,
					/*//使用data中的定义，鼠标放在chart上会显示改变前的图形
					data:this.chartData,
					options:this.chartOptions */
					//直接定义
					data:data,
					options:options
				})
		},
		//chart.js中的颜色使用数值，将字符转换为数值
		themeClr:function(){
			return bs4TextColor[this.navThemeClr]
		},
		...mapState({
			//resItems:state=>state.fetchCont.response.items,
			
		}),
		...mapGetters({
			//主题颜色
			navThemeClr:'actNavThemeClr',
			chartTitle:'actNavLabel',
			resItems:'resItems',
			actSidebar:'actSidebar'
		}),
	},
	//监视是否需要更新
	watch:{
		chartTitle:function(){
			//console.log(this.chartTitle)
			this.updateChart()
		}
	},
	methods:{
		
		_getSidebarEntry(route){
			let obj={}
			this.actSidebar.catlog.forEach(cat=>{
				if(cat.hasOwnProperty('items')){
					cat.items.forEach(item=>{
						if(item.routeStr==route){
							obj=item
						}
					})
				}	
			})
			return obj
		},
		_getChartData(){
			let self=this
			let result={labels:[],data:[]}
			let items=self.resItems
			
			if(items.length){
				items.forEach(item=>{
					let obj=self._getSidebarEntry(item.routeStr)
					
					result.labels.push(obj.label)
					result.data.push(obj.total)
				})
			}
			
			return result
		},
		updateChart(){
			let self=this
			
			let myChart=self.chart
			let data=myChart.data
			let title=myChart.options.title
			
			let chartData=self._getChartData()
			
			//console.log(chartData)
			title.text=self.chartTitle
			title.fontColor=self.themeClr
			data.labels=chartData.labels
			data.datasets[0].data=chartData.data
			
			return myChart.update()
		}
	},
	mounted(){
		/* 
		//控制台查看vue实例属性值
		console.log(this.$el)
		console.log(this.$props)
		console.log(this.$data)
		console.log(this.$options)
		*/
		this.updateChart()
		//console.log('mounted')
	},
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
