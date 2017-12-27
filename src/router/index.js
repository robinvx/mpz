import Vue from 'vue'
import Router from 'vue-router'
import Cards from '@/views/Cards'
import CardsDetail from '@/views/CardsDetail'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Account from '@/views/Account'
import ForgotPassword from '@/views/ForgotPassword'
import Create from '@/views/Create'
import store from '@/store'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Cards
        },
        {
            path: '/listings/:listingKey',
            name: 'listingdetail',
            props: true,
            component: CardsDetail
        },
        {
            path: '/login',
            name: 'login',
            components: {
                default: Cards,
                modal: Login
            },
            beforeEnter: (to, from, next) => {
                if (firebase.auth().currentUser) {
                    next('/')
                    // Toast: You are already logged in
                } else {
                    next()
                    store.dispatch('clearErrors')
                }
            }
        },
        {
            path: '/register',
            name: 'register',
            components: {
                default: Cards,
                modal: Register
            },
            beforeEnter: (to, from, next) => {
                if (firebase.auth().currentUser) {
                    next('/')
                    // Toast: You are already logged in
                } else {
                    next()
                    store.dispatch('clearErrors')
                }
            }
        },
        {
            path: '/account',
            name: 'account',
            components: {
                default: Cards,
                modal: Account
            },
            beforeEnter: (to, from, next) => {
                if (firebase.auth().currentUser) {
                    next()
                    store.dispatch('clearErrors')
                } else {
                    next('/login')
                    // Toast: You are not yet logged in.
                }
            }
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            components: {
                default: Cards,
                modal: ForgotPassword
            },
            beforeEnter: (to, from, next) => {
                if (firebase.auth().currentUser) {
                    next('/')
                    // Toast: You are already logged in
                    store.dispatch('clearErrors')
                } else {
                    next()
                }
            }
        },
        {
            path: '/create',
            name: 'create',
            components: {
                default: Create
            },
            beforeEnter: (to, from, next) => {
                if (firebase.auth().currentUser) {
                    next()
                    store.dispatch('clearErrors')
                } else {
                    next('/login')
                    // Toast: You are not yet logged in.
                }
            }
        }
    ]
})
