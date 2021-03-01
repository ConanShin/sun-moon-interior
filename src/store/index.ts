import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const api = axios.create({
    baseURL: `https://sun-moon-interior-server.azurewebsites.net`
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
            const response = await api.get(`/product`)
            console.log(response.data)
            injectee.commit('products', response.data)
        }
    },
    getters: {
        products: state => state.products
    },
    modules: {}
})
