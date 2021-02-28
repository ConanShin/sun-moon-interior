// @ts-ignore
import VueImageLoader from '@kevindesousa/vue-image-loader'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueImageLoader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
