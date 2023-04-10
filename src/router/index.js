import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '../views/About.vue';
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Commid from '../views/Commid.vue';
import Roles from '../views/Roles.vue';
import Compent from '../views/Compent.vue';
import Classr from '../views/Classr.vue';
import Param from '../views/Param.vue';
import Stat from '../views/Stat.vue';
import Order from '../views/Order.vue';
import Login from '../views/Login.vue';
import Personl from '../views/Personl.vue';
import Error from '../views/404.vue';
import Cookies from 'js-cookie';
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: About,
            redirect: '/home',
            name:'About',
            meta: { title: '首页' },
            /*
            children: [
                {
                    path: 'home',
                    component: Home,
                    name: 'home',
                    meta: { title: '首页' },
                },
                {
                    path: 'user',
                    component: User,
                    name: 'user',
                    meta: { title: '用户管理' },
                },
                {
                    path: 'commid',
                    component: Commid,
                    name: 'commid',
                    meta: { title: '商品列表' },
                },
                {
                    path: 'classr',
                    component: Classr,
                    name: 'classr',
                    meta: { title: '分类管理' },
                },
                {
                    path: 'param',
                    component: Param,
                    name: 'param',
                    meta: { title: '参数管理' },
                },
                {
                    path: 'roles',
                    component: Roles,
                    name: 'roles',
                    meta: { title: '角色管理' },
                },
                {
                    path: 'compent',
                    component: Compent,
                    name: 'compent',
                    meta: { title: '权限列表' },
                },
                {
                    path: 'order',
                    component: Order,
                    name: 'order',
                    meta: { title: '订单管理' },
                },
                {
                    path: 'stat',
                    component: Stat,
                    name: 'stat',
                    meta: { title: '数据统计' },
                },
                {
                    path: '/personl',
                    component: Personl,
                    name: 'personl',
                    meta: { title: '个人主页' },
                },
            ]
            */
           children:[],
        },
        {
            path: '/login',
            component: Login,
            name: 'login',
            meta: { title: '登陆' },
        },
        {
            path: '/404',
            component: Error,
            name: '404',
            //meta: { title: '' },
        },
    ]
});
router.beforeEach((to, from, next) => {
    const token = Cookies.get('Login');
    if (!token && to.name !== 'login') {
        next({ name: 'login' });
    } else if (token && to.name === 'login') {
        next({ name: 'home' });
    } else {
        next();
    }
});
router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = '星乐猫咖系统'
    }
})
export default router;