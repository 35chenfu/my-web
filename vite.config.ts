import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer';
import postCssPxToRem from 'postcss-pxtorem';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
        vue(),
        ElementPlus({
            useSource: true,
          }),
       
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        https: false,
        host: '0.0.0.0',
        port:8000,
        proxy: {
            '/my-auth': {
                target: 'http://7g26jc.natappfree.cc/', // 接口的域名
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                rewrite: path => path.replace(/^\/my-auth/, '')
            }
        }
    },
    
	css: {
        preprocessorOptions: {
            scss: {
                additionalData: ` @use "@/assets/element.scss" as *;`,
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