<template>
    <el-dialog v-model="dialogTableVisible" width="50%">
        <el-form :model="form" label-width="100px">
            <el-form-item label="商品标题" prop="title">
                <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品编号" prop="serialNumber">
                <el-input v-model="form.serialNumber" />
            </el-form-item>

            <el-form-item label="商品说明" prop="description">
                <el-input v-model="form.description" />
            </el-form-item>
            <el-form-item label="限时抢购" prop="flashSale">
                <el-select v-model="form.flashSale">
                    <el-option v-for="item in saleList" :key="item.value" :label="item.label" :value="item.value"
                        placeholder="请选择状态" />
                </el-select>
            </el-form-item>

            <el-form-item label="抢购截止日期" prop="cutoffDate">
                <el-date-picker v-model="form.cutoffDate" type="datetime" format="YYYY/MM/DD HH:mm:ss"
                    value-format="YYYY-MM-DD h:m:s" placeholder="请选择日期" />
            </el-form-item>
            <el-form-item label="限时抢购价格" prop="rushPurchasePrice">
                <el-input v-model="form.rushPurchasePrice" />
            </el-form-item>
            <el-form-item label="商户选择" prop="merchantId">
                <el-select v-model="form.merchantId" @change="changeMerchant">
                    <el-option v-for="item in merchantList" :key="item.id" :label="item.name" :value="item.id"
                        placeholder="请选择状态" />
                </el-select>
            </el-form-item>
            <el-form-item label="商户联系方式" prop="merchantTel" v-if="form.merchantId">
                <el-input v-model="form.merchantTel" disabled />
            </el-form-item>

            <el-form-item label="小程序分类" prop="wxMenuId">

                <el-select v-model="form.wxMenuId">
                    <el-option v-for="item in miniAppletList" :key="item.id" :label="item.name" :value="item.id"
                        placeholder="请选择状态" />
                </el-select>


            </el-form-item>
            <el-form-item label="类别选择" prop="categoryId">
                <el-input v-model="form.categoryId" />
            </el-form-item>

            <el-form-item label="是否在售" prop="isSale">
                <el-select v-model="form.isSale">
                    <el-option v-for="item in isSaleType" :key="item.value" :label="item.label" :value="item.value"
                        placeholder="请选择状态" />
                </el-select>
            </el-form-item>

            <el-form-item label="排序">
                <el-input v-model="form.sort" autocomplete="off" />
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remarks" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品图片" prop="commodityFileId">
                <el-upload class="avatar-uploader" :action="baseConfing.baseUrl + 'my-file/file/upload'"
                    :show-file-list="true" list-type="picture-card" :on-success="handleAvatarSuccess"
                    v-model:file-list="fileList" accept=".png,.jpg,.jepg,.PNG,.JPG,.JEPG" multiple>
                    <el-icon class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品详情" prop="details">
                <comEditor @send-detail="sendDetail" ref="comEditorRef"></comEditor>
            </el-form-item>
            <el-form-item label="预定须知" prop="bookingInstructions">
                <comEditor @send-detail="sendPreDetail" ref="comEditorRef2"></comEditor>
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
</template>
<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick, computed, watch } from 'vue';
import http from '@/utils/http';
import { ElMessage, ElMessageBox } from 'element-plus'
import baseConfing from '@/config'

import comEditor from '@/components/comEditor.vue'
const props = defineProps({

})
const emits = defineEmits(['submitCb'])
let dialogTableVisible = ref(false)
let comEditorRef: any = ref(null)
let comEditorRef2: any = ref(null)

let saleList = [
    { value: '1', label: '是' },
    { value: '2', label: '否' },
]
let isSaleType = [
    { value: '1', label: '是' },
    { value: '2', label: '否' },
]
let fileList = reactive([])
let form: any = reactive({
    "id": '',
    "title": '',  //标题
    "serialNumber": '',  //商品编号
    "description": '',  //说明
    "flashSale": '2',  //限时抢购 1-是 2-否
    "cutoffDate": "", //限时抢购截止日期
    "rushPurchasePrice": '', //限时抢购价格
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
        {
            "comboName": "131312", //套餐名称
            "price": 1, //价格
            "inventory": 1, //库存
            "limitNum": 1, //限制购买数量
            "sort": 1, //排序
            "remarks": "" //备注
        }
    ]
})

onMounted(() => {
    getMiniApplet()
    getMErchantList()
})
let miniAppletList = reactive([])
function getMiniApplet() {
    http.post('my-system/wechatMenu/list', {
        page: 1,
        size: 100
    }).then((res: any) => {
        miniAppletList = (res.rows)
    })
}
let merchantList = reactive([])
function getMErchantList() {
    http.post('my-merchant/merchant/list', {
        page: 1,
        size: 100
    }).then((res: any) => {
        merchantList = (res.rows)
    })
}
function changeMerchant(e: any) {
    form.merchantTel = merchantList.find((el: any) => {
        return el.id == e
    }).contactTel
    console.log(1212121, form.merchantTel)
}



const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    // form.value.merchantIconId=response.result.id
    form.commodityFileId.push(response.result.id)
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
            "rushPurchasePrice": '', //限时抢购价格
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
                {
                    "comboName": "131312", //套餐名称
                    "price": 1, //价格
                    "inventory": 1, //库存
                    "limitNum": 1, //限制购买数量
                    "sort": 1, //排序
                    "remarks": "" //备注
                }
            ]
        }
        dialogTableVisible.value=false
        emits('submitCb')
    })
}





defineExpose({ dialogTableVisible })
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



.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>