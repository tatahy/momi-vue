<template>
<div>
	<!-- :state="Boolean(file)" -->
    <b-form-file
		class="my-2"
		placeholder="选择一个文件..."
		drop-placeholder="把文件拖到这里..."
		v-model="file"
		:state="fileCheck.ready" 
		:accept="typeStr"
		@input="setStateFile"
    ></b-form-file>
    <div v-if="fileCheck.ready" class="my-2">上传文件: 
		<P class="px-2"><strong>{{ file ? file.name : '' }}</strong></P>
	</div>
	
	<div 
		v-if="!fileCheck.type"
		class="my-2"
	>
		<P>文件类型: 
			<span 
				class="mr-1 pb-2 font14px"
				:class="badgeCls"
				v-for="(type,index) in typeArr"
				v-bind:key="index"
			>
				{{type}}
			</span>		
		</P>
	</div>
	
	<div 
		v-if="!fileCheck.size"
		class="my-2"
	>
		<P>文件不大于: 
			<span 
				class="py-1 font14px"
				:class="badgeCls"
			>
				{{size}}KB
			</span>
		</P>
	</div>

</div>
</template>

<script>
//mapActions,
import { mapState,mapGetters,mapMutations } from 'vuex'

//引入BsV的component
import { 
	BFormFile
	
} from 'bootstrap-vue'


export default {
	name:'TheFormFile',
	data:function(){
		return {
			file: null,
			//typeStr:'image/jpeg, image/png, image/gif',
			typeStr:'.jpg, .jpeg, .png, .gif',
			size:256,
			badgeCls:"badge badge-danger",
		}
	},
	computed:{
		typeArr:function(){
			return this.typeStr.split(',')
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
			let type=file?file.type.split('/')[1]:null
			let size=file?file.size:0
			
			let result={
				'ready':false,
				'type':self.typeStr.includes(type)?true:false,
				'size':(file && size<=maxSize )?true:false
			}
			
			result.ready=(result.type && result.size)?true:false
			
			return result
		},
	
		//$event在input事件中就是input的对象
		//$event在change事件中则是<input>对象
		setStateFile(){
			let self=this
			
			//native js to get the file Object on 'Change' event
			//let file=$eve.target.files[0]
			
			let req=Object.assign({},self.request)
		
			req.load=self.validateFile()?self.file:{}
			
			return self.updateFetchCont({request:req})
		},
		...mapMutations([
			'updateFetchCont'
		]),
		
		//
	},
	components:{
		'b-form-file':BFormFile
		
	},
	//清除state.fetchCont.request.load的内容
	created(){
		let self=this
		let req=Object.assign({},{load:{}},self.request)
		
		/*console.log('TheFormFile, created()')
		console.log(req.load)*/
		
		return self.updateFetchCont({request:req})
		
		
		//this.setStateFile()
	},
	/*
	destroyed(){
		let self=this
		let req=Object.assign({},self.request)
		req.load={}
		
		console.log('TheFormFile, destroyed()')
		console.log(req)
		return self.updateFetchCont({request:req})
		//this.setStateFile()
	}	
	*/

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.font14px{
	font-size:14px;
}


</style>