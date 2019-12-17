<template>
<div class="overflow-auto">
		
	<div class="text-left">
		
		<b-table class="border-bottom"
			id="my-talbe"
			striped 
			hover 
			caption-top 
			sticky-header="800px"
			no-border-collapse
			:fields="fields"			
			:items="lists"
			:busy="isBusy"
			:per-page="perPage"
			:current-page="currentPage"
			small
		>
			<template v-slot:table-caption >
				<h4 class="text-center align-text-bottom" >
					<span v-bind:class="'text-'+themeClr">{{title}}&nbsp;--&nbsp;</span>
					<!-- <span v-show="table.subTitle" class="text-monospace">{{table.subTitle}}</span> -->
					<b-badge v-show="subTitle"
							:variant="themeClr" 
							style="font-size:16px;color:#fff;"
					>
						{{subTitle}}
					</b-badge>
				</h4>
			</template>
			
			<template v-slot:head()="data">
				<span :class="`text-${themeClr}`">{{ data.label }}</span>
			</template>
			
			<template v-slot:table-busy>
				<div class="text-center text-muted my-2">
					<b-spinner class="align-middle"></b-spinner>
					<strong> 接收数据中...</strong>
				</div>
			</template>
			
			<template v-slot:cell(topic)="data">
				<!-- <b-link href="#">{{ data.value }}</b-link> -->
				
				<b-button 
					variant="link" 
					v-on:click="getInfo(data.item, data.index, $event.target)" 
					class="mr-1 text-left"
				>
					{{ data.value }}
				</b-button>
			</template>
			
			<template v-slot:cell(name)="data">
				<b-button 
					variant="link" 
					v-on:click="getInfo(data.item, data.index, $event.target)" 
					class="mr-1">
					{{ data.value }}
				</b-button>
			</template>
			<!-- actions字段的内容 -->
			<template v-slot:cell(actions)="row">
				<!-- 弹出modal组件 -->
				<b-button 
					size="sm" 
					@click="getInfo(row.item, row.index, $event.target)" 
					class="mr-1"
				>
					Info modal
				</b-button>
				
				<!-- 显示/隐藏detail组件 -->
				<b-button 
					size="sm" 
					@click="row.toggleDetails"
				>
					{{ row.detailsShowing ? 'Hide' : 'Show' }} Details
				</b-button>
				
				<b-form-checkbox 
					v-model="row.detailsShowing" 
					@change="row.toggleDetails"
				>
					Details via check
				</b-form-checkbox>
			</template>

			<!-- detail组件 -->
			<template v-slot:row-details="row">
				<b-card>
					<ul>
						<li v-for="(value, key) in row.item" :key="key">
						{{ key }}: {{ value }}
						</li>
						
					</ul>
				</b-card>
			</template>
			
		</b-table>
	</div>	
	<div class="text-right" v-show="total > perPage">
		<!-- <p> -->
			<span>总数：<b-badge :variant="themeClr">{{ total }}</b-badge></span>&nbsp;
			<!-- <span>Current Page: {{ currentPage }}</span> -->
			<!-- <br> -->
			<!-- <span>每页行数:</span> -->
			<!-- <label>每页行数:</label> -->
			<label>每页行数:
			<b-form-select v-model="perPage" size="sm" :options="options"></b-form-select>	
			</label>
		<!-- </p> -->
		
		<b-pagination
			aria-controls="my-table"
			align="right"
			size="sm"
			v-model="currentPage"
			:total-rows="total"
			:per-page="perPage"	
		></b-pagination>
		
	</div>
	
	<!-- Info modal -->
	<b-modal 
		size="lg"
		:id="infoModal.id" 
		:title="infoModal.title" 
		@hide="resetInfoModal"
		ok-only 
	>
		<pre>{{ infoModal.content }}</pre>
	</b-modal>
	
</div>
</template>

<script>
import { mapState, mapActions,mapGetters } from 'vuex'

//import { asyGetBsvComponent as aGetBsv} from '@/components/util-bootstrap-vue'


//引入BsV的component
import { 
	BTable,
	BModal,
	BPagination,
	BCard,
	BButton,
	BBadge,
	BFormCheckbox,
	BFormSelect 
} from 'bootstrap-vue'

import {fieldProps,FIELDS} from '@/components/util-the-table'

/*
const tableInitFields=[
	{key:'No.','class':'text-center',},
	{key:'age','class':'text-center',},
	{key:'firstName',label:'FName','class':'',},
	{key:'lastName',label:'LName',},
]
const tableInitItems=[
    { 'No.':1, age: 40, firstName: 'Dickerson', lastName: 'Macdonald' },
    { 'No.':2, age: 21, firstName: 'Larsen', lastName: 'Shaw' },
    { 'No.':3, age: 89, firstName: 'Geneva', lastName: 'Wilson' },
    { 'No.':4, age: 38, firstName: 'Jami', lastName: 'Carney' }
]
*/

//native JS Module export
export default {
    name: 'TheTable',
	props: {
		lang:{
			type:String,
			default:'en',
		}
	},
    data:function() {
		return {
			fields:[],
			isBusy:false,
				
			perPage: 10,
			currentPage: 1,
			lists:[],
			options: [
				{ value: 5, text: '5' },
				{ value: 10, text: '10' },
				{ value: 20, text: '20' },
				{ value: 50, text: '50', }
			],
			infoModal: {
				id: 'info-modal',
				title: '',
				content: ''
			}
		}
	},
	computed: {
		//总记录数	
		total:function(){
			return this.resLists.length
		},
		...mapGetters({
			title:'actNavLabel',
			subTitle:'actEntryLabel',
			//主题颜色
			themeClr:'actNavThemeClr'
		}),
		...mapState({
			//表格字段
			//fields:tableInitFields,
			//表格内容
			resLists:state => state.fetchCont.response.lists,
			actFields:function(state){
				let route=state.fetchCont.request.routeStr
				
				return FIELDS.hasOwnProperty(route)
						?FIELDS[route]:[]
			}
		}),
	},
	watch:{
		resLists:function(){
			this.isBusy=true
			//设置lists
			this.setLists()
		
			//设置fields
			this.setFields()
			
			this.isBusy=false
			return 
		}
	
	},
	methods: {
		setLists(){
			//转化为TheTable自己的数据属性，方便修改
			this.lists=this.resLists.slice()
			//添加sn项
			if(this.lists.length){
				this.lists.forEach((list,idx)=>list['serial-number']=idx*1+1)
			}
			return 
		},
		setFields(){
			let self=this
			let tpls=self.actFields
			let lang=self.lang
			self.fields=[]
			
			tpls.forEach(tpl=>{
				let label=tpl.label.hasOwnProperty(lang)
							?tpl.label[lang]
							:tpl.label.en
				//是要显示的才添加到fields中
				if(tpl.isField){
					self.fields.push(Object.assign({},fieldProps,tpl,{label:label}))
				}
				
			})
			
			
			
			return
			
		},
		getInfo(item, index, button) {
			this.infoModal.title = `Row index: ${index}`
			this.infoModal.content = JSON.stringify(item, null, 2)
			this.$root.$emit('bv::show::modal', this.infoModal.id, button)
		},
		resetInfoModal() {
			this.infoModal.title = ''
			this.infoModal.content = ''
		},
		...mapActions({
			//getTableItemsBy: 'asyChangeTable'
		}),
	},
	components:{
		
		//引入BSV的component
		'b-table':BTable,
		'b-modal':BModal,
		'b-pagination':BPagination,
		'b-card':BCard,
		'b-button':BButton,
		'b-form-checkbox':BFormCheckbox,
		'b-form-select':BFormSelect,
		'b-badge':BBadge,
		
		/*
		//动态引入
		'b-table':aGetBsv('b-table'),
		'b-modal':aGetBsv('b-modal'),
		'b-pagination':aGetBsv('b-pagination'),
		'b-card':aGetBsv('b-card'),
		'b-button':aGetBsv('b-button'),
		'b-form-checkbox':aGetBsv('b-form-checkbox'),
		'b-form-select':aGetBsv('b-form-select'),
		'b-badge':aGetBsv('b-badge'),
		*/
	},
	mounted(){
		
		//return this.lists=this.resLists.slice()
	}

}

</script>

<style>


</style>