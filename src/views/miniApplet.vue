

<template>
	<div class="user_page">
		<div class="button">
            <el-button @click="dialogTableVisible=true" type="primary">新增分类</el-button>
        </div>
        <div class="table_wrap mt20">
            <el-table :data="tableList" border >
                <el-table-column label="名称" prop="name" align="center"></el-table-column>
                <el-table-column label="图标" prop="icon" align="center"></el-table-column>
                <el-table-column label="跳转Path" prop="jumpPath" align="center"></el-table-column>
                <el-table-column label="是否开启" prop="isEnable" align="center">
                    <template #default="scope">
                        {{ scope.row.isEnable==1 ? '启用' : '禁用' }}
                    </template>
                </el-table-column>
                <el-table-column label="排序" prop="sort" align="center"></el-table-column>
                <el-table-column label="操作"  align="center" width="250">
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
        <el-dialog v-model="dialogTableVisible" width="40%">
            <el-form :model="form" label-width="100px">
                <el-form-item label="名称" >
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="图标" >
                    <el-dropdown trigger="click" popper-class="icon_dropdown">
                        <div class="el-dropdown-link cur_po row">
                            <el-icon :size="20" v-if="activeIcon">
                                <component class="icons" :is="activeIcon"></component>
                            </el-icon>
                            <span v-else>请选择图标</span>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                <div class="icon_wrap row">
                                    <div class="cur_po icon" @click="selectIcon(item)" v-for="(item,index) in iconList" :key="index">
                                        <el-icon :size="20">
                                            <component class="icons" :is="item"></component>
                                        </el-icon>
                                    </div>
                                </div>
                            </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-form-item>
                <el-form-item label="跳转Path" >
                    <el-input v-model="form.jumpPath" autocomplete="off" />
                </el-form-item>
                <el-form-item label="是否启用" >
                    <el-select v-model="form.isEnable">
                        <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        placeholder="请选择状态"
                        />
                    </el-select>
                </el-form-item>
                
                <el-form-item label="排序" >
                    <el-input v-model="form.sort" autocomplete="off" />
                </el-form-item>
                <el-form-item label="备注" >
                    <el-input v-model="form.remarks" autocomplete="off" />
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
import {encryptByPublicKey} from '@/utils/utils'
let method='post'
let requestUrl='my-system/wechatMenu/list'
let queryData=reactive({
    page:1,
    size:10,
    keyword:'',
    isFreeze:2
})
let {tableList,getTableList,tableTotal}=getListHook(method,requestUrl,queryData)
const router = useRouter();
let iconList=[
    'House','Setting','User','Box','ShoppingBag','Coin','PriceTag','Paperclip','Files','Document','Notebook','Postcard','Location'
]
let activeIcon=ref('')

let showPwdTip=ref(false)
let dialogTableVisible=ref(false)
let roleDialog=ref(false)
let form=ref({
    id:'',
    name:'',
    icon:'',
    jumpPath:'',
    isEnable:'',
    sort:'',
    remarks:'',
})
let statusList=[
    {value:'1',label:'启用'},
    {value:'2',label:'禁用'},
]
let updateForm:any=ref({})
onMounted(async ()=>{
    getRoleList()
})
function selectIcon(data:any){
    activeIcon.value=data
    form.value.icon=data
}

watch(dialogTableVisible,(val)=>{
    if(!val){
        form.value={
            id:'',
            name:'',
            icon:'',
            jumpPath:'',
            isEnable:'',
            remarks:'',
            sort:'',
        }
    }
})
let roleList=reactive([])
let roleVal=ref('')
let selectUserId=ref('')
function getRoleList() {
	http.post('my-system/role/list', {
		page: 1,
		size: 100,
		keyword: '',
	}).then(res => {
		roleList.push(...res.rows)
	})
}
function btnHandle(data:any,val:any){
    if(val==1){
        form.value=JSON.parse(JSON.stringify(data))
        dialogTableVisible.value=true
    }else if(val==2){
        ElMessageBox.confirm('确认删除此分类吗？','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(()=>{
            http.get('my-system/wechatMenu/del/'+data.id).then(res=>{
                ElMessage.success('删除成功')
                getTableList(method,requestUrl,queryData)
            })
        })
    }
}
function submit(){
    let url=form.value.id?'my-system/wechatMenu/edit':'my-system/wechatMenu/add'
    let data=JSON.parse(JSON.stringify(form.value))
    http.post(url,data).then(res=>{
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
    .no-autofill-pwd {
        :deep(.el-input__inner) {
            -webkit-text-security: disc !important;
        }
    }
    .tip{
        color: #666;
        background-color: #efefef;
        height: 30px;
        width: 100%;
        border-radius: 3px;
        padding: 0 12px;
        font-size: 12px ;
    }
</style>