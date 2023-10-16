

<template>
	<div class="login_wrap ">
        <div class="row">
            账号<el-input class="input"  v-model="accountNumber" placeholder="请输入账号"></el-input>
        </div>
        <div class="row">
            密码<el-input class="input mt20"  v-model="password" placeholder="请输入密码"></el-input>
        </div>
        
        
        <el-button @click="login" type="primary" style="width: 50%;" class="mt20">登录</el-button>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick,computed,watch } from 'vue';
import http from '@/utils/http';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
let accountNumber=ref('admin')
let password=ref('123')

function login(){
    http.post('my-auth/auth/login',{
        accountNumber:accountNumber.value,
        password:password.value
    }).then(res=>{
        localStorage.setItem('token',res.result)
        router.push('/')
    })
}

</script>

<style scoped lang="scss">
	.login_wrap{
        width: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .input{
            width: 200px;
            margin-left: 20px;
        }
    }
</style>