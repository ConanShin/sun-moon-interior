import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {productToPy} from '@/components/common'

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

const account = process.env.VUE_APP_ACCOUNT
const domain = process.env.VUE_APP_DOMAIN
export default new Vuex.Store({
    state: {
        coverHidden: false,
        products: [],
        reviews: [],
        portfolio: null,
        py: '20py',
        pageLength: 0
    },
    mutations: {
        coverHidden: (state, payload) => state.coverHidden = payload,
        products: (state, payload) => state.products = payload,
        reviews: (state, payload) => state.reviews = payload,
        portfolio: (state, payload) => state.portfolio = payload,
        py: (state, payload) => state.py = payload,
        pageLength: (state, payload) => state.pageLength = payload
    },
    actions: {
        findArticles: async (injectee, {board, page}) => {
            return api.get(`cafe-twentyfour/article?domain=${domain}&boardNo=${board}&pageNo=${page}`)
        },
        findArticle: (injectee, payload) => {
            return api.post(`cafe-twentyfour/article/link`, {url: payload.link})
        },
        saveArticle: async (injectee, payload) => {
            return api.post(`cafe-twentyfour/article?account=${account}&boardNo=${payload.boardNo}`, payload.article)
        },
        editArticle: async (injectee, payload) => {
            return api.put(`cafe-twentyfour/article?account=${account}&boardNo=${payload.boardNo}`, payload.article)
        },
        findPortfolioList: async (injectee, category: string) => {
            const response = await api.get(`/cafe-twentyfour/product/list?account=${account}&category=${category}`)
            injectee.commit('products', response.data.products)
        },
        findPortfolio: async (injectee, product_no) => {
            const response = await api.get(`/cafe-twentyfour/product?account=${account}&productNo=${product_no}`)

            const py = productToPy(response.data.product)
            injectee.commit('py', py)
            injectee.commit('portfolio', response.data.product)
        }
    },
    getters: {
        coverHidden: state => state.coverHidden,
        products: state => state.products,
        reviews: state => state.reviews,
        portfolio: state => state.portfolio,
        py: state => state.py,
        pageLength: state => state.pageLength
    },
    modules: {}
})
