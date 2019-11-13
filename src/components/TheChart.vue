<template>
	<div>
	
	<canvas id="myChart" width="400" height="400"></canvas>
	
	</div>
</template>

<script>
//import { mapState } from 'vuex'

import Chart from 'chart.js'

export default {
	name: 'TheChart',
	data:function(){
		return {
			
		}
	},
	
	mounted(){
		
		var ctx = document.getElementById('myChart')
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [{
					label: '# of Votes',
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
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		})
		
		console.log(myChart)
		
	},
	/*
	computed: mapState({
		//主题颜色
		themeClr: state=>state.navActive.themeClr,
		isBriefContent:state=>state.isBriefContent,
		//isTableBusy: state=>state.table.isBusy,
	}),
	methods:{
		backdropHide:function(){
			this.showDrop=!this.showDrop
			return this.sidenavHide()
		},
		sidenavShow(){
			this.showSidebar=true
			this.contentMarginLeft='200px'
			this.sidenavDis='block'
			this.showDrop=true
		
		},
		sidenavHide(){
			this.showSidebar=false
			this.contentMarginLeft='0px'
			this.sidenavDis='none'
		},
		sidebarDis(){
			return this.showSidebar?this.sidenavHide():this.sidenavShow()
		}
	},
	props: {
		msg: String
	},
	components: {
		TheTable,
		TheSidebar
	}, 
	*/	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
