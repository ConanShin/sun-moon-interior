import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

interface Review {
    articleNumber: number
    content: string
    images: string[]
    parent: number
    title: string
    writer: string
}

const api = axios.create({
    baseURL: process.env.VUE_APP_BACKEND
})
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        reviews: [],
        reviewsFinishedLoading: false
    },
    mutations: {
        products: ((state, payload) => state.products = payload),
        reviews: ((state, payload) => {
            state.reviews = state.reviews.concat(payload.filter((article: Review) => !state.reviews.map((review: Review) => review.articleNumber).includes(article.articleNumber)))
        }),
        reviewsFinishedLoading: ((state, payload) => state.reviewsFinishedLoading = payload)
    },
    actions: {
        findProducts: async injectee => {
            const response = await api.get(`/product/scm0226`)
            injectee.commit('products', response.data.products)
        },
        findReviews: async (injectee, payload) => {
            if (injectee.state.reviewsFinishedLoading) return

            const response = await api(`/article/board/${payload.board}/page/${payload.page}`)
            if (response.data.length === 0) injectee.commit('reviewsFinishedLoading', true)
            else injectee.commit('reviews', response.data)
        }
    },
    getters: {
        products: state => state.products,
        reviews: state => state.reviews.filter((review: Review) => review.parent === null),
        reviewsFinishedLoading: state => state.reviewsFinishedLoading
    },
    modules: {}
})
