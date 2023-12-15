import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router/index';

// axios实例
const http:any = axios.create({
    baseURL: '/api',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});


// 请求拦截器
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
    (err: any) => {
        Promise.reject(err);
    }
);



// 响应拦截器
http.interceptors.response.use(
    (res: any) => {

        let resData=res.data
        let result=resData.result
        let code = res.data.code

        if (res.data.success) {
            return Promise.resolve(res.data);
        } else {
            if(result==11012 || result==11013){
                ElMessage.error('身份认证失效，请重新登录');
                localStorage.clear()
                router.push({path:'/login'})
            }else if(result==11014 || result==11015){
                ElMessage.error('账号别处登录，被挤下线');
                localStorage.clear()
                router.push({path:'/login'})
            } else {
                ElMessage.error(res.data.errorDesc || res.error);
            }

            return Promise.reject(res.data);
        }
    },
    (err: any) => {
       
        if (err.response.status == 401) {
            ElMessage.error('身份认证失效，请重新登录');
            localStorage.clear();
            router.push('/login');
        } else {
            ElMessage.error(err.response.data.error);
        }

        // 服务器响应发生错误时的处理
        return Promise.reject(err.response.data);
    },
);

export default http;
