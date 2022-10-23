
import IndexUsers from './auth/indexUsers';
import Login from './auth/Login';
import Register from './auth/Register';
import CreateWarehouse from './warehouse/CreateWarehouse';
import EditWarehouse from './warehouse/EditWareHouse';
import IndexWarehouse from './warehouse/IndexWarehouse';
import EditProvider from './provider/EditProvider';
import IndexProvider from './provider/IndexProvider';
import CreateCategory from './categories/CreateCategory';
import EditCategory from './categories/EditCategory';
import IndexCategory from './categories/IndexCategory';
import LandingPage from './LandingPage';
import RedirectLanding from './utils/RedirectLanding';
import FilterPackage from './PackageBox/FilterPackageBox';
import CreatePackage from './PackageBox/CreatePackageBox';
import DetailPackage from './PackageBox/DetailPackageBox';
import EditPackage from './PackageBox/EditPackageBox';
import CreateProvider from './provider/CreateProvider';


// Configuramos ruteo.
const routes = [
    
    {path:'/category/create', element : CreateCategory, isAdmin: true},
    {path:'/category/edit/:id', element :EditCategory,isAdmin: true},
    {path:'/category', element : IndexCategory,isAdmin: true},

    {path:'/provider/create', element : CreateProvider,isAdmin: true},
    {path:'/provider/edit/:id', element : EditProvider,isAdmin: true},
    {path:'/provider', element : IndexProvider,isAdmin: true},

    {path:'/warehouse/create', element : CreateWarehouse,isAdmin: true},
    {path:'/warehouse/edit/:id', element : EditWarehouse,isAdmin: true},
    {path:'/warehouse', element : IndexWarehouse,isAdmin: true},

    {path:'/packagebox/:id', element : DetailPackage},
    {path:'/packagebox/create', element : CreatePackage,isAdmin: true},
    {path:'/packagebox/edit/:id', element : EditPackage,isAdmin: true},
    {path:'/packagebox/filter', element : FilterPackage},

    {path:'/register', element :  Register},
    {path:'/login', element : Login},
    {path:'/users', element : IndexUsers, isAdmin: true},

    {path:'/', element: LandingPage},
    {path:'*', element : RedirectLanding},
];

export default routes;