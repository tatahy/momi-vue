//util-chart.js
//chart中的类型
export const typeArr=[
	{name:'bar',label:'直方图'},
	{name:'horizontalBar',label:'水平直方图'},
	// {name:'radar',label:'雷达图'},
	// {name:'doughnut',label:'环状图'},
]

//chart中使用的颜色值
export const rgbaColor={
	labels:['blue', 'yellow', 'purple','green', 'orange','red'],
	background:{
		blue:'rgba(54, 162, 235, 0.2)',
		yellow:'rgba(255, 206, 86, 0.2)',
		green:'rgba(75, 192, 192, 0.2)',
		purple:'rgba(153, 102, 255, 0.2)',
		orange:'rgba(255, 159, 64, 0.2)',
		red:'rgba(255, 99, 132, 0.2)',
	},
	border:{
		
		blue:'rgba(54, 162, 235, 1)',
		yellow:'rgba(255, 206, 86, 1)',
		green:'rgba(75, 192, 192, 1)',
		purple:'rgba(153, 102, 255, 1)',
		orange:'rgba(255, 159, 64, 1)',
		red:'rgba(255, 99, 132, 1)'
	}
}
/* 
//由labArr的数量，根据预定义的chartColor取得颜色值
//因为chartColor.labels.length有上限，递归调用自己
//超过该上限就又按照chartColor.labels的排列顺序得到颜色值
//直到labArr的数量小于上限值
let getDataColor=(labArr,colorObj={})=>{
	const lenDefault=rgbaColor.labels.length
	const clrNameArr=rgbaColor.labels
	
	let minus=labArr.length-lenDefault
	let len=minus<=0?labArr.length:lenDefault
	let isEnd=minus<=0?true:false
	let name=''
	let clrObjDefault={names:[],background:[],border:[]}
	
	colorObj=Object.assign({},clrObjDefault,colorObj)
	
	for(var i=0;i<len;i++){
		name=clrNameArr[i]
		colorObj.names.push(name)
		colorObj.background.push(rgbaColor['background'][name])
		colorObj.border.push(rgbaColor['border'][name])
	}
	
	//递归结束条件
	if(isEnd){		
		//console.log(colorObj)
		return colorObj
	}
	
	labArr=labArr.slice(len)
	//console.log(labels)
	
	return getDataColor(labArr,colorObj)
	//随机得到0~len范围内的整数值，不含len
	//name=clrNameArr[Math.floor(Math.random() * Math.floor(len))]
}
 */

//由num的数量，根据预定义的rgbaColor取得颜色值
//因为clrNameArr.length有上限，
//超过该上限就又按照rgbaColor.labels的排列顺序得到颜色值
export let getDataColor=(num)=>{
	const max=rgbaColor.labels.length
	const clrLabArr=rgbaColor.labels
	//按照num的值生成对应长度的数组
	let arr=[]
	let clrObj={background:[],border:[]}
	//let nCeil=Math.ceil(num/max)
	let nFloor=Math.floor(num/max)
	let n=Math.ceil(num/max)-nFloor
	
	//n<=1即是num<=max,arr不用扩展赋值
	if(n<=1){
		arr=clrLabArr.slice(0,num)
	}
	//num>max，arr需要扩展赋值
	if(n>1){
		for(let m=0;m<nFloor;m++){
			clrLabArr.forEach(lab=>arr.push(lab))
		}
		
		for(let n=0;n<(num-max*nFloor);n++){
			arr.push(clrLabArr[n])
		}
		
	}
	
	//用arr进行赋值
	arr.forEach(name=>{
		clrObj.background.push(rgbaColor['background'][name])
		clrObj.border.push(rgbaColor['border'][name])
	})
	
	return clrObj
	//随机得到0~len范围内的整数值，不含len
	//name=clrNameArr[Math.floor(Math.random() * Math.floor(len))]
}


//horizontalBar
export default {
	type:'horizontalBar',
	data:{
		labels:['blue','yellow','purple','green','orange','red'] ,
		//labels:['专利','项目','技术成果','解决方案'] ,
		datasets: [{
			label:'数量',
			data: [1, 0, 0, 0],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
			],
			borderWidth: 1,
			barPercentage: 0.5,
			categoryPercentage: 1,
		}]
	},
	options:{
		scales: {
			yAxes: [{
				gridLines: {
					display: true,
				},
				ticks: {
					//stacked: true,
					beginAtZero: true,
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
					fontSize:16,
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
}


// export {rgbaColor,getDataColor}