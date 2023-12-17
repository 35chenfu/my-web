<template>
	<div class="user_page">
		<div class="button">
			<el-button @click="dialogTableVisible = true" type="primary">新增用户</el-button>
		</div>
		<div class="table_wrap mt20">
			<el-table :data="tableList" border>
				<el-table-column label="账号" prop="accountNumber" align="center"></el-table-column>
				<el-table-column label="姓名" prop="name" align="center"></el-table-column>
				<el-table-column label="手机" prop="phone" align="center"></el-table-column>
				<el-table-column label="身份证" prop="idCard" align="center"></el-table-column>
				<el-table-column label="邮箱" prop="email" align="center"></el-table-column>
				<!-- <el-table-column label="密码" prop="password" align="center"></el-table-column> -->
				<el-table-column label="地址" prop="address" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="250">
					<template #default="scope">
						<el-button type="primary" size="small" @click="btnHandle(scope.row, 1)">编辑</el-button>
						<el-button type="warning" size="small" @click="btnHandle(scope.row, 2)">删除</el-button>
						<el-button type="warning" size="small" @click="btnHandle(scope.row, 3)">角色设置</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="pagination_wrap row">
				<el-pagination :page-sizes="[10, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
					:total="tableTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>

		</div>
		<el-dialog v-model="dialogTableVisible" width="40%">
			<el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
				<el-form-item label="账号" prop="accountNumber">
					<el-input v-model="form.accountNumber" autocomplete="off" />
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="form.name" autocomplete="off" />
				</el-form-item>
				<el-form-item label="手机" prop="phone">
					<el-input v-model="form.phone" autocomplete="off" />
				</el-form-item>
				<el-form-item label="身份证" prop="idCard">
					<el-input v-model="form.idCard" autocomplete="off" />
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="form.email" autocomplete="off" />
				</el-form-item>
				<el-form-item label="密码" v-if="!form.name" >
					<el-input type="password" class="no-autofill-pwd" v-model="form.password" autocomplete="off" />
					<div class="tip">不设置密码,默认密码为 88888888</div>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="form.address" autocomplete="off" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogTableVisible = false">取消</el-button>
					<el-button type="primary" @click="submit">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="roleDialog" width="30%" title="设置用户角色">
			<el-select v-model="roleVal" placeholder="请选择角色">
				<el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
			</el-select>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="roleDialog = false">取消</el-button>
					<el-button type="primary" @click="setRole">
						确定
					</el-button>
				</span>
			</template>
		</el-dialog>

	</div>
</template>


<script setup lang="ts">
	import { ref, reactive, onMounted, watch } from 'vue';
	import http from '@/utils/http';
	import { ElMessage, ElMessageBox } from 'element-plus'
	import { useRouter, useRoute } from 'vue-router';
	import getListHook from '@/hook/getList'
	import { encryptByPublicKey } from '@/utils/utils'

	let method = 'post'
	let requestUrl = 'my-system/user/list'
	let queryData = reactive({
		page: 1,
		size: 10,
		keyword: '',
		isFreeze: 2
	})
	let { tableList, getTableList, tableTotal } = getListHook(method, requestUrl, queryData)
	let dialogTableVisible = ref(false)
	let roleDialog = ref(false)
	let form = ref({
		id: '',
		name: '',
		phone: '',
		idCard: '',
		accountNumber: '',
		email: '',
		password: '',
		address: '',
	})
	let rules = reactive({
		accountNumber: [
			{ required: true, message: '请输入账号', trigger: 'blur' }
		],
		name: [
			{ required: true, message: '请输入名称', trigger: 'blur' }
		],
		phone: [
			{ required: true, message: '请输入电话号码', trigger: 'blur' }
		],
		idCard: [
			{ required: true, message: '请输入身份证', trigger: 'blur' }
		],
		email: [
			{ required: true, message: '请输入邮箱', trigger: 'blur' }
		],
		address: [
			{ required: true, message: '请输入地址', trigger: 'blur' }
		],
	})
	let formRef=ref(null)



	onMounted(async () => {
		getRoleList()
	})

	// 监听dialogTableVisible
	watch(dialogTableVisible, (val) => {
		if (!val) {
			form.value = {
				id: '',
				name: '',
				phone: '',
				idCard: '',
				accountNumber: '',
				email: '',
				password: '',
				address: '',
			}
			formRef.value.resetFields()
		}
	})

	let roleList = reactive([])
	let roleVal = ref('')
	let selectUserId = ref('')

	// 获取角色列表
	function getRoleList() {
		http.post('my-system/role/list', {
			page: 1,
			size: 100,
			keyword: '',
		}).then((res : any) => {
			if (res.success) {
				roleList.push(...res.rows)
			}
		})
	}

	// 按钮操作
	function btnHandle(data : any, val : any) {
		if (val == 1) {
			form.value = JSON.parse(JSON.stringify(data))
			dialogTableVisible.value = true
		} else if (val == 2) {
			ElMessageBox.confirm('确认删除此用户吗？', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				http.get('my-system/user/del/' + data.id).then((res : any) => {
					if (res.success) {
						ElMessage.success('删除成功')
						getTableList(method, requestUrl, queryData)
					}
				})
			})
		} else {

			http.get('my-system/role/userRoleInfo/' + data.id).then((res : any) => {
				roleVal.value = roleList.find(el => {
					return res.result.roleName == el.roleName
				}).id

			})


			selectUserId.value = data.id
			roleDialog.value = true
		}
	}

	// 提交
	async function submit() {
		let res=await formRef.value.validate(()=>{})
    	if(!res)return
		let url = form.value.id ? 'my-system/user/update' : 'my-system/user/add'
		let data = JSON.parse(JSON.stringify(form.value))
		data.password = data.password ? encryptByPublicKey(data.password) : ''
		http.post(url, data).then((res : any) => {
			if (res.success) {
				ElMessage.success('操作成功')
				getTableList(method, requestUrl, queryData)
				dialogTableVisible.value = false
			}
		})
	}

	// 设置角色
	function setRole() {
		http.post('my-system/role/empowerUserRole', {
			userId: selectUserId.value,
			roleId: roleVal.value,
		}).then((res : any) => {
			if (res.success) {
				ElMessage.success('设置成功')
				roleDialog.value = false
			}
		})
	}

	// 分页
	function handleSizeChange(e : any) {
		queryData.size = e
		getTableList(method, requestUrl, queryData)
	}

	function handleCurrentChange(e : any) {
		queryData.page = e
		getTableList(method, requestUrl, queryData)
	}
</script>


<style scoped lang="scss">
	.table_wrap {
		width: 100%;
	}

	.pagination_wrap {
		margin-top: 10px;
		justify-content: flex-end;
	}

	.no-autofill-pwd {
		:deep(.el-input__inner) {
			-webkit-text-security: disc !important;
		}
	}

	.tip {
		color: #666;
		background-color: #efefef;
		height: 30px;
		width: 100%;
		border-radius: 3px;
		padding: 0 12px;
		font-size: 12px;
	}
</style>