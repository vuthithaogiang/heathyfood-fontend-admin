import Home from '~/pages/Home';
import Login from '~/pages/Login';
import ProductCategory from '~/pages/ProductCategory';
import Products from '~/pages/Products';
import Customers from '~/pages/Customers';
import TypesOfCampaign from '~/pages/TypesOfCampaign';
import Campaigns from '~/pages/Campaigns';
import AddNewCampaign from '~/pages/AddNewCampaign';
import CampaignDetail from '~/pages/CampaignDetail';

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
    {
        path: '/admin/types-of-campaign',
        component: TypesOfCampaign,
    },
    {
        path: '/admin/campaigns',
        component: Campaigns,
    },
    {
        path: '/admin/add-new-campaign',
        component: AddNewCampaign,
    },
    {
        path: '/admin/campaign-details/:campaignSlug',
        component: CampaignDetail,
    },
];

const publicRoutes = [{ path: '/login', component: Login, layout: null }];

export { privateRoutes, publicRoutes };
