import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {keepAlive: true},
            component: () => import('./views/Home.vue'),
            // redirect: '/home/PageList',
            children: [
                {
                    path: '/home/PageList',
                    name: 'PageList',
                    meta: {keepAlive: true},
                    component: () => import('./views/PageList.vue'),
                },

                {
                    path:'/PageDetail',
                    name:'PageDetail',
                    meta: {keepAlive: true},
                    component: ()=> import('./views/PageDetail.vue'),
                },

                {
                    path:'/home/Project',
                    name:'Project',
                    meta: {keepAlive: true},
                    component: ()=> import('./views/Project.vue'),
                },
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
            path: '/YingHomePage',
            name: 'HomePage',
            component: () => import('./views/BirthdayWishes/HomePage.vue'),
        },
        {
            path: '/Ying',
            name: 'Ying',
            component: () => import('./views/BirthdayWishes/CoverPage.vue'),
        },
        {
            path: '/PlayTest',
            name: 'PlayTest',
            component: () => import('./views/PlayTest.vue'),
        },
        {
            path: '/Resume',
            name: 'Resume',
            component: () => import('./views/Resume.vue'),
        },
        {
            path: '/MyTask',
            name: 'MyTask',
            component: () => import('./views/Finance/MyTask.vue'),
        },
        {
            path: '/NewTrip',
            name: 'NewTrip',
            component: () => import('@/views/NewTrip/NewTrip.vue'),
            children: [
                {
                    path: '/NewTripSurvey',
                    meta: {keepAlive: true},
                    component: () => import('@/views/NewTrip/NewTripSurvey.vue'),
                },

                {
                    path: '/NewTripArrange',
                    meta: {keepAlive: true},
                    component: () => import('@/views/NewTrip/NewTripArrange.vue'),
                },

                {
                    path: '/NewTripHotel',
                    meta: {keepAlive: true},
                    component: () => import('./views/NewTrip/NewTripHotel.vue'),
                },
            ],
        },
        {
            path: '/Login',
            name: 'Login',
            component: () => import('./views/Login.vue'),
        },
        {
            path: '/EditView',
            name: 'EditView',
            meta: {keepAlive: true},
            component: () => import('./views/EditView.vue'),
            // redirect: '/home/PageList',
            children: [
                {
                    path: '/PageEdit',
                    name: 'PageEdit',
                    meta: {keepAlive: true},
                    component: () => import('./views/PageEdit.vue'),
                },

                {
                    path:'/ProjectEdit',
                    name:'ProjectEdit',
                    meta: {keepAlive: true},
                    component: ()=> import('./views/ProjectEdit.vue'),
                },

                {
                    path: '/HomePageEdit',
                    name: 'HomePageEdit',
                    meta: {keepAlive: true},
                    component: () => import('./views/HomePageEdit.vue'),
                },
                {
                    path: '/ResumeEdit',
                    name: 'ResumeEdit',
                    meta: {keepAlive: true},
                    component: () => import('./views/ResumeEdit.vue'),
                },
            ]
        },

    ],

    // scrollBehavior (to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         if (from.meta.keepAlive) {
    //             from.meta.savedPosition = document.body.scrollTop
    //         }
    //         return { x: 0, y: to.meta.savedPosition || 0 }
    //     }
    // }
})
