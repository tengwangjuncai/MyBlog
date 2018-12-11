import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue'),
            redirect: '/home/PageList',
            children: [
                {
                    path: '/home/PageList',
                    name: 'PageList',
                    component: () => import('./views/PageList.vue'),
                },

                {
                    path:'/home/PageDetail',
                    name:'PageDetail',
                    component: ()=> import('./views/PageDetail.vue'),
                }
            ]

        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/',
            name: 'PageList',
            component: () => import('./views/PageList.vue'),
        },
        {
            path: '/Resume',
            name: 'Resume',
            component: () => import('./views/Resume.vue'),
        },
    ]
})
