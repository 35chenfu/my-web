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
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
        vue(),
        ElementPlus({
            useSource: true,
        }),
        // legacy({
		// 	targets: ["chrome 80", "defaults", "not IE 11"]
		// })
       
    ],
    // build: {
    //     // 默认是modules,更改这个会去输出兼容浏览器，根据实际情况修改
    //     target: ["es2015", "chrome63"], 
    //   },
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
            '/api': {
                target: 'http://127.0.0.1:8000/api', // 接口的域名
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                rewrite: path => path.replace(/^\/api/, '')
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