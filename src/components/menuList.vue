<template>
	
	<div class="menu_page" :class="{'show': !isCollapse}">
		<div class="switch cur_po" :class="{'center': !isCollapse}" @click="isCollapse=!isCollapse">
			<el-icon :size="20">
				<Grid />
			</el-icon>
		</div>
		<el-menu default-active="1-1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
			@close="handleClose">
			<template v-for="(item,index) in menuData" :key="index">
				<template v-if="item.children">
					<el-sub-menu :index="item.path">
						<template #title>
							<el-icon>
								<component   :is="'User'" ></component>
							</el-icon>
							<span>{{ item.title }}</span>
						</template>
						<el-menu-item v-for="(el,ei) in item.children" :key="ei" :index="el.path">{{ el.title }}</el-menu-item>
						
					</el-sub-menu>
				</template>
				<template v-else>

					<el-menu-item  :index="item.path">
						<el-icon :size="20">
								<component class="icons" :is="item.icon"></component>
							</el-icon>
						<template #title>{{ item.title }}</template>
					</el-menu-item>
				</template>
			</template>
			<!-- <el-sub-menu index="1">
				<template #title>
					<el-icon :size="20">
						<location />
					</el-icon>
					<span>Navigator One</span>
				</template>
				<el-menu-item-group>
					<template #title><span>Group One</span></template>
					<el-menu-item index="1-1">item one</el-menu-item>
					<el-menu-item index="1-2">item two</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="Group Two">
					<el-menu-item index="1-3">item three</el-menu-item>
				</el-menu-item-group>
				<el-sub-menu index="1-4">
					<template #title><span>item four</span></template>
					<el-menu-item index="1-4-1">item one</el-menu-item>
				</el-sub-menu>
			</el-sub-menu>
			<el-menu-item index="2">
				<el-icon :size="20"><icon-menu /></el-icon>
				<template #title>Navigator Two</template>
			</el-menu-item>
			<el-menu-item index="3" disabled>
				<el-icon :size="20">
					<document />
				</el-icon>
				<template #title>Navigator Three</template>
			</el-menu-item>
			<el-menu-item index="4">
				<el-icon :size="20">
					<setting />
				</el-icon>
				<template #title>Navigator Four</template>
			</el-menu-item> -->
		</el-menu>
	</div>
</template>
  
<script lang="ts" setup>
import { ref,reactive } from 'vue'

let menuData=reactive([
	{
		title:'菜单1',
		path:'1',
		icon:'Location',
		children:[
			{
				title:'菜单1-1',
				path:'1-1',
			},
			{
				title:'菜单1-2',
				path:'1-2',
			}
		]
	},
	{
		title:'菜单2',
		path:'2',
		icon:'Location',
		children:[
			{
				title:'菜单2-1',
				path:'2-1',
			},
			{
				title:'菜单2-2',
				path:'2-2',
			}
		]
	},
	{
		title:'菜单3',
		icon:'location',
		path:'3',
	},
])

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
	height: 100%;
	border-right: 1px solid #eee;
	transition: all 0.3s;
	overflow: hidden;
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
  