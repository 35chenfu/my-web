

<template>
	<div class="head_wrap row j_c_b">
        <div class="logo_wrap row">
            <img src="@/assets/images/logo1.png" class="logo">
            穆言科技
        </div>
        <div class="user_wrap">
            用户
        </div>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick,computed,watch } from 'vue';

</script>

<style scoped lang="scss">
	.head_wrap{
        padding: 0 50px;
        height: 100px;
        background-color: $color;
        .logo{
            width: 70px;
            height: 70px;
        }
    }
</style>