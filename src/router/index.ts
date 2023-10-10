import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import systemRoutes from './modules/system';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: { title: '首页', keepAlive: true, showRecomment: true, isLogin: true },
            component: () => import('../views/home.vue'),
        },
        ...systemRoutes
        
    ],
});

export default router;
