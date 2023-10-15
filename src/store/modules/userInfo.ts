import { defineStore } from 'pinia';
import http from '@/utils/http.js';

const userInfoStore = defineStore('userInfoStore', {
    state: () => ({
        userInfo: {
            name:''
        },
        
    }),
    actions: {
        getUserInfo() {
            http.get('my-system/user/info').then((res:any) => {
                this.userInfo = res.result;
            });
        },
        
    },
});

export default userInfoStore;
