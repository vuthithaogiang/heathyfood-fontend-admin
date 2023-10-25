import Home from '~/pages/Home';
import Login from '~/pages/Login';
import ProductCategory from '~/pages/ProductCategory';
import Products from '~/pages/Products';
import Customers from '~/pages/Customers';

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/admin/product-category', component: ProductCategory },
    {
        path: '/admin/products',
        component: Products,
    },
    {
        path: '/admin/customers',
        component: Customers,
    },
];

const publicRoutes = [{ path: '/login', component: Login, layout: null }];

export { privateRoutes, publicRoutes };
