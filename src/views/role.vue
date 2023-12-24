

<template>
	<div class="user_page">
        <div class="search_form row">
			<el-input class="input_box" v-model="queryData.keyword" placeholder="请输入角色名称"></el-input>
			<el-button class="ml20" @click="searchForm" type="primary">搜索</el-button>
			<el-button class="ml20"  @click="dialogTableVisible = true" type="primary">新增用户</el-button>
		</div>

        <div class="table_wrap mt20">
            <el-table :data="tableList" border >
                <el-table-column label="角色标识" prop="roleIdentification" align="center"></el-table-column>
                <el-table-column label="角色名称" prop="roleName" align="center"></el-table-column>
                <el-table-column label="排序" prop="sort" align="center"></el-table-column>
                <el-table-column label="备注" prop="remark" align="center"></el-table-column>
                <el-table-column label="操作"  align="center">
                    <template #default="scope">
                        <el-button  type="primary" size="small" @click="btnHandle( scope.row, 1)">编辑</el-button>
                        <el-button  type="danger" size="small" @click="btnHandle( scope.row, 2)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination_wrap row">
                <el-pagination
                :page-sizes="[10, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableTotal"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
            </div>
            
        </div>
        <el-dialog v-model="dialogTableVisible" width="40%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
                <el-form-item label="角色标识" prop="roleIdentification">
                    <el-input v-model="form.roleIdentification" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色姓名"  prop="roleName">
                    <el-input v-model="form.roleName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort" autocomplete="off" />
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input v-model="form.remark" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogTableVisible=false">取消</el-button>
                    <el-button type="primary" @click="submit">
                    确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick,computed,watch } from 'vue';
import http from '@/utils/http';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import getListHook from '@/hook/getList'
let method='post'
let requestUrl='my-system/role/list'
let queryData=reactive({
    page:1,
    size:10,
    keyword:'',
})
let {tableList,getTableList,tableTotal}=getListHook(method,requestUrl,queryData)
const router = useRouter();

let dialogTableVisible=ref(false)
let form=ref({
	roleIdentification:'',
	roleName:'',
	remark:'',
    sort:'',
})
let rules = reactive({
	roleIdentification: [
		{ required: true, message: '请输入角色标识', trigger: 'blur' }
	],
	roleName: [
		{ required: true, message: '请输入角色名称', trigger: 'blur' }
	],
	sort: [
		{ required: true, message: '请输入排序', trigger: 'blur' }
	],
	
})
let formRef=ref(null)


let updateForm:any=ref({})
onMounted(async ()=>{
   
})
watch(dialogTableVisible,(val)=>{
    if(!val){
        form.value={
            roleIdentification:'',
			roleName:'',
			remark:'',
			sort:'',
        }
        formRef.value.resetFields()
    }
})
function searchForm(){
		queryData.page = 1
		queryData.size = 10
		getTableList(method, requestUrl, queryData)
	}

function btnHandle(data:any,val:any){
    if(val==1){
        form.value=JSON.parse(JSON.stringify(data))
        console.log(form.value)
        dialogTableVisible.value=true
    }else{
        ElMessageBox.confirm('确认删除此权限吗？','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(()=>{
            http.get('my-system/role/del/'+data.id).then(res=>{
                ElMessage.success('删除成功')
                getTableList(method,requestUrl,queryData)
            })
        })
    }
}
async function submit(){
    let res=await formRef.value.validate(()=>{})
    if(!res)return
    let url=form.value.id?'my-system/role/update':'my-system/role/add'
    http.post(url,form.value).then(res=>{
        getTableList(method,requestUrl,queryData)
		form.value={
            roleIdentification:'',
			roleName:'',
			remark:'',
			sort:'',
        }
        dialogTableVisible.value=false
    })
}
function handleSizeChange(e:any){
    queryData.size=e
    getTableList(method,requestUrl,queryData)
}
function handleCurrentChange(e:any){
    queryData.page=e
    getTableList(method,requestUrl,queryData)
}
</script>

<style scoped lang="scss">
	.table_wrap{
        width: 100%;
    }
    .pagination_wrap{
        margin-top: 10px;
        justify-content: flex-end;
    }
</style>