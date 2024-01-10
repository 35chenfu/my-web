<template>
	<div>
		<div>权限设置</div>
		
		<el-select class="mt20" v-model="roleVal" placeholder="请选择角色" @change="getRoleMenuIds">
			<el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
		</el-select>
		<div>
			<el-button type="primary" class="mt20" @click="selectAll">全选</el-button>
		</div>

		<el-tree class="mt20" ref="treeRef" :data="tableList" show-checkbox node-key="id" :props="defaultProps"
			@check-change="handleCheckChange" />

		<el-button type="primary" class="mt20" @click="submit"> 确认</el-button>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick, computed, watch } from 'vue';
import getListHook from '@/hook/getList'
import http from '@/utils/http';
import { ElMessage, ElMessageBox } from 'element-plus'
let method = 'post'
let requestUrl = 'my-system/menu/list'
let queryData = reactive({
	page: 1,
	size: 10,
	menuName: '',
	path: '',
	status: ''
})
let { tableList, getTableList, tableTotal } = getListHook(method, requestUrl, queryData)
const defaultProps = {
	children: "children",
	label: "menuName",
};
let roleVal = ref('')

let roleList = reactive([])
onMounted(() => {
	getRoleList()
})

function getRoleList() {
	http.post('my-system/role/list', {
		page: 1,
		size: 100,
		keyword: '',
	}).then(res => {
		roleList.push(...res.rows)
	})
}
let treeRef:any=ref(null)
let selectMenus:any=ref([])
function handleCheckChange(e: any) {
	let res = treeRef.value.getCheckedNodes()
	let arr = []
	res.forEach((item) => {
		arr.push(item.id)
	})
	let menuArr = unique(arr); // 去除重复的节点
	selectMenus.value=menuArr
	
}
// 数组去重
function unique(arr) {
	let newArr = []
	let len = arr.length
	for (let i = 0; i < len; i++) {
		if (newArr.indexOf(arr[i]) == -1) {
			newArr.push(arr[i])
		}
	}
	return newArr
}

function getRoleMenuIds(e:any){
	let roleList=[]
	http.get('my-system/role/roleMenuIds/'+e).then(res => {
		
		getSetMenu(res.result)
	})
}

function getSetMenu(data:any){
	console.log('data',data)
	let list=JSON.parse(JSON.stringify(tableList.value)) 
	let roleList=[]
	list.forEach((e:any)=>{
		if(e.children?.length>0){
			e.children.forEach((c:any)=>{
				data.forEach((d)=>{
					if(d==c.id){
						roleList.push(c)
					}
				})
			})

		}else{
			data.forEach((d)=>{
				if(d==e.id){
					roleList.push(e)
				}
			})
			
		}
	})
	treeRef.value.setCheckedNodes(roleList)
}


function submit() {
	http.post('my-system/role/empowerRoleMenu', {
		roleId: roleVal.value,
		menuIds: selectMenus.value,
	}).then(res => {
		ElMessage.success('设置成功')
	})
}
let isSelectAll=ref(false)
function selectAll(){
	isSelectAll.value=!isSelectAll.value
	if(!isSelectAll.value){
		treeRef.value.setCheckedNodes([])
	}else{
		treeRef.value.setCheckedNodes(tableList.value)	
	}
	
}


</script>
