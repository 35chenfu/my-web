

<template>
    <div class="head_wrap row j_c_b">
        <div class="logo_wrap row cur_po" @click="toHome">
            <img src="@/assets/images/logo1.png" class="logo">
            穆言科技
        </div> 
        <div class="user_wrap cur_po">
            <el-dropdown @command="command">
                <el-button class="el-dropdown-link">
                    {{ userInfoStore.userInfo.name }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick, computed, watch } from 'vue';
import http from '@/utils/http';
import { useRouter, useRoute } from 'vue-router';
import useStore from '@/store';

const {  userInfoStore} = useStore();
const router = useRouter()
function command(e:any){
    if(e=='logout'){
        http.get('my-auth/auth/logout').then(res=>{
            localStorage.clear()
            router.push('/login')
        })
    }else if(e=='userInfo'){
        router.push('/account/userInfo')
    }
}
onMounted(()=>{
    userInfoStore.getUserInfo() 
})
function toHome(){
    router.push('/')
}
</script>

<style scoped lang="scss">
.head_wrap {
    padding: 0 50px;
    height: 100px;
    background-color: #f4f5f3;

    .logo {
        width: 70px;
        height: 70px;
    }
}
.el-dropdown-link{
    background-color: transparent;
    &:focus{
        background-color:transparent ;
    }
    &:hover{
        background-color:transparent !important;
    }
    color: #333 !important;
}
</style>