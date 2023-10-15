

<template>
	<div class="">
		<div class="login_wrap">
            <el-input v-model="accountNumber" placeholder="请输入账号"></el-input>
            <el-input v-model="password" placeholder="请输入账号"></el-input>
            <el-button @click="login">登录</el-button>
        </div>
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

    }
</style>