

<template>
    <div class="page">
        <div class="btn-wrap">
            <el-button type="primary" >添加菜单</el-button>
        </div>
        <el-table class="mt20" :data="tableData" v-loading="loading" border row-key="id"  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column label="名称" prop="title"> </el-table-column>
            <el-table-column label="跳转链接" prop="link"></el-table-column>
            <el-table-column label="状态" align="center" prop="status">
                <template #default="scope">
                    <el-switch v-model="scope.row.status" @change="swithcChange($event, scope.row)"></el-switch>
                    {{ scope.row.status ? '启用' : '禁用' }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button  type="primary" size="small" @click="btnHandle( scope.row, 1)">编辑</el-button>
                    <el-button  type="primary" size="small"  @click="btnHandle( scope.row, 2)">添加子菜单</el-button>
                    <el-button  type="warning" size="small" @click="btnHandle( scope.row, 3)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick, computed, watch } from 'vue';

let tableData=[
    {
        id:1,
        title:'菜单1',
        link:'home',
        status:true,
        children:[
            {
                id:1-1,
                title:'菜单那1-1',
                link:'12121',
                status:true,
            }
        ]
    },
    {
        id:2,
        title:'菜单2',
        link:'12121',
        status:true,
    },
]
function swithcChange(e:any,data:any){

}
function btnHandle(data:any,type:any){

}
</script>

<style scoped lang="scss">
.page {
   
}
</style>