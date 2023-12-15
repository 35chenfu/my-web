<template>
    <el-button type="primary" @click="router.back()">返回</el-button>
    <el-form :model="form" label-width="100px">
        <el-form-item label="商品标题" prop="title">
            <div class="con">{{ form.title }}</div>
        </el-form-item>
        <el-form-item label="商品编号" prop="serialNumber" v-if="form.serialNumber">
            <div class="con">{{ form.serialNumber }}</div>
        </el-form-item>

        <el-form-item label="商品说明" prop="description">
            <div class="con">{{ form.description }}</div>
        </el-form-item>
        <el-form-item label="限时抢购" prop="flashSale">
            
            <div class="con">{{ form.flashSale==1?'是':'否' }}</div>
        </el-form-item>

        <el-form-item label="抢购截止日期" prop="cutoffDate" v-if="form.flashSale == 1">
            <div class="con">{{ form.cutoffDate }}</div>
        </el-form-item>
        <el-form-item label="限时抢购价格" prop="rushPurchasePrice" v-if="form.flashSale == 1">
            <div class="con">{{ form.rushPurchasePrice }}</div>
        </el-form-item>
        <el-form-item label="已选择商户" prop="merchantId">
            <div class="con">{{ merchantName }}</div>
        </el-form-item>
        <el-form-item label="商户联系方式" prop="merchantTel" v-if="form.merchantId">
            <div class="con">{{ form.merchantTel }}</div>
        </el-form-item>

        <el-form-item label="小程序分类" prop="wxMenuId">
            <div class="con">{{ miniAppletName }}</div>
        </el-form-item>
        <el-form-item label="类别选择" prop="categoryId">
            <div class="con">{{ form.categoryId }}</div>
        </el-form-item>

        <el-form-item label="是否在售" prop="isSale">
            <div class="con">{{ form.flashSale==1?'是':'否' }}</div>
        </el-form-item>

        <el-form-item label="备注">
            <div class="con">{{ form.备注}}</div>
        </el-form-item>
        <el-form-item label="商品图片" prop="commodityFileId" v-if="form.commodityDetails.length>0">
            <div class="imgs">
                <el-image 
                v-for="(item,index) in form.commodityDetails" 
                :key="index" 
                :src="baseConfing.baseUrl+'my-file/file/preview/'+item.fileId"
                class="p_img"
                
                ></el-image>
            </div>
        </el-form-item>
        <el-form-item label="商品套餐">
            <el-table :data="form.commodityComboList" border v-if="form.commodityComboList.length > 0"
                style="margin-bottom: 20px;">
                <el-table-column label="名称" prop="comboName" align="center"></el-table-column>
                <el-table-column label="价格" prop="price" align="center"></el-table-column>
                <el-table-column label="库存" prop="inventory" align="center"></el-table-column>
                <el-table-column label="限制数量" prop="limitNum" align="center"></el-table-column>
                <el-table-column label="排序" prop="sort" align="center"></el-table-column>
                <el-table-column label="备注" prop="remarks" align="center"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="商品详情" prop="details">
            <div v-html="form.details"></div>
        </el-form-item>
        <el-form-item label="预定须知" prop="bookingInstructions">
            <div v-html="form.bookingInstructions"></div>
        </el-form-item>
    </el-form>

</template>
<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick, computed, watch } from 'vue';
import http from '@/utils/http';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import baseConfing from '@/config'

import comEditor from '@/components/comEditor.vue'
const props = defineProps({

})
const router = useRouter();
const route = useRoute();
const emits = defineEmits(['submitCb'])
let dialogTableVisible = ref(false)

let fileList = reactive([])
let form: any = reactive({
    "id": '',
    "title": '',  //标题
    "serialNumber": '',  //商品编号
    "description": '',  //说明
    "flashSale": '2',  //限时抢购 1-是 2-否
    "cutoffDate": "", //限时抢购截止日期
    "rushPurchasePrice": 0, //限时抢购价格
    "merchantId": "", //商家 ID
    "merchantTel": "", //商家联系方式
    "details": "", //详情
    "bookingInstructions": "", //预定须知
    "wxMenuId": "", //小程序菜单ID
    "categoryId": "", //类别ID
    "isSale": "1", //是否在售 1-是 2-否
    "sort": '', //排序
    "remarks": "", //备注
    "commodityFileId": [], //商品图片集合
    commodityDetails:[],
    "commodityComboList": []          //商品套餐
})


onMounted(() => {
   
    getDetail(route.query.id)
})


let miniAppletName=ref('')
let miniAppletList = reactive([])
function getMiniApplet() {
    http.post('my-system/wechatMenu/list', {
        page: 1,
        size: 100
    }).then((res: any) => {
        miniAppletName.value=res.rows.find((el:any)=>{
            return el.id==form.wxMenuId
        }).name
    })
}

let merchantList = reactive([])
let merchantName=ref('')
function getMErchantList() {
    http.post('my-merchant/merchant/list', {
        page: 1,
        size: 100
    }).then((res: any) => {
        merchantName.value=res.rows.find((el:any)=>{
            return el.id==form.merchantId
        }).name
    })
}

function getDetail(id: any) {
    http.get('my-merchandise/commodity/info/' + id).then((res: any) => {
        let data = res.result
        form.title = data.title
        form.id = data.id
        form.serialNumber = data.serialNumber
        form.description = data.description
        form.flashSale = data.flashSale
        form.cutoffDate = data.cutoffDate
        form.rushPurchasePrice = data.rushPurchasePrice
        form.commodityDetails = data.commodityDetails
        form.merchantId = data.merchantId
        form.merchantTel = data.merchantTel
        form.details = data.details
        form.bookingInstructions = data.bookingInstructions
        form.wxMenuId = data.wxMenuId
        form.categoryId = data.categoryId
        form.isSale = data.isSale
        form.sort = data.sort
        form.remarks = data.remarks
        form.remarks = data.remarks
        form.commodityFileId = data.commodityFileId
        form.commodityComboList = data.commodityComboList
        getMErchantList()
        getMiniApplet()

    })
}

function sendDetail(data: any) {
    form.details = data
}
function sendPreDetail(data: any) {
    form.bookingInstructions = data
}
function submit() {
    let url = form.id ? 'my-merchandise/commodity/edit' : 'my-merchandise/commodity/add'
    let data = JSON.parse(JSON.stringify(form))
    http.post(url, data).then(res => {
        // getTableList(method, requestUrl, queryData)
        form = {
            "id": '',
            "title": '',  //标题
            "serialNumber": '',  //商品编号
            "description": '',  //说明
            "flashSale": '2',  //限时抢购 1-是 2-否
            "cutoffDate": "", //限时抢购截止日期
            "rushPurchasePrice": 0, //限时抢购价格
            "merchantId": "", //商家 ID
            "merchantTel": "", //商家联系方式
            "details": "", //详情
            "bookingInstructions": "", //预定须知
            "wxMenuId": "", //小程序菜单ID
            "categoryId": "", //类别ID
            "isSale": "1", //是否在售 1-是 2-否
            "sort": '', //排序
            "remarks": "", //备注
            "commodityFileId": [], //商品图片集合
            "commodityComboList": [           //商品套餐

            ]
        }
        dialogTableVisible.value = false
        emits('submitCb')
    })
}


</script>
<style lang="scss" scoped>
.avatar-uploader {
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    :deep(.el-upload) {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        &:hover {
            border-color: var(--el-color-primary);
        }
    }

}
.imgs{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .p_img{
        height: 100px;
        margin-right: 20px;
        object-fit: cover;
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