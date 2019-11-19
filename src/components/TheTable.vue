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
				<h4 class="text-center align-text-bottom" v-bind:class="'text-'+clr">
					<span>{{table.title}}&nbsp;--&nbsp;</span>
					<span v-show="table.subTitle" class="text-monospace">{{table.subTitle}}</span>
				</h4>
			</template>
			
			<template v-slot:table-busy>
				<div class="text-center text-muted my-2">
					<b-spinner class="align-middle"></b-spinner>
					<strong> 接收数据中...</strong>
				</div>
			</template>
			
			<template v-slot:cell(topic)="data">
				<!-- <b-link href="#">{{ data.value }}</b-link> -->
				
				<b-button variant="link" v-on:click="getInfo(data.item, data.index, $event.target)" class="mr-1">
					{{ data.value }}
				</b-button>
			</template>
			
		</b-table>
	</div>	
	<div class="offset-9 text-right" v-show="rows > perPage" >
		<p>
			<span>Total items: {{ rows }},</span>&nbsp;
			<span>Current Page: {{ currentPage }}</span>
			<br>
			<!-- <span>每页行数:</span> -->
			<label>每页行数:</label>
			<b-form-select v-model="perPage" :options="options"></b-form-select>	
		</p>
		
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

import { mapState, mapActions } from 'vuex'

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
		table: state => state.table,
		//每页记录行数	
		rows: state => state.table.items.length,
		//主题颜色
		clr : state=>state.navActive.themeClr
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
		... mapActions({
			//getTableItemsBy: 'asyChangeTable'
		})
	},
	//computed:{
		
		//...mapState({
			
		//})
	//},
	components:{
		//BButtonGroup,
		//BButton
	}
}

</script>

<style>


</style>