import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import {makeHash} from "@/components/common";

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
                path: 'review',
                name: 'review',
                component: require('../views/client/Review.vue').default,
                props: (route) => ({ page: route.query.page || 1 })
            },
            {
                path: 'qna',
                name: 'qna',
                component: require('../views/client/QNA.vue').default,
                props: (route) => ({ page: route.query.page || 1 })
            },
            {
                path: 'article',
                name: 'article',
                component: require('../views/client/Article.vue').default,
                props: (route) => ({
                    link: route.query.link,
                    boardNo: route.query.boardNo,
                    articleNo: route.query.articleNo,
                    from: route.query.from,
                    password: route.query.password
                })
            },
            {
                path: 'writeArticle',
                name: 'writeArticle',
                component: require('../views/client/WriteArticle.vue').default,
                props: (route) => ({ from: route.query.from, editContent: route.params.editContent })
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
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0, behavior: 'smooth' }
        }
    },
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    routes
})

// let hash: string = makeHash(5)
// router.beforeEach((to, from, next) => {
//     // @ts-ignore
//     if (to.query.hash === hash) {
//         next()
//     } else {
//         hash = makeHash(5)
//         // @ts-ignore
//         to.query.hash = hash
//         // @ts-ignore
//         next(to)
//     }
// })
export default router
