

<template>
	<div class="user_page">
		<div class="button">
            <el-button @click="dialogTableVisible=true">新增用户</el-button>
        </div>
        <div class="table_wrap">
            <el-table :data="tabledata" border >
                <el-table-column label="id" prop="id" align="center"></el-table-column>
                <el-table-column label="账号" prop="accountNumber" align="center"></el-table-column>
                <el-table-column label="姓名" prop="name" align="center"></el-table-column>
                <el-table-column label="手机" prop="phone" align="center"></el-table-column>
                <el-table-column label="身份证" prop="idCard" align="center"></el-table-column>
                <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
                <el-table-column label="密码" prop="password" align="center"></el-table-column>
                <el-table-column label="地址" prop="address" align="center"></el-table-column>
                <el-table-column label="操作"  align="center"></el-table-column>
            </el-table>
        </div>
        <el-dialog v-model="dialogTableVisible" >
            <el-form :model="form" label-width="120px">
                <el-form-item label="账号" >
                    <el-input v-model="form.accountNumber" autocomplete="off" />
                </el-form-item>
                <el-form-item label="姓名" >
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="手机" >
                    <el-input v-model="form.phone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="身份证" >
                    <el-input v-model="form.idCard" autocomplete="off" />
                </el-form-item>
                <el-form-item label="邮箱" >
                    <el-input v-model="form.email" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" >
                    <el-input v-model="form.password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="地址" >
                    <el-input v-model="form.address" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button >Cancel</el-button>
                    <el-button type="primary" @click="submit">
                    确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick,computed,watch } from 'vue';
import http from '@/utils/http';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

let tabledata=ref([])

let dialogTableVisible=ref(false)
let form=reactive({
    name:'',
    phone:'',
    idCard:'',
    accountNumber:'',
    email:'',
    password:'',
    address:'',
})
onMounted(()=>{
    getList()
})

function getList(){
    http.post('my-system/user/list',{
        page:1,
        size:10,
        keyword:'',
        isFreeze:2,
    }).then(res=>{
        tabledata.value=res.rows
    })
}

function submit(){
    http.post('my-system/user/add',form).then(res=>{
        getList()
        dialogTableVisible.value=false
    })
}
</script>

<style scoped lang="scss">
	.table_wrap{
        width: 100%;
    }
</style>