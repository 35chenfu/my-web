import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer';
import postCssPxToRem from 'postcss-pxtorem';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        https: false,
        host: '0.0.0.0',
        port:8000,
    },
	css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/mixin.scss";`,
            },
        },
        postcss: {
            plugins: [
                autoprefixer({
                    overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
                }),
                postCssPxToRem({
                    // 自适应，px>rem转换75
                    rootValue: 16, // 1440设计稿
                    propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
                    selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换
                }),
            ],
        },
    },
})