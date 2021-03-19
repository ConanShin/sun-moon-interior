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
        portfolio: null,
        py: 20,
        pageLength: 0
    },
    mutations: {
        products: ((state, payload) => state.products = payload),
        reviews: ((state, payload) => state.reviews = payload),
        portfolio: (state, payload) => state.portfolio = payload,
        py: (state, payload) => state.py = payload,
        pageLength: (state, payload) => state.pageLength = payload
    },
    actions: {
        findProducts: async injectee => {
            const response = await api.get(`/product`)
            injectee.commit('products', response.data.products)
        },
        findReviews: async (injectee, payload) => {
            const response = await api.get(`/article/board/${payload.board}/page/${payload.page}`)
            injectee.commit('reviews', response.data.articles)
            injectee.commit('pageLength', response.data.pageLength)
        },
        findReview: (injectee, payload) => {
            // const NOT_ACCEPTABLE_QUERY_CHARACTERS = [',']
            // let queryString = payload.subject
            // NOT_ACCEPTABLE_QUERY_CHARACTERS.forEach(character => {
            //     if (payload.subject.includes(character)) return queryString = queryString.split(character)[0]
            // })
            // return api.get(`/article/board/${payload.board}/article/${payload.articleNumber}?subject=${queryString}`)
            return api.post(`/article/link`, {url: payload.link})
        },
        saveReview: async (injectee, payload) => {
            await api.post(`/article/board/5`, payload)
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
        py: state => state.py,
        pageLength: state => state.pageLength
    },
    modules: {}
})
