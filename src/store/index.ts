import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const api = axios.create({
    baseURL: `https://sunmooninterior1.cafe24api.com/api/v2`, headers: {
        'X-Cafe24-Client-Id': 'AmctjfglKyvErd8DWqQfBG',
        'X-Cafe24-Api-Version': '2020-12-01'
    }
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
