import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {productToCategory} from '@/components/common'
import {makeHash} from "@/components/common";
import {categories} from "@/cafe24info";
import persistStore from "@/store/persistStore";
import createPersistedState from "vuex-persistedstate";

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
const store = new Vuex.Store({
    state: {
        products: [],
        reviews: [],
        portfolio: null,
        py: categories.portfolio['전체'],
        pageLength: 0,
        loading: false
    },
    mutations: {
        products: (state, payload) => state.products = payload,
        reviews: (state, payload) => state.reviews = payload,
        portfolio: (state, payload) => state.portfolio = payload,
        py: (state, payload) => state.py = payload,
        pageLength: (state, payload) => state.pageLength = payload,
        loading: (state, payload) => state.loading = payload
    },
    actions: {
        findArticles: async (injectee, {board, page}) => {
            return api.get(`cafe-twentyfour/article/listArticles?account=${account}&boardNo=${board}&pageNo=${page}&hash=${makeHash(5)}`)
        },
        checkPassword: (injectee, payload) => {
            return api.get(`cafe-twentyfour/article/check?account=${account}&articleNo=${payload.articleNo}&commentNo=${payload.commentNo}&password=${payload.password}&hash=${makeHash(5)}`)
        },
        findArticle: (injectee, payload) => {
            return api.get(`cafe-twentyfour/article?account=${account}&boardNo=${payload.boardNo}&articleNo=${payload.articleNo}&password=${payload.password}&hash=${makeHash(5)}`)
        },
        saveArticle: async (injectee, payload) => {
            return api.post(`cafe-twentyfour/article?account=${account}&boardNo=${payload.boardNo}&hash=${makeHash(5)}`, payload.article)
        },
        editArticle: async (injectee, payload) => {
            return api.put(`cafe-twentyfour/article?account=${account}&boardNo=${payload.boardNo}&hash=${makeHash(5)}`, payload.article)
        },
        deleteArticle: async (injectee, payload) => {
            return api.delete(`cafe-twentyfour/article?account=${account}&boardNo=${payload.boardNo}&articleNo=${payload.articleNo}&password=${payload.password}&hash=${makeHash(5)}`)
        },
        saveComment: async (injectee, payload) => {
            return api.post(`cafe-twentyfour/article/comment?account=${account}&boardNo=${payload.boardNo}&articleNo=${payload.articleNo}&hash=${makeHash(5)}`, payload.comment)
        },
        editComment: async(injectee, payload) => {
            return api.put(`cafe-twentyfour/article/comment?account=${account}&articleNo=${payload.articleNo}&hash=${makeHash(5)}`, payload.comment)
        },
        deleteComment: async (injectee, payload) => {
            return api.delete(`cafe-twentyfour/article/comment?account=${account}&articleNo=${payload.articleNo}&commentNo=${payload.commentNo}&password=${payload.password}&hash=${makeHash(5)}`)
        },
        findPortfolioList: async (injectee, category: string) => {
            injectee.commit('products', [])
            const response = await api.get(`/cafe-twentyfour/product/list?account=${account}&category=${category}&hash=${makeHash(5)}`)
            injectee.commit('products', response.data.products)
        },
        findPortfolio: async (injectee, product_no) => {
            const response = await api.get(`/cafe-twentyfour/product?account=${account}&productNo=${product_no}&hash=${makeHash(5)}`)

            const py = productToCategory(response.data.product)
            injectee.commit('py', py)
            injectee.commit('portfolio', response.data.product)
        }
    },
    getters: {
        products: state => state.products,
        reviews: state => state.reviews,
        portfolio: state => state.portfolio,
        py: state => state.py,
        pageLength: state => state.pageLength,
        loading: state => state.loading
    },
    modules: {persistStore},
    plugins: [createPersistedState({
        paths: ['persistStore'],
        storage: window.sessionStorage,
    })]
})

api.interceptors.request.use(config => {
    console.log(config.method)
    // @ts-ignore
    if (['post', 'put'].includes(config.method)) store.commit('loading', true)
    return config
}, error => {
    store.commit('loading', false)
    return Promise.reject(error)
})

api.interceptors.response.use(config => {
    store.commit('loading', false)
    return config
}, error => {
    store.commit('loading', false)
    return Promise.reject(error)
})

export default store
