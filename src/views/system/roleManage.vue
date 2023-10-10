<template>
	<div>
		<div>用户角色设置</div>
		<el-select v-model="roleVal" placeholder="请选择角色">
			<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
			/>
		</el-select>

		<el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]"
		:props="defaultProps" />
	</div>
	
</template>

<script lang="ts" setup>
const defaultProps = {
	children: "children",
	label: "label",
};
const data = [
	{
		id: 1,
		label: "商品管理",
	},
	{
		id: 2,
		label: "系统管理",
		children: [
			{
				id: 5,
				label: "菜单管理",
			},
			{
				id: 6,
				label: "权限管理",
			},
		],
	},
];
let roleVal=1
let options=[
	{
		label:'角色1',
		value:1
	},
	{
		label:'角色2',
		value:2
	},
	{
		label:'角色3',
		value:3
	},
	{
		label:'角色4',
		value:4
	},
]
</script>
