import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    // {
    //     path: '/',
    //     name: 'launcher',
    //     component: require('../views/Launcher.vue').default
    // },
    {
        path: '/',
        component: require('../views/client/Wrapper.vue').default,
        children: [
            {
                path: '',
                name: 'home',
                component: require('../views/client/Home.vue').default
            },
            {
                path: 'introduction',
                name: 'introduction',
                component: require('../views/client/Introduction.vue').default
            },
            {
                path: encodeURIComponent('포트폴리오'),
                name: encodeURIComponent('포트폴리오'),
                component: require('../views/client/Portfolio.vue').default,
                props: (route) => ({ product_no: route.query.product_no })
            },
            {
                path: 'reviews',
                name: 'reviews',
                component: require('../views/client/Reviews_Table.vue').default,
                props: (route) => ({ page: route.query.page || 1 })
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
                props: (route) => ({ link: route.query.link })
            },
            {
                path: 'write-review',
                name: 'writeReview',
                component: require('../views/client/WriterReview.vue').default
            }
        ]
    },
    {
        path: '*',
        name: 'catchAll',
        redirect: '/'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    routes
})

export default router
