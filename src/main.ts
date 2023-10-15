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



const app = createApp(App);

for (const name in ElIcons){
	app.component(name,(ElIcons as any)[name])
}
app.use(pinia);
app.use(router);
app.use(ElementPlus,{locale})
app.mount('#app')