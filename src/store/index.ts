import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const api = axios.create({
    baseURL: `https://sun-moon-interior-server.azurewebsites.net`
})
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        findProducts: injectee => {
            const response = api.get(`/product`)
            console.log(response)
        }
    },
    modules: {}
})
