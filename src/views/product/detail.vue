

<template>
	<div class="user_page">
		<div class="button">
            <el-button  type="primary">商品详情</el-button>
        </div>
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