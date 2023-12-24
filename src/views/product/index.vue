<template>
    <div class="user_page">
        <div class="search_form row">
			<el-input class="input_box" v-model="queryData.title" placeholder="请输入商品名称"></el-input>
			<el-input class="input_box ml20" v-model="queryData.serialNumber" placeholder="请输入商品编号"></el-input>
            <el-select class="ml20" v-model="queryData.wxMenuId" :clearable="true" placeholder="请选择小程序类目">
                <el-option v-for="(item,index) in miniAppleList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
			<el-button class="ml20" @click="searchForm" type="primary">搜索</el-button>
			<el-button class="ml20"  @click="add" type="primary">新增商品</el-button>
		</div>


        <div class="table_wrap mt20">
            <el-table :data="tableList" border>
                <el-table-column label="名称" prop="title" align="center"></el-table-column>
                <el-table-column label="编号" prop="serialNumber" align="center"></el-table-column>
                <!-- <el-table-column label="小程序分类" prop="description" align="center">
                    <template #default="scope">
                        <span>{{ getWxName(scope) }}</span>
                    </template>
                </el-table-column> -->
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
                        <el-button type="danger" size="small" @click="btnHandle(scope.row, 2)">删除</el-button>
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
    title:'',
    wxMenuId:'',
    serialNumber:'',
    categoryId:''
    
})
let { tableList, getTableList, tableTotal } = getListHook(method, requestUrl, queryData)
const router = useRouter();


onMounted(async () => {
    getMiniApplet()
})

function searchForm(){
	queryData.page = 1
	queryData.size = 10
	getTableList(method, requestUrl, queryData)
}

let miniAppleList=ref([])
function getMiniApplet() {
    http.post('my-system/wechatMenu/list', {
        page: 1,
        size: 100
    }).then((res: any) => {
       miniAppleList.value=res.rows
    })
}


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
function getWxName(data:any){
    return miniAppleList.value.find((e)=>{
        return e.id==data.wxMenuId
    })?.name || ''
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