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
			:fields="table.fields"			
			:items="table.items"
			:busy="table.isBusy"
			:per-page="perPage"
			:current-page="currentPage"
			small
		>
			<template v-slot:table-caption >
				<h4 class="text-center align-text-bottom" >
					<span v-bind:class="'text-'+themeClr">{{table.title}}&nbsp;--&nbsp;</span>
					<!-- <span v-show="table.subTitle" class="text-monospace">{{table.subTitle}}</span> -->
					<b-badge v-show="table.subTitle"
							:variant="themeClr" 
							style="font-size:16px;color:#fff;"
					>
						{{table.subTitle}}
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
	<div class="text-right" v-show="rows > perPage">
		<!-- <p> -->
			<span>总数：<b-badge :variant="themeClr">{{ rows }}</b-badge></span>&nbsp;
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
			:total-rows="rows"
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


//引入BsV的plugin
//import { TablePlugin, ModalPlugin, PaginationPlugin } from 'bootstrap-vue'


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
/*
//BSV:Bootstrap-vuez中table插件用到的field对象的属性值
var bsvTableFieldProp={
	key:'',					//String
	label:'',				//String
	class:'',				//String or Array
	sortable:true,			//Boolean
	sortDirection:'',		//String
	thClass:'text-center',				//String or Array
	tdClass:'text-left',				//String or Array or Function
	variant:'',				//String
	headerTitle:'',			//String
	headerAbbr:'',			//String
	formatter:'',			//String or Function
	sortByFormatted:'',		//Boolean or Function
	filterByFormatted:'',	//Boolean or Function
	thStyle:'',				//Object
	thAttr:'',				//Object or Function	
	tdAttr:'',				//Object or Function	
	isRowHeader:'',			//Boolean
	stickyColumn:'',		//Boolean
}
*/
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

//commonJs Module
//module.exports= {
//native JS Module export
export default {
    name: 'TheTable',
    data:function() {
		return {
			perPage: 10,
			currentPage: 1,
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
	computed: mapState({
		//表格内容
		table: state => {
			let actNav=state.activeNav
			let actItem=state.activeSideItem
			let tblItems=state.fetchData.response.hasOwnProperty('items')?
							state.fetchData.response.items:
							tableInitItems
			return {
				title:actNav.props.hasOwnProperty('label')?actNav.props.label:'Title',
				fieldLang:actNav.props.hasOwnProperty('fieldLang')?actNav.props.fieldLang:'chn',
				subTitle:actItem.hasOwnProperty('label')?actItem.label:'subTitle',
				
				fields:tableInitFields,
				items:tblItems,
				isBusy:false
			}
		},
		//每页记录行数	
		rows: state => state.table.items.length,
	}),
	methods: {
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
		...mapGetters({
			//主题颜色
			themeClr:'actNavThemeClr'
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
		//引入BSV的plugin
		TablePlugin, 
		ModalPlugin, 
		PaginationPlugin
		*/
	}

}

</script>

<style>


</style>