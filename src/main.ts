import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/main.scss'
import '@/utils/rem';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import * as ElIcons from '@element-plus/icons'
import router from './router';



const app = createApp(App);

for (const name in ElIcons){
	app.component(name,(ElIcons as any)[name])
}
app.use(router);
app.use(ElementPlus)
app.mount('#app')