<template>
	<div class="window_page col">
		<div class="head">
			<comHead></comHead>
		</div>
		<div class="container row">
			<div class="menu_wrap">
				<menuList></menuList>
			</div>
			<div class="page_con">
				<router-view></router-view>
			</div>
			
		</div>
		
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick,computed,watch } from 'vue';
import comHead from './components/comHead.vue';
import menuList from './components/menuList.vue';
</script>

<style scoped lang="scss">
.window_page{
	align-items: flex-start;
	height: 100vh;
	.head{
		width: 100vw;
	}
	.container{
		align-items: flex-start;
		flex: 1;
		.menu_wrap{
			height: 100%;
		}
		.page_con{
			flex: 1;
			padding: 20px;
		}
	}
}
</style>