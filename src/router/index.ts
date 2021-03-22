import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
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
                path: 'about',
                name: 'about',
                component: require('../views/client/About.vue').default
            },
            {
                path: 'portfolio',
                name: 'portfolio',
                component: require('../views/client/Portfolio.vue').default,
                props: (route) => ({ product_no: route.query.product_no })
            },
            {
                path: 'contact',
                name: 'contact',
                component: require('../views/client/Contact.vue').default
            },
            {
                path: 'qna',
                name: 'qna',
                component: require('../views/client/QNA.vue').default
            },
            {
                path: 'writeQna',
                name: 'writeQna',
                component: require('../views/client/WriteQNA.vue').default
            },
            {
                path: 'reviews',
                name: 'reviews',
                component: require('../views/client/Reviews_Table.vue').default,
                props: (route) => ({ page: route.query.page || 1 })
            },
            {
                path: 'review',
                name: 'review',
                component: require('../views/client/Review.vue').default,
                props: (route) => ({ link: route.query.link })
            },
            {
                path: 'writeReview',
                name: 'writeReview',
                component: require('../views/client/WriteReview.vue').default,
                props: true
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
