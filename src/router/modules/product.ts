
const productRoutes = [
    {
        path: '/product',
        name: 'product',
        meta: {title:'商品列表', isLogin: true, showHead: true,showMenu:true },
        component: () => import('@/views/product/index.vue'),
    },
    {
        path: '/productDetail',
        name: 'productDetail',
        meta: {title:'商品详情', isLogin: true, showHead: true,showMenu:true },
        component: () => import('@/views/product/detail.vue'),
    },
   
   
];

export default productRoutes 

