import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import store from './store'

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            beforeEnter: (to, from, next) => {
                if (store.state.isUserLoggedIn) {
                    next();
                } else next('/login');
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '*',
            redirect: '/',
            beforeEnter: (to, from, next) => {
                if (store.state.isUserLoggedIn) {
                    next();
                } else next('/login');
            }
        }
    ]
});

export default router;