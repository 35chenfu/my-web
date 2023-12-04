
const merchantRoutes = [
    {
        path: '/merchant',
        name: 'merchant',
        meta: {title:'商户列表', isLogin: true, showHead: true,showMenu:true },
        component: () => import('@/views/merchant/index.vue'),
    },
   
   
];

export default merchantRoutes 

