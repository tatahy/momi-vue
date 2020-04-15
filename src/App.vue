<template>
  <div id="app">
    <TheNavbar />

		<TheContainer />
	<!-- <TheContainer>
		<template v-slot:leftSide>
			<TheSidebar />
		</template>
	
	</TheContainer> -->

  </div>
</template>

<script>

//引入各个组件,'@'已在webpack配置文件中的resolve中定义为‘/src/’
// import TheNavbar from '@/components/TheNavbar'
// import TheContainer from '@/components/TheContainer'
//import TheSidebar from '@/components/TheSidebar'

export default {
//export const App= {
	name: 'app',
	components: {
		// TheNavbar,
		//TheSidebar,
		// TheContainer		
		
		//异步引入可减小打包文件体积
		TheNavbar:()=>import ('@/components/TheNavbar'),
		TheContainer:()=>import ('@/components/TheContainer'),
		//TheSidebar:()=>import ('@/components/TheSidebar')
	}
}

</script>

<style lang='scss'>
//引入bootstrap4样式文件
//@import '~bootstrap/dist/css/bootstrap.min.css';

//引入bsv样式文件
@import '~bootstrap-vue/dist/bootstrap-vue.min.css';

//引入个人定制的bootstrap4样式文件
@import '~@/scss/custom.scss';

</style>
