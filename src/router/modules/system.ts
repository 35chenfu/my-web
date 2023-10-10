
const systemRoutes = [
    {
        path: '/menuManage',
        name: 'menuManage',
        meta: {title:'菜单管理', isLogin: true, showHead: true,showRecomment:true },
        component: () => import('@/views/system/menuManage.vue'),
    },
    {
        path: '/permission',
        name: 'permission',
        meta: {title:'权限管理', isLogin: true, showHead: true,showRecomment:true },
        component: () => import('@/views/system/permission.vue'),
    },
   
];

export default systemRoutes 

