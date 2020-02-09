<template>
<div>
    <!-- @reset="onReset" @submit.stop.prevent="fetchFormData()" -->
	<!-- @submit="fetchFormData($event)" -->
	<b-form 
		
		@submit="fetchFormData"
		@reset.stop.prevent="resetForm()" 		
		:id="formId"
		
	>
		<!-- 
		<b-form-group
			id="input-group-1"
			:label="`${elements[0].label}:`"
			label-for="input-1"
			description="We will never share your email with anyone else."
		>
			
			<b-form-input
				id="input-1"
				v-model="formData[0].value"
				type="text"
				required
				:placeholder="formData[0].value?``:`输入${elements[0].label}`"
			></b-form-input>
		</b-form-group>
		-->
		
		<b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
			内容没有变化
		</b-alert>
		
		
		<b-form-group
			v-for="(el,index) in elements"
			v-bind:key="index"
			:id="`form-group-${index}`"
			:label="`${el.label}`"
			:label-for="`form-element-${index}`"
			:label-class="`text-${themeClr}`"
			:description="getDescription(index)"
		>
			<template v-if="el.formElement.name=='input'">
				<b-form-input
					v-model="formData[index].value"
					required
					size="sm"	
					:type="`${el.formElement.type}`"
					:id="`form-element-${index}`"
					:placeholder="formData[index].value?``:`...输入${elements[index].label}...`"
				></b-form-input>
			
			</template>
			
			<template v-if="el.formElement.name=='select'">
				<b-form-select
					v-model="formData[index].value"
					required
					size="sm"	
					:id="`form-element-${index}`"
					:options="el.formElement.options" 
				>
					<!-- <template v-slot:first> -->
						<!-- <b-form-select-option  -->
							<!-- value=""  -->
							<!-- disabled -->
							<!-- selected -->
						<!-- > -->
							<!-- -- Please select an option --</b-form-select-option> -->
					<!-- </template> -->
				</b-form-select>
			
			</template>
			<!-- max-rows="5" -->
			<template v-if="el.formElement.name=='textarea'">
				<b-form-textarea
					v-model="formData[index].value"
					required
					size="sm"	
					rows="3" 
					:id="`form-element-${index}`"
					:placeholder="formData[index].value?``:`...输入${elements[index].label}...`"
				>
					<pre>{{formData[index].value}}
					</pre>
				</b-form-textarea>
			
			</template>
			
		</b-form-group>
		
		<hr class="mw-100" >

		<div class="text-right ">
			<b-button 
				class="mr-1"
				size="sm" 
				type="submit" 
				variant="primary"
			>{{triggerLabel}}</b-button>
			<b-button 
				class="mr-1"
				size="sm" 
				variant="primary"
				@click="closeModal()"
			>取消</b-button>
			<b-button size="sm" type="reset" variant="outline-secondary">重置</b-button>
		</div>
	</b-form>
	
	<!-- 
    <b-card class="mt-3" header="Form Data Result">
		{{ form }}      
		<pre class="m-0">{{ form }}</pre>
    </b-card> 
	-->
</div>
</template>

<script>
import { mapState,mapGetters, mapActions,mapMutations } from 'vuex'

//引入BsV的component
import { 
	BForm,
	BFormGroup,
	BFormInput,
	BFormSelect,
	//BFormSelectOption,
	BFormTextarea,
	BButton,
	BAlert
	
} from 'bootstrap-vue'


export default {
	name:'TheForm',
	props:{
		elements: {
			type: Array,
			required:true,
			// Object or array defaults must be returned from
			// a factory function
			default: function () {
				return [{key:'topic',label:'题目',value:'xxx',formElement:{name:'input',type:'text'}}]
			}
		},
		lang:{
			type:String,
			default:'chn',
			validator: function (value) {
				// The value must match one of these strings
				return ['en', 'chn'].indexOf(value) !== -1
			}
		},
		trigger:{
			type:String,
			default:'create',
			validator: function (value) {
				// The value must match one of these strings
				return ['create', 'update'].indexOf(value) !== -1
			}
		},
		modalId:{
			type:String,
			required: true,
		},
		listIndex:{
			type:Number,
			default:-1,
			required: true,
		},
	},
	data:function(){
		return {
			formId:`${this.modalId}-form`,
			//key-value数组，v-model与value绑定
			formData:[], 
			showDismissibleAlert:false
			
		}
	},
	computed:{
		triggerLabel:function(){
			let self=this
			let label={
					create:{en:'Create',chn:'新增'},
					update:{en:'Update',chn:'更新'},
					retrieve:{en:'Retrieve',chn:'查询'},
					'delete':{en:'Delete',chn:'删除'},
			}
			
			return label[self.trigger][self.lang]
		},
		themeClr:function(){
			return this.actNavbar.themeClr
		},
		sysEnt:function(){
			return this.actEntry.sysEnt
		},
		routeStr:function(){
			
			
			return this.actEntry.routeStr
		},
			
		//resetForm中如何还原原有的值
		/*
		formData:{
			get:function(){
				return this.getFormDataArr()
			},
			set:function(){
				return this.getFormDataArr()
			}
		},
		*/
		...mapGetters([
			'actNavbar',
			'actEntry',
		]),
		...mapState({
			sidebarIndex:state=>state.sidebar.index,
			host:state=>state.host,
		}),
	},
	methods:{
		//向后端提交数据，并显示后端处理结果
		fetchFormData:function(event){
			event.preventDefault()
			
			let self=this
			let opt={
				method:'POST',
				//mode: 'no-cors',
				headers: '',
				body:''
			}
			let url=`${self.host}/${self.routeStr.split('-').join('/')}/${self.trigger}`
			
			//let actEntryChange
			
			/*
			//use FormData()
			//let data=new FormData(document.getElementById(self.formId))
			let data=new FormData()
			
			data.set('oprt',self.trigger)
			
			self.formData.forEach(obj=>{
				data.set(obj.key,obj.value)
			})
			opt.headers={
					//'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
					//有文件上传必须用multipart/form-data
					//'Content-Type':'multipart/form-data;boundary='+'---xx'
					'Content-Type':'multipart/form-data'
				}
			opt.body=data
			*/
			
			//将数组中的键值对对象，转为Json对象
			let changeKeyVal2Obj=arr=>{
				let retObj={}
				arr.forEach(obj=>{
					retObj[obj.key]=obj.value
				})
				
				return retObj
			}
			//
			let isTrue=value=>value==true
						
			let oriData=changeKeyVal2Obj(self.getFormDataArr())
			
			let data=changeKeyVal2Obj(self.formData)
			let changeArr=[]
			
			
			//判断oriData与data的元素是否有不同			
			for(let key in oriData){
				changeArr.push(oriData[key]===data[key]?true:false)
			}
			
			
			if(changeArr.every(isTrue)){
				return self.showDismissibleAlert=true
			}
			
			//有修改!changeArr.every(isTrue)才有后续动作	
			opt.headers={
					//json字符串的编码形式
					'Content-Type': 'application/json'
				}
			//use JSON
			opt.body=JSON.stringify(data)
			//opt.body=Object.assign({},data)
			
			fetch(url,opt)
			.then(res=>{
				//console.log(res)
				//if(res.ok)
				return res.json()
				//return res.formData()
				//return res.blob()
				
			})
			.then(cont=>{
				//console.log('cont: ')
				//console.log(cont)
				
				if(cont.success){
				
					self.asyChangeSideItem(cont.routeStr)
					
					//console.log(self.routeStr)
					//console.log(cont.routeStr)
					
					self.$root.$emit('bv::hide::modal', self.modalId)
					
					//刷新表格，不起作用？？
					//self.$root.$emit('bv::refresh::table', 'my-table')
					
					//注册一个事件，通知使用TheForm的组件
					self.$emit('event-form-submit',cont)
					
				}	
			
			})
			
			//self.$root.$emit('bv::hide::modal', self.modalId)
			
		},
		closeModal(){
			let self=this
			return self.$root.$emit('bv::hide::modal', self.modalId)
		
		},
		getDescription(index){
			let self=this
			let el=self.elements[index]
			let data=self.formData[index]
			
			let trigger=self.trigger
			//let triggerLabel=self.triggerLabel
			
			let str=''
			
			//
			if(trigger=='create'){
				//str=el.formElement?`${triggerLabel}'${el.label}'`:'系统自动维护'
				str=el.formElement?``:'系统自动生成'
			}
			
			if(trigger=='update'){
				if(data.value){
					str=el.formElement?'':`${data.value} (系统自动维护)`
				}				
			}
	
			//el.formElement?`${triggerLabel}'${el.label}'`:`${}`
			
			return str
		},
		setFormData(){
			let self=this
			self.formData=[]
			
			self.elements.forEach(el=>{
				self.formData.push({'key':el.key,'value':el.value})
			})
			
			return self.formData
		
		},
		getFormDataArr(){
			let arr=[]
			
			this.elements.forEach(el=>{
				arr.push({'key':el.key,'value':el.value})
			})
			
			return arr
		
		},
		
		resetForm() {
			//this.formData=this.getFormDataArr()
			let self=this
			
			self.$nextTick(function() {
				//this.setFormData()
				self.showDismissibleAlert=false
				self.formData=self.getFormDataArr()
				//console.log(this.formData)
				
			})
			
		},
		
		...mapActions([
			'asyChangeSideItem'
		]),
		...mapMutations({
			updateList:'updateFetchContResponseList'
		}),
		
	},
	components:{
		BForm,
		BFormGroup,
		BFormInput,
		BFormSelect,
		//BFormSelectOption,
		BFormTextarea,
		BButton,
		BAlert
		
	},
	
	created(){
		//this.setFormData()
		
		this.formData=this.getFormDataArr()
		
		//console.log(this.formData)
	},
	destroyed(){
		this.formData=[]
	}	
	

}

</script>

<style>


</style>