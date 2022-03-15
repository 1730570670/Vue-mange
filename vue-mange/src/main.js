import Vue from 'vue'; //引入Vue
import App from './App.vue'; //引入App组件文件
import Selectless from './assets/css/Select.less'; //引入css文件(顶部下拉列表)
import VueRouter from 'vue-router';
import axios from 'axios'; //引入axios
import {
    Button,
    Container,
    Main,
    Header,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Row,
    Col,
    Card,
    Table,
    TableColumn,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Option,
    Select,
    Dialog,
    Input,
    Radio,
    Message,
    DatePicker,
    Notification,
    Carousel,
    CarouselItem,
    Drawer
} from 'element-ui'; //按需引入elementUI组件
import 'element-ui/lib/theme-chalk/index.css'; //引入elementUI样式文件
import router from './router'; //引入router文件
import store from './store/index'; //引入Store
Vue.config.productionTip = false; //默认Vue没有提示
// 使用elementUI插件
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(DropdownItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(Selectless);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.prototype.$http = axios;
Vue.use(Select);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(DatePicker);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Drawer);
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
// 以上为按需使用的插件
// 创建Vue实例
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})