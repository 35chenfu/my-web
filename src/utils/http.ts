import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router/index';
import { nextTick } from 'vue';
import baseConfing from '@/config'
const version = '1.0.1';
const http:any = axios.create({
    // baseURL: import.meta.env.VITE_APP_API_URL,
    // baseURL: 'http://ra5vqu.natappfree.cc/',
    baseURL: baseConfing.baseUrl,
    // baseURL: '',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});


http.interceptors.request.use(
    (config: any) => {
        config.headers = {
            data: null,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        if (localStorage.getItem('token')) {
            config.headers.Authorization = localStorage.getItem('token');
        }
        return config;
    },
    (err) => {
        Promise.reject(err);
    },
);
http.interceptors.response.use(
    (res) => {
        let resData=res.data
        let result=resData.result
        let code = res.data.code
        
        if(result==11012 || result==11013){
            ElMessage.error('身份认证失效，请重新登录');
            localStorage.clear()
            router.push({path:'/login'})
        }else if(result==11014 || result==11015){
            ElMessage.error('账号别处登录，被挤下线');
            localStorage.clear()
            router.push({path:'/login'})
        }
        if (res.data.success) {
            return Promise.resolve(res.data);
        } else {
            ElMessage.error(res.data.errorDesc || res.error);
            return Promise.reject(res.data);
        }
    },
    (err) => {
       
        if (err.response.status == 401) {
            // clearStorage();
            router.push('/login');
        } else {
            ElMessage.error(err.response.data.error);
        }

        // 服务器响应发生错误时的处理
        return Promise.reject(err.response.data);
    },
);

export default http;
