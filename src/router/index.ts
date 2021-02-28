import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Launcher',
        component: require('../views/Launcher.vue').default
    },
    {
        path: '/main',
        name: 'Main',
        component: require('../views/client/Wrapper.vue').default,
        children: [
            {
                path: '/',
                name: 'Home',
                component: require('../views/client/Home.vue').default
            },
            {
                path: '/about',
                name: 'About',
                component: require('../views/client/About.vue').default
            },
            {
                path: '/review',
                name: 'Review',
                component: require('../views/client/Review.vue').default
            },
            {
                path: '/residence',
                name: 'Residence',
                component: require('../views/client/Residence.vue').default
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
