

<template>
    <div class="page">
        <div class="btn-wrap">
            <el-button type="primary" @click="addMenu">添加菜单</el-button>
        </div>
        <el-table class="mt20" :data="tableList" border row-key="id"  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column label="菜单名称" prop="menuName"> </el-table-column>
            <el-table-column label="类型" prop="sort">
                <template #default="scope">
                    {{ scope.row.type==1 ? '目录' : '菜单' }}
                </template>
            </el-table-column>
            <el-table-column label="跳转路由" prop="path"></el-table-column>
            <el-table-column label="vue路径" prop="component"></el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
            <el-table-column label="状态" align="center" prop="status">
                <template #default="scope">
                    {{ scope.row.status==1 ? '启用' : '禁用' }}
                </template>
            </el-table-column>
            <el-table-column label="remark" prop="sort"></el-table-column>

            <el-table-column label="操作" width="250">
                <template #default="scope">
                    <el-button  type="primary" size="small" @click="btnHandle( scope.row, 1)">编辑</el-button>
                    <el-button  type="primary"  size="small" @click="btnHandle( scope.row, 2)">添加子菜单</el-button>
                    <el-button  type="warning" size="small" @click="btnHandle( scope.row, 3)">删除</el-button>
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
        <el-dialog v-model="dialogTableVisible" >
            <el-form :model="form" label-width="100px">
                <el-form-item label="上级菜单" v-if="form['parentMenName']">
                    <span>{{form['parentMenName']  }}</span>
                </el-form-item>
                <el-form-item label="菜单名称" >
                    <el-input v-model="form.menuName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="类型" >
                    <el-select v-model="form.type">
                        <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        placeholder="请选择类型"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="图标" >
                    <!-- <el-input v-model="form.icon" autocomplete="off" /> -->

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
                <el-form-item label="路由" >
                    <el-input v-model="form.path" autocomplete="off" />
                </el-form-item>
                <el-form-item label="菜单组件" >
                    <el-input v-model="form.component" autocomplete="off" />
                </el-form-item>
                <el-form-item label="状态" >
                    <el-select v-model="form.status">
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
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick, computed, watch } from 'vue';
import http from '@/utils/http';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import getListHook from '@/hook/getList'

let method='post'
let requestUrl='my-system/menu/list'
let queryData=reactive({
    page:1,
    size:10,
    menuName:'',
    path:'',
    status:''
})
let {tableList,getTableList,tableTotal}=getListHook(method,requestUrl,queryData)


let dialogTableVisible=ref(false)
let form:any=ref({
    id:'',
    menuName:"",
    pid:'',
    type:'',
    icon:'',
    path:'',
    component:'',
    status:1,
    sort:"",
    remark:'',
})

let iconList=[
    'Message','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting','Setting',
]
let typeList=[
    {value:'1',label:'目录'},
    {value:'2',label:'菜单'},
]
let statusList=[
    {value:'1',label:'启用'},
    {value:'2',label:'禁用'},
]
let pidList=reactive([])
let activeIcon=ref('')

onMounted(()=>{
    
   
})
watch(tableList,(data:any)=>{
    if(data.length>0){

    }
})


function swithcChange(e:any,data:any){

}
function addMenu(){
    form.value.pid=0
    dialogTableVisible.value=true
}
let selectDMenuInfo:any=ref({})
function btnHandle(data:any,type:any){
    selectDMenuInfo.value=JSON.parse(JSON.stringify(data))
    if(type==1){
        form.value=selectDMenuInfo.value
        dialogTableVisible.value=true
    }else if(type==2){
        form.value['parentMenName']=data.menuName
        form.value.pid=data.id
        dialogTableVisible.value=true
    }else{
        ElMessageBox.confirm('确认删除此菜单吗？','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(()=>{
            http.post('my-system/menu/del/'+data.id).then(res=>{
                ElMessage.success('删除成功')
                getTableList(method,requestUrl,queryData)
            })
        })
    }
}
function selectIcon(data:any){
    console.log(data)
    activeIcon.value=data
}
function submit(){
    let url=form.value.id?'my-system/menu/update':'my-system/menu/add'

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
.page {
   
}
</style>