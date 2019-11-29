<template>
	<div class="chart-container">
	
		<canvas :id="chartId"></canvas>
	
	</div>
</template>

<script>
import { mapState } from 'vuex'
import {bs4TextColor,chartColor} from '@/conf/common.conf.js'

import Chart from 'chart.js'

let type= 'horizontalBar'
//let type= 'bar'
let labels=chartColor.labels
//let labels=[1, 2, 3,4, 5,6,7,1, 2, 3,4, 5,6,7]

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

const dataColor=getDataColor(labels)

let data={
		labels: dataColor.names,
		datasets: [{
			label:'数量',
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: dataColor.background,
			borderColor: dataColor.border,
			borderWidth: 1
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
			chartId:'myChart',
		}
	},
	/*props: {
		msg: String,
		navChanged:{
			type:Boolean,
			default:false,
			required:true
		}
	},
	*/
	computed:{
		chart:function(){
			return new Chart(this.chartId, {
					type:type,
					data:data,
					options:options 
				})
		},
		...mapState({
			chartDataLabels: state=>{
				let items=state.sideActive.items
				let arr=items.hasOwnProperty('labels')?items['labels']:['xx']
					
				return arr
			
			},
			chartDataSetsData:state=>{
				let items=state.sideActive.items
				let arr=items.hasOwnProperty('totals')?items['totals']:['xx']
					
				return arr
			},
			chartTitle:state=>state.entity.label,
			
			themeClr:state=>{
				let clrStr=state.navActive.themeClr
				let clrObj=bs4TextColor
				let clrVal=Object.keys(clrObj).includes(clrStr)?
						clrObj[clrStr]
						:''
			
				return clrVal
			}

		}),
	},
	watch:{
		chartTitle:function(){
			this.updateChart()
			//console.log('watch: ')
			//console.log(data)
		}
	
	},
	methods:{
		updateChart(){
			let self=this
			let myChart=self.chart
			let data=myChart.data
			let title=myChart.options.title

			title.text=self.chartTitle
			title.fontColor=self.themeClr
			data.labels=self.chartDataLabels
			data.datasets[0].data=self.chartDataSetsData
			
			return myChart.update()
		}
	},
	mounted(){
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
