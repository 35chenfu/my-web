

<template>
    <div class="head_wrap row j_c_b">
        <div class="logo_wrap row">
            <img src="@/assets/images/logo1.png" class="logo">
            穆言科技
        </div> 
        <div class="user_wrap cur_po">
            <el-dropdown @command="command">
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
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

const router = useRouter()
function command(e:any){
    if(e=='logout'){
        http.get('my-auth/auth/logout').then(res=>{

            router.push('/login')
        })
    }
}
</script>

<style scoped lang="scss">
.head_wrap {
    padding: 0 50px;
    height: 100px;
    background-color: $color;

    .logo {
        width: 70px;
        height: 70px;
    }
}
</style>