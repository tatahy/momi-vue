<template>
<div>
	<!-- :state="Boolean(file)" 
	
	-->
	
	<h5>{{title}}</h5>
    <b-form-file
		class="my-2"
		placeholder="选择一个文件..."
		drop-placeholder="把文件拖到这里..."
		v-model="file"
		:state="fileCheck.ready" 
		:accept="extStr"
		browse-text="选择文件"
    ></b-form-file>
    <!-- <div v-if="fileCheck.ready" class="my-2">上传文件: 
		<P class="px-2"><strong>{{ file ? file.name : '' }}</strong></P>
	</div> -->
	
	<P 
		v-if="fileCheck.ready" 
		:class="pCls"
	>
		上传文件: <strong>{{ file ? file.name : '' }}</strong>
		
	</P>
	
	<P
		v-if="!fileCheck.ext"
		:class="pCls"
	>
		文件类型: 
		<span 
			class="mr-2 pb-2 font14px"
			:class="badgeCls"
			v-for="(ext,index) in extArr"
			v-bind:key="index"
		>
			{{ext}}
		</span>		
	</P>
	
	<P
		v-if="!fileCheck.size"
		:class="pCls"
	>
		文件不大于: 
		<span 
			class="py-1 font14px"
			:class="badgeCls"
		>
			{{size}}KB
		</span>
	</P>
	
	<div 
		v-if="fileCheck.ready"
		class="text-right"
		
	>
		<hr>
		
		<b-button 
			class="mr-1"
			size="sm" 
			variant="primary"
			@click="uploadFile"
		>上传
		</b-button>
		
		<b-button 
			class="mr-1"
			size="sm" 
			variant="outline-dark"
			@click="file = null"
		>清空
		</b-button>
	</div>

</div>
</template>

<script>
//mapActions,
import { mapState,mapGetters,mapMutations } from 'vuex'

//引入BsV的component
import { 
	BFormFile,
	BButton
	
} from 'bootstrap-vue'


export default {
	name:'TheFileUpload',
	props:{
		title: {
			type: String,
			//required:true,
			// Object or array defaults must be returned from
			// a factory function
			default: '文件上传'
		},
		url:{
			type:String,
			required:true,
		},
		name:{
			type:String,
			required:true,
		},
	},
	//定义父组件使用的V-model
	model: {
		//定义v-model使用的变量
		prop: 'inputFile',
		//定义v-model使用的事件
		event: 'event-input-file'
	},
	
	data:function(){
		return {
			file: null,
			inputFile:null,
			//extStr:'image/jpeg, image/png, image/gif',
			extStr:'.jpg, .jpeg, .png, .gif',
			size:256,
			badgeCls:"badge badge-danger",
			pCls:"my-2 px-2 align-text-bottom"
		}
	},
	computed:{
		extArr:function(){
			return this.extStr.split(',')
		},
		fileCheck:function(){
			return this.validateFile()
		},
		...mapGetters([
			
		]),
		...mapState({
			request:state=>state.fetchCont.request,
		}),
	},
	methods:{
		validateFile(){
			let self=this
			//file.size是字节数
			let maxSize=self.size*1024
			let file=self.file
			//file.type='image/jpeg'
			let ext=file?file.type.split('/')[1]:null
			let size=file?file.size:0
			
			let result={
				'ready':false,
				'ext':self.extStr.includes(ext)?true:false,
				'size':(file && size<=maxSize )?true:false
			}
			
			result.ready=(result.ext && result.size)?true:false
			
			return result
		},
	
	
		//异步处理文件上传
		uploadFile:async function(){
			let self=this
			let url=self.url
			let name=self.name+'.'+self.file.type.split('/')[1]
			let file= new File([self.file], name, {type: self.file.type})
			
			let res={'status':0}
			let data={success:false}
			
			const formData = new FormData()
			
			//定义后端提取文件的名称：fileObj
			formData.append('fileObj', file)
			
			//向后端上传文件
			//使用formData上传文件，method必须为‘PSOT’
			res=await fetch(url,{
				method:'POST',
				body:formData
			})	
			
			//后端成功处理
			if(res.status=='200'){
				//得到后端发回的数据
				data=await res.json()	
			}
			
			//console.log(data)
			
			if(data.success){
				//生成一个事件，通知使用TheFileUpload的组件，并回传参数
				self.$emit('event-uploaded-file',data)
			}
			
		},
		
		uploadFileResult(file){
			console.log('uploadFileResult()')
			console.log(file)
			
			
		},
		...mapMutations([
		
		]),
		
		//
	},
	components:{
		'b-form-file':BFormFile,
		BButton
		
	},
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.font14px{
	font-size:14px;
}


</style>