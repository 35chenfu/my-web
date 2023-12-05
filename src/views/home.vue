

<template>
	<div class="page">
		首页
		<comEditor></comEditor>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onActivated, nextTick,computed,watch } from 'vue';
import comEditor from '@/components/comEditor.vue'
</script>

<style scoped lang="scss">
	.page{
      
    }
</style>