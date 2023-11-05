

<template>
	<div class="user_info_page col">
        <div class="tit">个人中心</div>
		
        <el-form class="el_form" :model="userInfo" label-width="100px">
            <el-form-item label="姓名：" >
                <el-input v-model="userInfo.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱：" >
                <el-input v-model="userInfo.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="地址：" >
                <el-input v-model="userInfo.address" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：" >
                <el-input type="password"  class="no-autofill-pwd" v-model="userInfo.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="" >
                <el-button type="primary" class="c_btn" @click="changeInfo">修改</el-button>
            </el-form-item>
        </el-form>
       
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick,computed,watch } from 'vue';
import useStore from '@/store';
import http from '@/utils/http';
import {encryptByPublicKey} from '@/utils/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
const {  userInfoStore} = useStore();

let userInfo=computed(()=>{
    return userInfoStore.userInfo
})

function changeInfo(){
    let url='my-system/user/update'
    let data=JSON.parse(JSON.stringify(userInfo.value))
    data.password= encryptByPublicKey(data.password) 
    http.post(url,data).then(res=>{
        ElMessage.success('修改成功')
        userInfoStore.getUserInfo()
    })
}

</script>

<style scoped lang="scss">
	.user_info_page{
        width: 500px;
        margin: auto;
        margin-top: 50px;
        .el_form{
            width: 100%;
        }
        .tit{
            font-weight: 600;
            font-size: 24px;
            margin-bottom: 30px;
        }
        .c_btn{
            width: 100%;
        }
    }
</style>