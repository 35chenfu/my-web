

<template>
    <div class="user_page">
        <div class="button">
            <el-button @click="dialogTableVisible = true" type="primary">新增分类</el-button>
        </div>
        <div class="table_wrap mt20">
            <el-table :data="tableList" border>
                <el-table-column label="名称" prop="name" align="center"></el-table-column>
                <el-table-column label="图标" prop="icon" align="center">
                    <template #default="scope">
                       <img style="width: 50px;height: 50px;" :src="baseConfing.baseUrl+'my-file/file/preview/'+scope.row.icon" alt="" srcset="">
                    </template>
                </el-table-column>
                <el-table-column label="跳转Path" prop="jumpPath" align="center"></el-table-column>
                <el-table-column label="是否开启" prop="isEnable" align="center">
                    <template #default="scope">
                        {{ scope.row.isEnable == 1 ? '启用' : '禁用' }}
                    </template>
                </el-table-column>
                <el-table-column label="排序" prop="sort" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="250">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="btnHandle(scope.row, 1)">编辑</el-button>
                        <el-button type="warning" size="small" @click="btnHandle(scope.row, 2)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination_wrap row">
                <el-pagination :page-sizes="[10, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
                    :total="tableTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>

        </div>
        <el-dialog v-model="dialogTableVisible" width="40%">
            <el-form :model="form" label-width="100px"  :rules="rules" ref="formRef">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="图标" prop="icon">

                    <el-upload class="avatar-uploader" :action="baseConfing.baseUrl + 'my-file/file/upload'"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :headers="headers">
                        <img v-if="iconUrl" :src="iconUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>



                </el-form-item>
                <el-form-item label="跳转Path" prop="jumpPath">
                    <el-input v-model="form.jumpPath" autocomplete="off" />
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-select v-model="form.isEnable">
                        <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"
                            placeholder="请选择状态" />
                    </el-select>
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort" autocomplete="off" />
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remarks" autocomplete="off" />
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

    </div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick, computed, watch } from 'vue';
import http from '@/utils/http';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import getListHook from '@/hook/getList'
import baseConfing from '@/config'
let method = 'post'
let requestUrl = 'my-system/wechatMenu/list'
let queryData = reactive({
    page: 1,
    size: 10,
    keyword: '',
    isFreeze: 2
})
let { tableList, getTableList, tableTotal } = getListHook(method, requestUrl, queryData)
const router = useRouter();

let activeIcon = ref('')

let showPwdTip = ref(false)
let dialogTableVisible = ref(false)
let iconUrl = ref('')
let form = ref({
    id: '',
    name: '',
    icon: '',
    jumpPath: '',
    isEnable: '1',
    sort: '',
    remarks: '',
})
let statusList = [
    { value: '1', label: '启用' },
    { value: '2', label: '禁用' },
]
let headers=reactive({
    Authorization:localStorage.getItem('token')
})
const iconRule=(rule:any,value:any,callback:any)=>{
    if(!form.value.icon){
        callback(new Error('请选择图片'))
    }else{
        callback()
    }
}


let rules = reactive({
	name: [
		{ required: true, message: '请输入名称', trigger: 'blur' }
	],
	icon: [
		{ required: true, validator: iconRule, trigger: 'blur' }
	],
	jumpPath: [
		{ required: true, message: '请输入跳转路径', trigger: 'blur' }
	],
    sort: [
		{ required: true, message: '请输入排序', trigger: 'blur' }
	],
	
})
let formRef=ref(null)
let updateForm: any = ref({})
onMounted(async () => {
    getRoleList()
})
function selectIcon(data: any) {
    activeIcon.value = data
    form.value.icon = data
}
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
    form.value.icon=response.result.id
    formRef.value.validateField('icon')
    iconUrl.value = URL.createObjectURL(uploadFile.raw!)
}

watch(dialogTableVisible, (val) => {
    if (!val) {
        form.value = {
            id: '',
            name: '',
            icon: '',
            jumpPath: '',
            isEnable: '1',
            remarks: '',
            sort: '',
        }
        iconUrl.value=''
        formRef.value.resetFields()
    }
})
let roleList = reactive([])
let roleVal = ref('')
let selectUserId = ref('')
function getRoleList() {
    http.post('my-system/role/list', {
        page: 1,
        size: 100,
        keyword: '',
    }).then(res => {
        roleList.push(...res.rows)
    })
}
function btnHandle(data: any, val: any) {
    if (val == 1) {
        form.value = JSON.parse(JSON.stringify(data))
        iconUrl.value= baseConfing.baseUrl+ 'my-file/file/preview/'+form.value.icon 
        dialogTableVisible.value = true
    } else if (val == 2) {
        ElMessageBox.confirm('确认删除此分类吗？', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            http.get('my-system/wechatMenu/del/' + data.id).then(res => {
                ElMessage.success('删除成功')
                getTableList(method, requestUrl, queryData)
            })
        })
    }
}
async function submit() {
    let res=await formRef.value.validate(()=>{})
    if(!res)return

    let url = form.value.id ? 'my-system/wechatMenu/edit' : 'my-system/wechatMenu/add'
    let data = JSON.parse(JSON.stringify(form.value))
    http.post(url, data).then(res => {
        getTableList(method, requestUrl, queryData)
        dialogTableVisible.value = false
    })
}

function handleSizeChange(e: any) {
    queryData.size = e
    getTableList(method, requestUrl, queryData)
}
function handleCurrentChange(e: any) {
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
.avatar-uploader{
    .avatar{
        width: 178px;
        height: 178px;
        display: block;
    }
    :deep(.el-upload){
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover{
            border-color: var(--el-color-primary);
        }
    }
 
}



.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>