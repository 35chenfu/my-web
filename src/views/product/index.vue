<template>
    <div class="user_page">
        <div class="button">
            <el-button @click="add" type="primary">新增商品</el-button>
        </div>
        <div class="table_wrap mt20">
            <el-table :data="tableList" border>
                <el-table-column label="名称" prop="title" align="center"></el-table-column>
                <el-table-column label="编号" prop="serialNumber" align="center"></el-table-column>
                <!--<el-table-column label="说明" prop="description" align="center"></el-table-column>-->
                <el-table-column label="是否在售" prop="isSale" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.isSale==1?'是':'否' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否限时抢购" prop="flashSale" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.flashSale==1?'是':'否' }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column label="类型" prop="type" align="center"></el-table-column>

                <el-table-column label="排序" prop="sort" align="center"></el-table-column>
                <!--<el-table-column label="备注" prop="remarks" align="center"></el-table-column>-->
                <el-table-column label="操作" align="center" width="250">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="btnHandle(scope.row, 3)">详情</el-button>
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
        <proDetail ref="proDetailRef" @submitCb="submitCb"></proDetail>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick, computed, watch } from 'vue';
import http from '@/utils/http';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import getListHook from '@/hook/getList'
import baseConfing from '@/config'
import proDetail from './components/detailDialog.vue'


let proDetailRef:any=ref({})

let method = 'post'
let requestUrl = 'my-merchandise/commodity/list'
let queryData = reactive({
    page: 1,
    size: 10,
    name:'',
    type:'',
    contactTel:'',
    
})
let { tableList, getTableList, tableTotal } = getListHook(method, requestUrl, queryData)
const router = useRouter();


onMounted(async () => {

})

function add(){
    proDetailRef.value.dialogTableVisible=true
}
function submitCb(){
    getTableList(method, requestUrl, queryData)
}
function btnHandle(data: any, val: any) {
    if (val == 1) {
        proDetailRef.value.getDetail(data.id)
    } else if (val == 2) {
        ElMessageBox.confirm('确认删除此商户吗？', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            http.get('my-merchandise/commodity/delete/' + data.id).then(res => {
                ElMessage.success('删除成功')
                getTableList(method, requestUrl, queryData)
            })
        })
    }else if(val==3){
        router.push({
            path:'/productDetail',
            query:{
                id:data.id
            }
        })
    }
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

</style>