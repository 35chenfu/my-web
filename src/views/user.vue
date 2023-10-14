

<template>
	<div class="user_page">
		<div class="button">
            <el-button @click="dialogTableVisible=true">新增用户</el-button>
        </div>
        <div class="table_wrap mt20">
            <el-table :data="tableList" border >
                <el-table-column label="账号" prop="accountNumber" align="center"></el-table-column>
                <el-table-column label="姓名" prop="name" align="center"></el-table-column>
                <el-table-column label="手机" prop="phone" align="center"></el-table-column>
                <el-table-column label="身份证" prop="idCard" align="center"></el-table-column>
                <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
                <!-- <el-table-column label="密码" prop="password" align="center"></el-table-column> -->
                <el-table-column label="地址" prop="address" align="center"></el-table-column>
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
        <el-dialog v-model="dialogTableVisible" width="50%">
            <el-form :model="form" label-width="50px">
                <el-form-item label="账号" >
                    <el-input v-model="form.accountNumber" autocomplete="off" />
                </el-form-item>
                <el-form-item label="姓名" >
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="手机" >
                    <el-input v-model="form.phone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="身份证" >
                    <el-input v-model="form.idCard" autocomplete="off" />
                </el-form-item>
                <el-form-item label="邮箱" >
                    <el-input v-model="form.email" autocomplete="off" />
                </el-form-item>
                <!-- <el-form-item label="密码" >
                    <el-input v-model="form.password" autocomplete="off" />
                </el-form-item> -->
                <el-form-item label="地址" >
                    <el-input v-model="form.address" autocomplete="off" />
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
let requestUrl='my-system/user/list'
let queryData=reactive({
    page:1,
    size:10,
    keyword:'',
    isFreeze:2
})
let {tableList,getTableList,tableTotal}=getListHook(method,requestUrl,queryData)
const router = useRouter();

let tabledata=ref([])

let dialogTableVisible=ref(false)
let form=ref({
    id:'',
    name:'',
    phone:'',
    idCard:'',
    accountNumber:'',
    email:'',
    password:'',
    address:'',
})
let updateForm:any=ref({})
onMounted(async ()=>{
   
})
watch(dialogTableVisible,(val)=>{
    if(!val){
        form.value={
            id:'',
            name:'',
            phone:'',
            idCard:'',
            accountNumber:'',
            email:'',
            password:'',
            address:'',
        }
    }
})

function btnHandle(data:any,val:any){
    if(val==1){
        form.value=JSON.parse(JSON.stringify(data))
        console.log(form.value)
        dialogTableVisible.value=true
    }else{
        ElMessageBox.confirm('确认删除此用户吗？','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(()=>{
            http.get('my-system/user/del/'+data.id).then(res=>{
                ElMessage.success('删除成功')
                getTableList(method,requestUrl,queryData)
            })
        })
    }
}
function submit(){
    let url=form.value.id?'my-system/user/update':'my-system/user/add'
    http.post(url,form.value).then(res=>{
        getTableList(method,requestUrl,queryData)
        
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