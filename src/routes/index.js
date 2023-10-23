import Home from '~/pages/Home';
import ProductCategory from '~/pages/ProductCategory';
import Products from '~/pages/Products';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin/product-category', component: ProductCategory },
    {
        path: '/admin/products',
        component: Products,
    },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
