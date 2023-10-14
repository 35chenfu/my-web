import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import systemRoutes from './modules/system';
import accountRoutes from './modules/account';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: { title: '首页', isLogin: true, showHead: true,showMenu:true},
            component: () => import('../views/home.vue'),
        },
        {
            path: '/user',
            name: 'user',
            meta: { title: '用户管理', isLogin: true, showHead: true,showMenu:true},
            component: () => import('../views/user.vue'),
        },
        {
            path: '/role',
            name: 'role',
            meta: { title: '角色管理', isLogin: true, showHead: true,showMenu:true},
            component: () => import('../views/role.vue'),
        },
        ...systemRoutes,
        ...accountRoutes
        
    ],
});

export default router;
