
const productRoutes = [
    {
        path: '/product/detail',
        name: 'productDetail',
        meta: {title:'商品详情', isLogin: true, showHead: true,showMenu:true },
        component: () => import('@/views/product/detail.vue'),
    },
   
   
];

export default productRoutes 

