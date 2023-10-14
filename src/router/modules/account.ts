
const accountRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: {title:'登录', isLogin: false, showHead: false,showMenu:false },
        component: () => import('@/views/account/login.vue'),
    },
   
   
];

export default accountRoutes 

