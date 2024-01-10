<template>
	
	<div class="menu_page" :class="{'show': !isCollapse}">
		<div class="switch cur_po" :class="{'center': !isCollapse}" @click="isCollapse=!isCollapse">
			<el-icon :size="20">
				<Grid />
			</el-icon>
		</div>
		<!-- default-active="/menuManage"  -->
		<el-menu :default-active="defaultActivee" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
			@close="handleClose" :router="true">
			<template v-for="(item,index) in roleMenus" :key="index">
				<template v-if="item.children">
					<el-sub-menu :index="item.path">
						<template #title>
							<el-icon>
								<component  :is="item.icon" ></component>
							</el-icon>
							<span>{{ item.menuName }}</span>
						</template>
						<el-menu-item v-for="(el,ei) in item.children" :key="ei" :index="el.path">{{ el.menuName }}</el-menu-item>
						
					</el-sub-menu>
				</template>
				<template v-else>

					<el-menu-item  :index="item.path">
						<el-icon :size="20">
							<component class="icons" :is="item.icon"></component>
						</el-icon>
						<template #title>{{ item.menuName }}</template>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>
  
<script lang="ts" setup>
import { ref,reactive, onMounted,computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import useStore from '@/store';

const {  userInfoStore} = useStore();
const route = useRoute()
let menuData=reactive([
	{
		title:'商品管理',
		path:'1',
		icon:'Location',
		
	},
	{
		title:'用户管理',
		path:'/user',
		icon:'User',
		
	},
	{
		title:'角色管理',
		path:'/role',
		icon:'User',
	},
	{
		title:'系统管理',
		icon:'Setting',
		path:'3',
		children:[
			{
				title:'菜单管理',
				path:'/menuManage',
			},
			{
				title:'权限管理',
				path:'/permission',
			},
		]
	},
])
let defaultActivee=ref('')

let roleMenus=computed(()=>{
	return userInfoStore.userInfo.roleMenus
})
onMounted(()=>{
	console.log(userInfoStore.userInfo)
	defaultActivee.value=route.path
})
const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
</script>
  
<style scoped lang="scss">
.menu_page{
	width: 70px;
	height:82vh;
	border-right: 1px solid #eee;
	transition: all 0.3s;
	overflow-y: scroll;
	&.show{
		width: 200px;
	}
	.switch{
		text-align: center;
		padding:10px 0px;
		&.center{
			text-align: right;
			padding-right: 20px;
		}

	}
	:deep(.el-menu){
		border-right: none;
		width: 100%;
	}
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  	width: 100%;
}
</style>
  