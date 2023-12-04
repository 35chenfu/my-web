
const productRoutes = [
    {
        path: '/product',
        name: 'product',
        meta: {title:'商品详情', isLogin: true, showHead: true,showMenu:true },
        component: () => import('@/views/product/index.vue'),
    },
   
   
];

export default productRoutes 

