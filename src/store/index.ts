import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {titleToPy} from '@/components/common'

interface Review {
    article_no: number
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
        // reviewsFinishedLoading: false,
        portfolio: null,
        py: 20
    },
    mutations: {
        products: ((state, payload) => state.products = payload),
        reviews: ((state, payload) => {
            // state.reviews = state.reviews.concat(payload.filter((article: Review) => !state.reviews.map((review: Review) => review.article_no).includes(article.article_no)))
            state.reviews = payload
        }),
        // reviewsFinishedLoading: ((state, payload) => state.reviewsFinishedLoading = payload),
        portfolio: (state, payload) => state.portfolio = payload,
        py: (state, payload) => state.py = payload
    },
    actions: {
        findProducts: async injectee => {
            const response = await api.get(`/product`)
            injectee.commit('products', response.data.products)
        },
        findReviews: async (injectee, payload) => {
            // if (injectee.state.reviewsFinishedLoading) return

            const response = await api(`/article/board/${payload.board}/page/${payload.page}`)
            // if (response.data.articles.length === 0) injectee.commit('reviewsFinishedLoading', true)
            const length = response.data.articles.length
            if (length > 0) injectee.commit('reviews', response.data.articles)
            return response.data.articles.length
        },
        findReview: (injectee, payload) => {
            return api(`/article/board/${payload.board}/article/${payload.articleNumber}?subject=${payload.subject}`)
        },
        findPortfolioList: async (injectee, payload) => {
            const response = await api(`/product/py?py=${payload}`)
            injectee.commit('py', payload)
            injectee.commit('products', response.data)
        },
        findPortfolio: async (injectee, payload) => {
            const response = await api(`/product/${payload}`)

            const py = titleToPy(response.data.product.product_name)
            injectee.commit('py', py)
            injectee.commit('portfolio', response.data.product)
        }
    },
    getters: {
        products: state => state.products,
        reviews: state => state.reviews,
        // reviewsFinishedLoading: state => state.reviewsFinishedLoading,
        portfolio: state => state.portfolio,
        py: state => state.py
    },
    modules: {}
})
