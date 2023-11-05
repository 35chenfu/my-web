
const accountRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: {title:'登录', isLogin: false, showHead: false,showMenu:false },
        component: () => import('@/views/account/login.vue'),
    },
    {
        path: '/account/userInfo',
        name: 'userInfo',
        meta: {title:'个人中心', isLogin: true, showHead: true,showMenu:false },
        component: () => import('@/views/account/userInfo.vue'),
    },
   
];

export default accountRoutes 

