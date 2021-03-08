import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'launcher',
        component: require('../views/Launcher.vue').default
    },
    {
        path: '',
        component: require('../views/client/Wrapper.vue').default,
        children: [
            {
                path: 'home',
                name: 'home',
                component: require('../views/client/Home.vue').default
            },
            {
                path: 'portfolio',
                name: 'portfolio',
                component: require('../views/client/Portfolio.vue').default,
                props: (route) => ({ productId: route.query.productId })
            },
            {
                path: 'reviews',
                name: 'reviews',
                component: require('../views/client/Reviews.vue').default
            },
            {
                path: 'location',
                name: 'location',
                component: require('../views/client/Location.vue').default
            },
            {
                path: 'review',
                name: 'review',
                component: require('../views/client/Review.vue').default,
                props: (route) => ({ articleNumber: route.query.articleNumber, writer: route.query.writer })
            }
        ]
    },
    {
        path: '*',
        name: 'catchAll',
        component: require('../views/Launcher.vue').default
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    routes
})

export default router
