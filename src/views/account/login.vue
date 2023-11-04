

<template>
	<div class="login_wrap row ">
        <div class="left_bg col j_c_c">
            <img class="logo" src="@/assets/images/logo1.png" alt="" srcset="">
            穆言科技
        </div>
        <div class="right  col j_c_c">
            <div class="right_info">
                <div class="l_tit">用户登录</div>
                <div class="row">
                    账号<el-input class="input"  v-model="accountNumber"  size="large" placeholder="请输入账号"></el-input>
                </div>
                <div class="row">
                    密码<el-input class="input mt20"  v-model="password"  size="large" placeholder="请输入密码"></el-input>
                </div>
                <el-button @click="login" type="primary" size="large" class="l_btn">登录</el-button>
            </div>
            
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
        width: 700px;
        height: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        box-shadow: 0px 0px 10px 1px rgba($color: #000000, $alpha: 0.5);
        border-radius: 12px;
        overflow: hidden;
        .input{
            width: 200px;
            margin-left: 20px;
        }
        .left_bg{
            width: 50%;
            background-color: #409eff;
            height: 100%;
            font-weight: 600;
            font-size: 24px;
            .logo{
                width: 80px;
                margin-bottom: 30px;
            }
        }
        .right{
            width: 50%;
            height: 100%;
            background-color: #efefef;
            .right_info{
                width: 80%;
            }
            .l_tit{
                margin-bottom: 30px;
                text-align: left;
                font-weight: 600;
            }
            .l_btn{
                background-color:#409eff ;
                margin-top: 50px;
                width: 90%;
            }
        }

    }
</style>