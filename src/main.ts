import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
const pinia = createPinia();

import '@/assets/main.scss'
// import '@/assets/element.scss'
import '@/utils/rem';
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn';

import 'element-plus/dist/index.css';
import * as ElIcons from '@element-plus/icons'
import router from './router';

import { ElMessage } from 'element-plus';
router.beforeEach((to, form, next) => {
    try {
        if (to.meta.isLogin && !localStorage.getItem('token')) {
            ElMessage.error('请先登录');
            router.push('/login');
        } else {
            next();
        }  
    } catch (error) {
        console.log('main',error)
    }
    
});


const app = createApp(App);

for (const name in ElIcons){
	app.component(name,(ElIcons as any)[name])
}
app.use(pinia);
app.use(router);
app.use(ElementPlus,{locale})
app.mount('#app')