import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import Reset from './views/Reset'
import Dashboard from './views/Dashboard'
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
            component: Register,
            beforeEnter: (to, from, next) => {
                if (!store.state.isUserLoggedIn) {
                    next();
                } else next('/');
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if (!store.state.isUserLoggedIn) {
                    next();
                } else next('/');
            }
        },

        {
            path: '/reset',
            name: 'reset',
            component: Reset,
            beforeEnter: (to, from, next) => {
                if (!store.state.isUserLoggedIn) {
                    next();
                } else next('/');
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            beforeEnter: (to, from, next) => {
                if (store.state.isUserLoggedIn) {
                    next();
                } else next('/login');
            }
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