import Vue from 'vue'; //引入Vue
import VueRouter from 'vue-router'; //引入vue-router
import Main from '../components/Main.vue'; // 引入Main组件
import User from '../components/Views/User.vue'; // 引入Message组件
import Home from '../components/Views/Home.vue'; // 引入Home组件
import Mall from '../components/Views/Mall.vue'; // 引入Home组件
import Otherone from '../components/Views/Otherspages/Otherone.vue'; //引入Otheone组件
import Othertwo from '../components/Views/Otherspages/Othertwo.vue'; //引入Othertwo
import Login from '../components/Login/Login.vue'; //导入登录页面Login组件
import Store from '../store/tab.js'
Vue.use(VueRouter); //使用VueRouter
const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'login',
            component: Login,
            meta: { title: '登录', isLogin: false }
        },
        {
            path: '/main', //路径
            component: Main, //组件
            meta: { title: '主页' },
            children: [{
                    path: '/',
                    name: 'home',
                    component: Home,
                    meta: { title: '首页' },
                },
                {
                    path: '/mall', //路径
                    name: 'mall', //命名
                    component: Mall, //组件
                    meta: { title: '商品管理' },
                },
                {
                    path: '/user', //路径
                    name: 'user', //命名
                    component: User, //组件
                    meta: { title: '用户管理' },
                },
                {
                    path: '/pagel', //路径
                    name: 'pagel', //命名
                    component: Otherone, //组件
                    meta: { title: '其他页面1' },
                },
                {
                    path: '/page2', //路径
                    name: 'page2', //命名
                    component: Othertwo, //组件
                    meta: { title: '其他页面2' },
                },

            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.path == '/') { //如果进入首页,允许进入,进入别的页面无效
        next()
    } else { //如果不是首页,也要是登录状态才开放
        if (Store.state.islogin == true) {
            next(); //允许进入
        }
    }

});
// 全局后置配置(更改标题)
router.afterEach((to) => {
    document.title = "通用管理系统: " + to.meta.title
});
export default router