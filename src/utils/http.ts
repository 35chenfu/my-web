import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router/index';
import { nextTick } from 'vue';
const version = '1.0.1';
const http:any = axios.create({
    // baseURL: import.meta.env.VITE_APP_API_URL,
    // baseURL: 'http://ra5vqu.natappfree.cc/',
    baseURL: 'http://125.124.0.124:8000/',
    // baseURL: '',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});
let requestQueue = [];

// 保存原始的 axios.get 函数
const originalGet = http.get;
// 修改 axios.get 函数，以在请求前执行一些操作
http.get = function (url, config) {
    // 在这里执行你想要的操作，例如将请求添加到队列
    // console.log('Before HTTP GET Request');
    // console.log(url);
    const promiseobj = originalGet.call(http, url, config);
    requestQueue.push(promiseobj);

    // 调用原始的 axios.get 函数来发起请求
    return promiseobj;
};

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
        let code = res.data.code
        if(code==11012 || code==11013){
            ElMessage.error('身份认证失效，请重新登录');
            localStorage.clear()
            router.push({path:'/login'})
        }else if(code==11014 || code==11015){
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
