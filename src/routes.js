import React from 'react';
import { Redirect } from 'react-router-dom';
import Groups from './views/Catalog/Group/group';
import AddGroup from './views/Catalog/Group/addGroup';
import UpdateGroup from './views/Catalog/Group/updateGroup';
import Advertisement from './views/Advertisement/Adverts';
import AddAdvert from './views/Advertisement/addAdvert';
import UpdateAdvert from './views/Advertisement/updateAdvert';

import AddTasks from './views/Tasks/addtask';
import UpdateTasks from './views/Tasks/updatetask';
import Tasks from './views/Tasks/task';
import AddLink from './views/Marketing/Statements/addstatements';
import Statements from './views/Marketing/Statements/statements';
import UpdateStatement from './views/Marketing/Statements/updatestatements';
import Personal from './views/Personal/personal';
import KPI from './views/KPI/KPIs';
import AddKPI from './views/KPI/addKPI';
import UpdateKPI from './views/KPI/UpdateKPI';
import Coupon from './views/Coupon/coupon';
import AddCoupon from './views/Coupon/addcoupon';
import UpdateCoupon from './views/Coupon/updatecoupon';






// import Chat from './views/Chat/App/Chat'

const Dashboard = React.lazy(() => import('./views/Dashboard'));

const Categories = React.lazy(() => import('./views/Catalog/Categories/Categories'));
const AddCategory = React.lazy(()=>import('./views/Catalog/Categories/AddCategory'))
const UpdateCategory = React.lazy( ()=> import('./views/Catalog/Categories/UpdateCategory'))

const Classes = React.lazy(() => import('./views/Catalog/Class/Class'))
const AddClasses = React.lazy(() => import('./views/Catalog/Class/AddClass'))
const UpdateClass = React.lazy(()=>import('./views/Catalog/Class/UpdateClass'))

const Brands = React.lazy(() => import('./views/Catalog/Brands/Brands'))
const AddBrands = React.lazy(() => import('./views/Catalog/Brands/AddBrands'))
const UpdateBrand = React.lazy(() => import('./views/Catalog/Brands/UpdateBrands'))

const Options = React.lazy(() => import('./views/Catalog/Options/Options'))
const AddOptions = React.lazy(()=>import('./views/Catalog/Options/AddOptions'))
const UpdateFeature = React.lazy(() => import('./views/Catalog/Options/UpdateOptions'))

const OptionValues = React.lazy(() => import('./views/Catalog/OptionValues/OptionValues'))
const AddValueOptions = React.lazy(()=> import('./views/Catalog/OptionValues/addOptionValues'))
const Updateoptionvalues = React.lazy(() => import('./views/Catalog/OptionValues/UpdateValueOption'))

const Shops = React.lazy(() => import('./views/Dealers/Shop'));
const AddShop = React.lazy(() => import('./views/Dealers/components/AdddealerShops'))
const UpdateShop = React.lazy(() => import('./views/Dealers/updateShop'));
const DealersList = React.lazy(() => import('./views/Dealers/dealers'));
const AddDealer = React.lazy(() => import('./views/Dealers/addDealer'));
const DealerCard = React.lazy(() => import('./views/Dealers/dealerCard'));

const Products = React.lazy(() => import('./views/Products/Products/Products'))
const AddProducts = React.lazy(() => import('./views/Products/AddProducts/AddProducts'));
const UpdateProduct = React.lazy(() => import('./views/Products/UpdateProduct/UpdateProduct'));
const NewProducts = React.lazy(() => import('./views/Products/NewProducts/newproduct'));

const Orders = React.lazy(() => import('./views/Charts/Orders'))
const CreateOrder = React.lazy(() => import('./views/Charts/CreateOrder'))
const OrderPage = React.lazy(() => import('./views/Charts/OrderPage'));

const Carts = React.lazy(() => import('./views/Carts/Cart'));
const CartPage = React.lazy(() => import('./views/Carts/CartPage'));

const UserList = React.lazy(()=>import('./views/UserList/UserList'))
const UserCard = React.lazy(() => import('./views/UserList/UserCard'));

const Courier = React.lazy(() => import('./views/Delivery/Courier/Couriers'));
const AddCourier = React.lazy(() => import('./views/Delivery/Courier/AddCourier'));
const CourierCard = React.lazy(() => import('./views/Delivery/Courier/CourierCard'));

const Deliveries = React.lazy(() => import('./views/Delivery/Delivery/Deliveries'));
const AddDelivery = React.lazy(() => import('./views/Delivery/Delivery/AddDelivery'));
const UpdateDelivery = React.lazy(() => import('./views/Delivery/Delivery/UpdateDelivery'));

const Managers = React.lazy(() => import('./views/Managers/Managers'));
const AddManagers = React.lazy(() => import('./views/Managers/AddManagers'));
const UpdateManagers = React.lazy(() => import('./views/Managers/UpdateManager'));
const Roles = React.lazy(() => import('./views/Roles/containers/Roles'));
const AddRole = React.lazy(() => import('./views/Roles/containers/AddRole'));
const EditRole = React.lazy(() => import('./views/Roles/containers/EditRole'));

const Navigations = React.lazy(() => import('./views/Navigation/containers/Navigations'));
const AddNavigation = React.lazy(() => import('./views/Navigation/containers/AddNavigation'));
const UpdateNavigation = React.lazy(() => import('./views/Navigation/containers/UpdateNavigation'))

const News = React.lazy(() => import('./views/News/news'));
const AddNews = React.lazy(() => import('./views/News/addnews'));
const UpdateNews = React.lazy(() => import('./views/News/editnews'));

const SlidersWeb = React.lazy(() => import('./views/Visual/Sliders/containers/mainWeb'));
const SlidersMobile = React.lazy(() => import('./views/Visual/Sliders/containers/mainMobile'));
const CreateSlider = React.lazy(() => import('./views/Visual/Sliders/containers/createSlider'));
const UpdateSlider = React.lazy(() => import('./views/Visual/Sliders/containers/updateSlider'));

const AddForms = React.lazy(() => import('./views/Products/AddProducts/AddForm') );

// const Variations = React.lazy(() => import('./views/Catalog/Variation/Variations'))
// const AddValueOptions = React.lazy(()=>import('./views/Catalog/Options/AddValueOptions'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Главная' },
  { path: '/dashboard', name: 'Мониторинг', component: Dashboard },
  // start of catalog
  { path: '/clerk-catalog', exact: true, name:'Каталог', component: () => <Redirect to={'/catalog/categories'}/>},
  { path: '/catalog/categories', exact:true, name:'Категории', component: Categories},
  { path: '/catalog/categories/add', name:'Добавить Категорию', component: AddCategory},

  { path: '/catalog/updatecategory/:id', name:'Обновить Категорию', component: UpdateCategory},

  { path: '/catalog/classes/', exact: true, name:'Классы ', component: Classes},
  { path: '/catalog/classes/add', name:'Добавить класс', component: AddClasses},

  { path: '/catalog/updateclass/:id', name:'Обновить класс', component: UpdateClass},
  
  { path: '/catalog/brands', exact: true, name:'Бренды',  component: Brands},
  { path: '/catalog/brands/add', name:'Добавить бренды', component: AddBrands},
  { path: '/catalog/updatebrand/:id', name:'Обновить бренды', component: UpdateBrand},


  { path: '/catalog/groups', exact: true, name:'Группы', component: Groups},
  { path: '/catalog/groups/add', name:'Добавить группу', component:AddGroup},
  { path: '/catalog/updategroups/:id', name:'Обновить группу', component: UpdateGroup},


  { path: '/catalog/options/', exact: true, name:'Характеристики', component: Options},
  { path: '/catalog/options/add', name:'Добавить характеристику', component: AddOptions},
  { path: '/catalog/updatefeature/:id', name:'Обновить характеристику', component:UpdateFeature},

  { path: '/catalog/optionvalues', exact: true, name:'Значение характеристик', component: OptionValues},
  { path: '/catalog/optionvalues/add', name:'Добавить значение характеристики', component:AddValueOptions},
  { path: '/catalog/updateoptionvalues/:id', name:'Обновить значение характеристик', component: Updateoptionvalues},

  // end of Catalog

  // start of Dealers
  { path: '/suppliers', exact: true, name:'Поставщики', component: () => <Redirect to={'/suppliers/dealers'}/>},
  { path: '/suppliers/dealers', exact: true, name:'Дилеры', component: DealersList},
  { path: '/suppliers/dealers/add', name:'Добавить Дилера', component: AddDealer},
  
  { path: '/suppliers/dealercard/:id', name:'Карточка Дилера', component: DealerCard},
  
  { path: '/suppliers/shops', exact: true, name: 'Магазины', component: Shops},
  { path: '/suppliers/shops/add', name:'Добавить магазин', component: AddShop},
  { path: '/suppliers/updateshops/:id', name: 'Обновить магазин', component: UpdateShop},

  // end of dealers
  
  // start of Personal
  
  { path: '/personal', name: 'Персональный кабинет', component: Personal},

  // end of Personal

    // start of Dealers
  
    { path: '/kpi', name: 'KPI', component: KPI},
    { path: '/addkpi', name:'Добавить KPI', component: AddKPI},
    { path: '/updatekpi/:id', name:'Обновить KPI', component: UpdateKPI},
    // end of dealers


    // start of Coupon
    { path: '/coupon', name: 'Купоны', component: Coupon},
    { path: '/addcoupon', name:'Добавить купон', component: AddCoupon},
    { path: '/updatecoupon/:id', name:'Обновить купон', component: UpdateCoupon},
    // end of Coupon



  // start of Adverts

  { path: '/adverts', exact: true, name: 'Cтатьи расходов', component: Advertisement},
  { path: '/adverts/add', name:'Добавить статью расхода', component: AddAdvert},
  { path: '/updateadverts/:id', name: 'Обновить статью расхода', component: UpdateAdvert},

  // end of Adverts

    // start of Adverts

    { path: '/statements', exact: true, name: 'Рекламные компания', component: Statements},
    { path: '/statement/add', name:'Добавить рекламу', component: AddLink},
    { path: '/updatestatement/:id', name: 'Обновить рекламу', component: UpdateStatement},
  
    // end of Adverts


  // start of goods
  { path: '/goods', exact: true, name: 'Товары', component: () => <Redirect to={'/goods/products'}/>},
  { path: '/goods/products', exact: true, name: 'Продукты', component: Products },
  { path: '/goods/products/add', name: 'Добавить Продуктов', component: AddProducts },
  { path: '/goods/updateproduct/:id', name: 'Обновить Продукт', component: UpdateProduct},
  { path: '/goods/newproducts', name: 'Новые Продукы', component: NewProducts},
  // end of goods

  // start of orders
  { path: '/orders', exact: true, name: 'Заказы', component: Orders },
  { path: '/orders/add', name: 'Создать заказ', component: CreateOrder },
  { path: '/orderpage/:id', name: 'Карточка заказа', component: OrderPage },
  // end of orders

    // start of orders
    { path: '/task', exact: true, name: 'Задачи', component: Tasks },
    { path: '/task/add', name: 'Создать задачу', component: AddTasks },
    { path: '/task/:id', name: 'Карточка задачи', component: UpdateTasks },
    // end of orders


  // start of cart
  { path: '/carts', exact: true, name:'Корзина', component: Carts},
  { path: '/cartpage/:id', name: 'Карточка корзины', component: CartPage},
  // end of cart

  // start of clients
  { path: '/clients', exact: true, name: 'Покупатели', component: UserList },
  { path: '/clients/:id', name: 'Карточка Покупателя', component: UserCard },
  // end of clients
  
  // start of delivery
  { path: '/delivery', exact: true, name:'Доставка', component: () => <Redirect to={'/delivery/carriers'}/>},
  { path: '/delivery/deliveries', exact: true, name:'Методы Доставок', component: Deliveries},
  { path: '/delivery/deliveries/add', name:'Добавить Метод Доставки', component: AddDelivery},
  { path: '/delivery/updatedelivery/:id', name:'Обновить метод доставки', component: UpdateDelivery},
  { path: '/delivery/carriers', exact: true, name: 'Курьеры', component: Courier},
  { path: '/delivery/carriers/add', name:'Добавить Курьера', component: AddCourier},
  { path: '/delivery/carriercard/:id', name:'Обновить Курьера', component: CourierCard},
  // end of delivery

  // start of userroles
  { path: '/userroles', exact: true, name: 'Роли пользователей', component: () => <Redirect to={'/userroles/managers'}/>},
  { path: '/userroles/managers', exact: true, name: 'Менеджеры', component: Managers},
  { path: '/userroles/managers/add', name: 'Добавить Менеджера', component: AddManagers},
  { path: '/userroles/managers/:id', name: 'Изменить Менеджера', component: UpdateManagers},
  { path: '/userroles/roles', exact: true, name: 'Роли', component: Roles},
  { path: '/userroles/roles/add', name: 'Добавить роль', component: AddRole},
  { path: '/userroles/roles/:id', name: 'Изменить роль', component: EditRole},
  // end of userroles

  // start of navigations
  { path: '/navigations', exact: true, name: 'Навигация', component: Navigations},
  { path: '/navigations/add', name: 'Добавить Навигацию', component: AddNavigation},
  { path: '/navigations/:id', name: 'Изменить Навигацию', component: UpdateNavigation},
  // end of navigations
  
  // start of news
  { path: '/visual', exact: true, name: 'Визуализация', component: () => <Redirect to={'/visual/news'}/>},
  { path: '/visual/news', exact: true, name: 'Новости', component: News},
  { path: '/visual/news/add', name: 'Добавить новость', component: AddNews},
  { path: '/visual/news/:id', name: 'Обновить новости', component: UpdateNews},
  // end of news
  
  // start of visuals
  { path: '/visual/sliders/web', name: 'Веб версия', component: SlidersWeb},
  { path: '/visual/sliders/mobile', name: 'Мобильная версия', component: SlidersMobile},
  { path: '/visual/sliders/add', name: 'Добавить слайдер', component: CreateSlider},
  { path: '/visual/sliders/:id', name: 'Обновить слайдер', component: UpdateSlider},
  // end of visuals

  { path: '/buttons/addforms', name: 'Форма', component: AddForms },
];

export default routes;
