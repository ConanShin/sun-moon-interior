import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const api = axios.create({
    baseURL: process.env.VUE_APP_BACKEND
})
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: []
    },
    mutations: {
        products: ((state, payload) => state.products = payload)
    },
    actions: {
        findProducts: async injectee => {
            const response = await api.get(`/product/scm0226`)
            console.log(response.data)
            injectee.commit('products', response.data.products)
        }
    },
    getters: {
        products: state => state.products
    },
    modules: {}
})
