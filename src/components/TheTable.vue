<template>
<div class="overflow-auto">
		
	<!-- <div class="text-left"> v-on:event-table-refesh="refeshTable(trigger,listIndex)"-->
		
		<b-table class="border-bottom"
			id="my-talbe"
			responsive
			striped 
			hover 
			caption-top 
			sticky-header="800px"
			no-border-collapse
			:head-row-variant="themeClr"
			:fields="getFieldsInDetail(false)"			
			:items="resLists"
			:busy="isBusy"
			:per-page="perPage"
			:current-page="currentPage"
			small
			
		>
			<template v-slot:table-caption >
				<h4 class="text-center align-text-bottom" >
					<span :class="`text-${themeClr}`">{{title}}&nbsp;--&nbsp;</span>
					<span 
						v-show="subTitle"
						:class="`badge badge-${themeClr}`" 
						style="font-size:16px;"
					
					>
						{{subTitle}}
					</span>
					
				</h4>
				
				<!-- 弹出modal组件, '新增'表单 -->
				<b-button 
					v-if="actNav.routeStr!='system'"
					size="sm" 
					v-on:click="toggleModal('', 'create', $event.target)" 
					class="m-1 float-right"
					variant="primary"
					
				>
					新增
				</b-button>
			</template>
			
			<!-- <template v-slot:head()="data"> -->
				<!-- <span :class="`text-${themeClr}`">{{ data.label }}</span> -->
			<!-- </template> -->
			
			<template v-slot:table-busy>
				<div class="text-center text-muted my-2">
					<b-spinner class="align-middle"></b-spinner>
					<strong> 接收数据中...</strong>
				</div>
			</template>
			
			
			<!-- 
			<template v-slot:cell(topic)="data">
				
				
				<b-button 
					variant="link" 
					v-on:click="toggleModal(data.item, `${data.value}`, $event.target)" 
					class="mr-1 text-left"
				>
					{{ data.value }}
				</b-button>
			</template>
			
			<template v-slot:cell(name)="data">
				<b-button 
					variant="link" 
					v-on:click="toggleModal(data.item, `${data.value}`, $event.target)" 
					class="mr-1 text-left">
					{{ data.value }}
				</b-button>
			</template> 
			-->
			
			<!-- actions字段的内容 -->
			<template v-slot:cell(actions)="row">
				<!-- 弹出modal组件 class="mr-1"-->
				<b-button 
					size='sm'
					variant="primary"
					class="py-0 px-1 ml-1 mt-1"					
					v-on:click="toggleModal(row, 'update', $event.target)" 
				>
					更新
				</b-button>
				
				<!-- 显示/隐藏detail组件-->
				<b-button 
					size='sm'
					variant="primary"
					class="py-0 px-1 ml-1 mt-1"
					:class="row.detailsShowing ? `btn-${themeClr}`: null"
					v-on:click="row.toggleDetails"
				>
					{{ row.detailsShowing ? '隐藏': '详情'  }} 
				</b-button>
			
			</template>

			<!-- detail组件 -->
			<template v-slot:row-details="row">
				<b-card>
					<b-media>
						<!-- actNav.routeStr=='mentor'-->
						
						<template 
							v-slot:aside
							v-if="actNav.routeStr=='mentor'"
						>
						<!-- <b-row > -->
							<b-img 
								blank 
								blank-color="#ccc" 
								width="168" 
								height="200"
								alt="placeholder"
								class="rounded shadow"
							>
							</b-img>
						<!-- </b-row>	 -->
						</template>
						
						<h5 class="d-none d-sm-flex"><strong>详情</strong></h5>
						
						<b-row 
							class="d-none d-sm-flex"
							v-for="(obj, index) in getFieldsInDetail()" :key="index"
						>
						
							<template v-if="obj.formElement && obj.isInDetail">
							<b-col 
								cols="2" 
								:class="labelClr"
							> 
								<strong>{{ obj.label+'：'}}</strong>
							</b-col>
							<b-col 
								cols="10"
								:class="textClr"
							>
								{{ setTextInDetail(obj.key,row.item[obj.key]) }}
							</b-col>
							</template>
						</b-row>
					</b-media>
					
					<div class="d-sm-none">
					<h5 class="pt-3 py-2"><strong>详情</strong></h5>
					<b-row 
						v-for="(obj, index) in getFieldsInDetail()" 
						:key="index"
					>
						
						<template v-if="obj.formElement && obj.isInDetail">
						<b-col 
							cols="3" 
							:class="labelClr"
						> 
							<strong>{{ obj.label+'：'}}</strong>
						</b-col>
						<b-col 
							cols="9"
							:class="textClr"
						>
							{{ setTextInDetail(obj.key,row.item[obj.key]) }}
						</b-col>
						</template>
					</b-row>
					</div>
				</b-card>
			</template>
			
		</b-table>
	<!-- </div>	 -->
	<div class="text-right" v-show="total > perPage">
		<b-row>
			<b-col cols="8" style="padding-top:5px;">
				<span >总数：<b-badge :variant="`${themeClr}`" style="font-size:14px;">{{ total }}</b-badge></span>
			</b-col>
			<b-col>
				<b-form-group
					label-cols="6"
					label-align="right"
					label="每页行数:"
				>
					<!-- size="sm"  -->
					<b-form-select 
						v-model="perPage" 
						:options="options"
					></b-form-select>	
				</b-form-group>			
			</b-col>
		</b-row>
			
		<b-row>
			<b-col>
				<!-- size="sm" -->
				<b-pagination
					aria-controls="my-table"
					align="right"
					v-model="currentPage"
					:total-rows="total"
					:per-page="perPage"	
				></b-pagination>
			</b-col>	
		</b-row>
		
	</div>
	
	<!-- Info modal :title="modalProps.title" -->
	<b-modal 
		size="lg"
		scrollable
		:id="modalProps.id" 
		:hide="resetModalInfo"
		:hide-footer="true"
	>
		<template v-slot:modal-title>
			<h4 class="text-left align-text-bottom" >
				<span :class="`text-${themeClr}`">{{title}}&nbsp;--&nbsp;</span>
				<span 
					v-show="subTitle"
					:class="`badge badge-${themeClr}`" 
					style="font-size:16px;"
						
				>
					{{subTitle}}
				</span>
				
			</h4>
			<!-- <span :class="`badge badge-${themeClr}`">{{modalProps.title}}</span>		 -->
		</template>
	
		<!-- <pre>{{ modalProps.item }}</pre> -->
		
		<template 
			v-slot:default
			v-if="formTrigger"
		>
			<TheForm 
				v-bind:elements="formElements"
				v-bind:modalId="modalProps.id"
				v-bind:trigger="formTrigger"
				v-bind:listIndex="modalProps.itemIndex"
				v-on:event-form-submit="refeshTable"
			>
			
			</TheForm>
		</template>
						
	</b-modal>
	
</div>
</template>

<script>
import { mapState,mapGetters, mapActions } from 'vuex'

//import { asyGetBsvComponent as aGetBsv} from '@/components/util-bootstrap-vue'


//引入BsV的component
import { 
	BTable,
	//BModal,
	BPagination,
	BCard,
	BButton,
	BBadge,
	//BContainer,
	BRow,
	BCol,
	BFormGroup,
	//BFormCheckbox,
	BFormSelect, 
	BMedia,
	BImg,
	//modal插件
	ModalPlugin
	
} from 'bootstrap-vue'

import Vue from 'vue'
//使用modal插件
Vue.use(ModalPlugin)

import {fieldProps,FIELDS,FIELDSINDETAIL} from '@/components/util-the-table'

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
			
			isBusy:false,
			perPage: 10,
			currentPage: 1,
			fields:[],
			
			options: [
				{ value: 5, text: '5' },
				{ value: 10, text: '10' },
				{ value: 20, text: '20' },
				{ value: 50, text: '50', }
			],
			modalProps: {
				id: 'info-modal',
				title: '',
				item: '',
				itemIndex:'',
			},
			formTrigger:'create',
			formElements:[],
			labelClr:'p-0 py-2 text-right',
			textClr:'p-0 pl-1 py-2 text-left border-top'
		}
	},
	computed: {
		title:function(){
			return this.actNav.label
		},
		subTitle:function(){
			return this.actItem.label
		},
		//主题颜色
		themeClr:function(){
			return this.actNav.themeClr
		},
		//总记录数	
		total:function(){
			return this.resLists.length
		},
		routeStr:function(){
			return this.actItem.routeStr
		},
		//fields:function(){
			//return this.setFields()
		//},
		...mapGetters({
			actNav:'actNavbar',
			actItem:'actEntry'
		}),
		...mapState({
			//表格内容
			resLists:state => {
				let lists=state.fetchCont.response.lists
				let arr=[]
				
				if(lists.length){
					//添加sn项，并逐项复制转化为TheTable自己的数据属性，
					//方便修改。
					lists.forEach((list,idx)=>{
						if(typeof list =='object'){
							//list为对象，必须用Object.assign()进行复制，
							//否则就是对象的浅拷贝（按引用复制）
							arr[idx]=Object.assign({},{'serial-number':idx*1+1},list)
							
						}
					})
				}
				return arr
			},
		}),
	},
	watch:{
		
		resLists:function(){
			let self=this
			
			self.isBusy=true
			
			//设置fields
			self.setFields()
			
			//console.log('ThetTable watch: resLists')
			//console.log(self.fields)
			
			self.isBusy=false
			return 
		}
		/*
		resLists:{
			handler: function(){
				let self=this
				
				self.isBusy=true
				//设置lists
				self.setLists()
				//设置fields
				self.setFields()
				
				self.isBusy=false
				
				//console.log('TheTable-watch() ')
				return 
			},
			deep: true,
			//immediate: true
		}
		*/
	},
	methods: {
		setLists(){
		//setLists(idArr=[]){
			let self=this
			let resLists=self.resLists
			let lists=self.lists=[]
			//let lists=[]
			
			/*
			if(idArr.length){
				console.log(idArr.length)
				idArr.forEach(id=>{
					self.lists[id]=Object.assign({},resLists[id])
				})
				return
			}
			*/
			//添加sn项，并逐项复制转化为TheTable自己的数据属性，方便修改，
			//lists=[]
			if(resLists.length){
		
				resLists.forEach((list,idx)=>{
				//list为对象，必须用Object.assign()进行复制，否则就是对象的浅拷贝（按引用复制）
					if(typeof list =='object'){
						lists[idx]=Object.assign({},{'serial-number':idx*1+1},list)
					}
				})
			}
			
			//console.log(lists)
			return 
		},
		setFields(){
			let self=this
			let routeStr=self.routeStr
			let defArr=FIELDS.hasOwnProperty(routeStr)
						?FIELDS[routeStr]:FIELDS['default']
			
			let lang=self.lang
			let fields=[]
			
			if(defArr.length){
				defArr.forEach(obj=>{
					let label=obj.label.hasOwnProperty(lang)
								?obj.label[lang]
								:obj.label.en
					let field=Object.assign({},fieldProps,obj,{'label':label})
					//是要显示的才添加到fields.show中
					fields.push(field)
					
				})
			}
			self.fields=fields
			return fields
		},
		getFieldsInDetail(isIn=true){
			let self=this
			//let fields=self.fields.length?self.fields:self.setFields()
			let fields=self.setFields()
			
			let arr=[]
			
			fields.forEach(el=>{
				if(isIn===el.isInDetail){
					arr.push(el)
				}		
			})
			return arr
		},
		//select元素的显示内容由其value值转为对应的text值
		setTextInDetail(key,value){
			let sysEnt=this.actItem.sysEnt
			let optionArr=FIELDSINDETAIL.hasOwnProperty(sysEnt)?
						(FIELDSINDETAIL[sysEnt].hasOwnProperty(key)?FIELDSINDETAIL[sysEnt][key]:[]):[]
			
			if(optionArr.length){
				optionArr.forEach(opt=>{
					if(value==opt.value){
						value=opt.text
					}
				})
			}
	
			return value
		},
		//根据this.fields，item得到各个form元素对应的绑定对象，用于后续的校验、提交等操作。
		setFormElements(item){
			let self=this
			let elements=self.formElements=[]
			let obj={key:'',value:''}
			
			let combineArr=arr=>{
			
				if(arr.length){
					if(!Object.keys(item).length){
						//每个数组元素el是对象,对象的复制要用Object.assign()
						arr.forEach(el=>{
							el.hasOwnProperty('formElement')?elements.push(Object.assign({},el)):''
						})
					}else{
						//每个数组元素el是对象,对象的复制要用Object.assign()
						arr.forEach(el=>{
							if(item.hasOwnProperty(el.key) && el.hasOwnProperty('formElement')){
								obj.key=el.key
								obj.value=item[el.key]
							
								elements.push(Object.assign({},el,obj))
							}
						})
					}				
				}
				
				return elements
			}
			
			combineArr(self.fields)
		
			return elements
		},
		toggleModal(row, trigger, button) {
			let self=this
			let item={}
			let rowDefault={item:'',index:-1}
			
			row=Object.assign({},rowDefault,row)
			item=row.item
			
			self.modalProps.item =item
			self.modalProps.itemIndex =row.index
			//self.modalProps.item = JSON.stringify(item, null, 2)
			if(item.hasOwnProperty('topic')){
				self.modalProps.title = item.topic
			}
			
			if(item.hasOwnProperty('name')){
				self.modalProps.title = item.name
			}
			
			//console.log(trigger,item)
			//console.log(self.fields)
			self.formTrigger=trigger
			self.formElements=[]
			self.setFormElements(item)
			
			
			
			//self.$root.$emit('bv::show::modal', self.modalProps.id, button)
			self.$root.$emit('bv::toggle::modal', self.modalProps.id, button)
		},
		refeshTable:function(cont){
			let self=this
			//let listIndex=self.modalProps.itemIndex
			/*
			
			let trigger=self.formTrigger
			
			
			console.log('event-table-refesh')
			console.log(trigger+listIndex)
			*/
			//self.setLists([listIndex])
			
			
			console.log('TheTable, refreshTable()')
			
			console.log(cont)
			if(cont.success){
				//self.setLists()
			//注册一个事件，通知使用TheTable的组件
				self.$emit('event-table-refresh',cont)
				self.showMsgBox('成功')
			}
		
		},
		showText(key){
		
			return key+'：'
		},
		showMsgBox(msg) {
			//使用BSV中的简单msgBox
			this.$bvModal.msgBoxOk(msg,{
				title: 'Confirmation',
				size: 'sm',
				buttonSize: 'sm',
				okVariant: 'success',
				headerClass: 'p-2 border-bottom-0',
				footerClass: 'p-2 border-top-0',
				centered: true
			})
			.then(value => {
				console.log(value)
				console.log(msg)
			})
			.catch(err => {
				console.log(err)// An error occurred
			})
		},
		resetModalInfo() {
			this.modalProps.title = ''
			this.modalProps.item = ''
			this.modalProps.itemIndex = ''
		},
		resetFormData(){
			this.resetModalInfo()
		},
		...mapActions({
			//getTableItemsBy: 'asyChangeTable'
		}),
		
	},
	components:{
		
		//引入BSV的component
		'b-table':BTable,
		//'b-modal':BModal,
		'b-pagination':BPagination,
		'b-card':BCard,
		'b-button':BButton,
		'b-form-group':BFormGroup,
		//BContainer,
		'b-row':BRow,
		'b-col':BCol,
		//'b-form-checkbox':BFormCheckbox,
		'b-form-select':BFormSelect,
		'b-badge':BBadge,
		BMedia,
		BImg,
		
		//动态引入
		TheForm:()=>import('@/components/TheForm'),
		
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
		/*
		this.$on('event-table-refesh', function(trigger,listIndex){
				console.log('event-table-refesh')
				console.log(trigger+listIndex)
			}
		
		)
		
		
		this.$listeners{'event-table-refesh', function(trigger,listIndex){
				console.log('event-table-refesh')
				console.log(trigger+listIndex)
			}
		
		}	
		*/
		//return this.lists=this.resLists.slice()
	}

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>