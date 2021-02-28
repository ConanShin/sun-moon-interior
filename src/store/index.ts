import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const api = axios.create({
    baseURL: `http://13.124.121.110:5004/product`
})
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        findProducts: injectee => {
            const response = api.get(`/products`)
            console.log(response)
        }
    },
    modules: {}
})
