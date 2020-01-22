<template>
<div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
		<b-form-group
			id="input-group-1"
			label="Email address:"
			label-for="input-1"
			description="We'll never share your email with anyone else."
		>
			<b-form-input
				id="input-1"
				v-model="form.email"
				type="email"
				required
				placeholder="Enter email"
			></b-form-input>
		</b-form-group>

		<b-form-group 
			id="input-group-2" 
			label="Your Name:" 
			label-for="input-2"
		>
			<b-form-input
				id="input-2"
				v-model="form.name"
				required
				placeholder="Enter name"
			></b-form-input>
		</b-form-group>

		<b-form-group 
			id="input-group-3" 
			label="Food:" 
			label-for="input-3"
		>
			<b-form-select
				id="input-3"
				v-model="form.food"
				:options="foods"
				required
			></b-form-select>
		</b-form-group>

		<b-form-group id="input-group-4">
			<b-form-checkbox-group 
				v-model="form.checked" 
				id="checkboxes-4"
			>
				<b-form-checkbox value="me">Check me out</b-form-checkbox>
				<b-form-checkbox value="that">Check that out</b-form-checkbox>
			</b-form-checkbox-group>
		</b-form-group>

		<b-button type="submit" variant="primary">Submit</b-button>
		<b-button type="reset" variant="danger">Reset</b-button>
	</b-form>
    <b-card class="mt-3" header="Form Data Result">
		{{ form }}      
		<pre class="m-0">{{ form }}</pre>
    </b-card>
</div>
</template>

<script>
import { mapState,mapGetters, mapActions } from 'vuex'

//引入BsV的component
import { 
	BForm,
	
} from 'bootstrap-vue'


export default {
	name:'TheForm',
	props:{
		elements: {
			type: Object,
			// Object or array defaults must be returned from
			// a factory function
			default: function () {
				return { message: 'hello' }
			}
		},
	},
	data:function(){
		return {
		
		
		}
	},
	computed:{
		//根据this.elements得到各个form元素对应的绑定变量，用于后续的校验、提交等操作。
		form(){
			let self=this
			let el=self.elements
			
			
			return {}
		},
		...mapGetters(),
		...mapState(),
	},
	method:{
	
		...mapActions()
	},
	component:{
		BForm,
	},
	

}

</script>

<style>


</style>