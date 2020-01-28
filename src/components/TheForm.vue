<template>
<div>
    <!-- @reset="onReset"  -->
	<b-form 
		@submit.stop.prevent="fetchFormData()"
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
		

		<div class="text-right">
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
import { mapState,mapGetters, mapActions } from 'vuex'

//引入BsV的component
import { 
	BForm,
	BFormGroup,
	BFormInput,
	BFormSelect,
	//BFormSelectOption,
	BFormTextarea,
	BButton,
	
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
	},
	data:function(){
		return {
			formId:`${this.modalId}-form`,
			formData:[], 
			
		}
	},
	computed:{
		triggerLabel:function(){
			let self=this
			let label={
					create:{en:'Create',chn:'新增'},
					update:{en:'Update',chn:'更新'},
			}
			
			return label[self.trigger][self.lang]
		},
		//resetForm中如何还原原有的值
		/*
		formData:{
			get:function(){
				return this.setFormData1()
			},
			set:function(){
				return this.setFormData1()
			}
		},
		*/
		...mapGetters({
			themeClr:'actNavThemeClr',
			actEntry:'actEntry',
			url:'getUrl'
		}),
		...mapState({}),
	},
	methods:{
		//向后端提交数据，并显示后端处理结果
		fetchFormData:function(){
			let self=this
			let opt={
				method:'POST',
				headers: '',
				body:''
			}
			let routeStr=self.actEntry.routeStr+'-'+self.trigger
			let url=`${self.url}/${routeStr.split('-').join('/')}`
			
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
			
			//use JSON
			let data={}
			
			self.formData.forEach(obj=>{
				data[obj.key]=obj.value
			})
			opt.headers={
					//json字符串的编码形式
					'Content-Type': 'application/json'
				}
			opt.body=JSON.stringify(data)
			//opt.body=Object.assign({},data)
			
			
			//alert('fetchFormData()')
			
			console.log(self.trigger)
			console.log(opt)
			
			console.log(data)
			console.log(self.formData)
			
			fetch(url,opt)
			.then(res=>{
				//console.log(res)
				//if(res.ok)
				return res.json()
				//return res.formData()
				//return res.blob()
				
			})
			.then(cont=>{
				console.log('cont: ')
				console.log(cont)
				self.closeModal()
			
			})
			
			//self.$root.$emit('bv::hide::modal', self.modalProps.id)
			
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
		setFormData1(){
			let arr=[]
			
			this.elements.forEach(el=>{
				arr.push({'key':el.key,'value':el.value})
			})
			
			return arr
		
		},
		
		resetForm() {
			//this.formData=this.setFormData1()
			
			
			this.$nextTick(function() {
				this.setFormData()
				//this.formData=this.setFormData1()
				//console.log(this.formData)
				
			})
			
		},
		
		...mapActions({})
	},
	components:{
		BForm,
		BFormGroup,
		BFormInput,
		BFormSelect,
		//BFormSelectOption,
		BFormTextarea,
		BButton,
		
	},
	
	created(){
		this.setFormData()
		//console.log(this.formData)
	},
	destroyed(){
		this.formData=[]
	}	
	

}

</script>

<style>


</style>