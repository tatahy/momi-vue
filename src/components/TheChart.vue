<template>
	<div class="chart-container">
	
		<canvas :id="chartId"></canvas>
	
	</div>
</template>

<script>
import { mapState } from 'vuex'
import {textColorBSValue} from '@/conf/common.conf.js'

import Chart from 'chart.js'

let type= 'horizontalBar'
//let type= 'bar'

let data={
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [{
			label:'数量',
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)'
				],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			],
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
	props: {
		msg: String,
		navChanged:{
			type:Boolean,
			default:false,
			required:true
		}
	},
	computed:{
		chart:function(){
			return new Chart(this.chartId, {
					type:type,
					data:data,
					options:options 
				})
		},
		...mapState({
		chartLabel: state=>{
			let items=state.sideActive.itemSets
			let arr=items.hasOwnProperty('label')?items['label']:['xx']
					
			return arr
			
		},
		chartDataSetsData:state=>{
			let items=state.sideActive.itemSets
			let arr=items.hasOwnProperty('total')?items['total']:['xx']
					
			return arr
		},
		//chartTitle:state=>state.navActive.label
		chartTitle:state=>state.sideActive.label,
		isBriefContent: state=>state.isBriefContent,
		isNavChanged: state=>state.isNavChanged,
		themeClr:state=>{
			let clrStr=state.navActive.themeClr
			let clrObj=textColorBSValue
			let clrVal=Object.keys(clrObj).includes(clrStr)?
						clrObj[clrStr]
						:''
			
			return clrVal
		}
		
		//chartLabel: state=>Object.keys(state.navActive.catogery.itemsTotal)
		
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
			let options=myChart.options

			options.title.text=self.chartTitle
			options.title.fontColor=self.themeClr
			data.labels=self.chartLabel
			data.datasets[0].data=self.chartDataSetsData
			
			return myChart.update()
		}
	},
	mounted(){
		
		this.updateChart()
		//console.log('mounted')

	},
	updated(){
		//let option={label:this.chartLabel}	

		if(this.isBriefContent && this.isNavChanged){
			//this.$forceUpdate()
			//console.log('updated')
		}	
		//
	},
	destroyed(){
		//console.log('destroyed')
		/*
		this.$nextTick(function () {
				console.log('destroyed')
		})
		*/
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
