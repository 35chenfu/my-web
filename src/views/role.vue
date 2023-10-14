

<template>
	<div class="user_page">
		<div class="button">
            <el-button @click="dialogTableVisible=true">新增角色</el-button>
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
                        <el-button  type="warning" size="small" @click="btnHandle( scope.row, 2)">删除</el-button>
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
        <el-dialog v-model="dialogTableVisible" >
            <el-form :model="form" label-width="120px">
                <el-form-item label="角色标识" >
                    <el-input v-model="form.roleIdentification" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色姓名" >
                    <el-input v-model="form.roleName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="排序" >
                    <el-input v-model="form.sort" autocomplete="off" />
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input v-model="form.remark" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button >Cancel</el-button>
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
    }
})

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
function submit(){
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