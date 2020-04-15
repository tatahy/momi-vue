<template>
<div>			
	<div class="chart-container">
		<canvas :id="id"></canvas>
	</div>
	<br>
	<b-form-group
		label-cols="8"
		label-align="right"
		v-bind:label-class="`text-${navThemeClr}`"
		label="选择图形:"
	>
		<b-form-select 
				v-model="type" 
				:options="selOpts">
		</b-form-select>
	</b-form-group>
</div>
</template>

<script>
import { mapGetters} from 'vuex'
import {bs4TextColor} from '@/conf/common.conf.js'

import Chart from 'chart.js'

import {default as chartConf,getDataColor,typeArr} from '@/components/util-chart'

import {
	BFormSelect,
	BFormGroup 
} from 'bootstrap-vue'

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
			// type:'bar',
			type:'horizontalBar',
			//存储Chart实例
			ctx:null
		}
	},
	computed:{
		//用于实例化Chart的各项参数
		config:function(){
			//一定要用Obj.assign()，否则就是按引用返回，无法进行chart重绘
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
		},
		entries:function(){			
			return this.updateChart()
		},
	},
	methods:{
		setConfig(){
			let self=this

			let config=self.config
			let entries=self.entries
	
			let title=config.options.title
			let datasets=config.data.datasets[0]
			
			let getEntryLabel=route=>{
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
				return obj.label
			}
			//更改标题
			title.text=self.title
			title.fontColor=self.themeClr
			
			//改变颜色
			if(datasets.data.length){
				let clrObj=getDataColor(datasets.data.length)
				datasets.backgroundColor=clrObj.background
				datasets.borderColor=clrObj.border
			}	

			//datasets有关的数据从entries获得
			if(entries.length){
				//数据名称数组
				config.data.labels=[]
				//数据值数组
				datasets.data=[]
				entries.forEach((ent,idx)=>{
					config.data.labels[idx]=getEntryLabel(ent.routeStr)
					datasets.data[idx]=ent.total
				})
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
			// console.log('getChart()',self.entries)
			self.ctx=new Chart(self.id,self.config)
			return			
		},
		updateChart(){
			this.setConfig()
			return	this.ctx.update()
		}
		
	},
	components:{
		BFormSelect,
		BFormGroup 
	},
	mounted(){
		//实例化Chart
		this.$nextTick(function(){
			this.getChart()
		})
	},
	destroyed(){
		//销毁Chart实例
		this.ctx.destroy()
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