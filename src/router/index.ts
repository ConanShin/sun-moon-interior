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
                path: 'about',
                name: 'about',
                component: require('../views/client/About.vue').default
            },
            {
                path: 'review',
                name: 'review',
                component: require('../views/client/Review.vue').default
            },
            {
                path: 'residence',
                name: 'residence',
                component: require('../views/client/Residence.vue').default
            }
        ]
    },
    {
        path: '*',
        name: 'catchAll',
        component: require('../views/Launcher.vue').default
    }
]

console.log(process.env.VUE_APP_BASE_URL)

const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    routes
})

export default router
