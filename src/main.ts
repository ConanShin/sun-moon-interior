import Vue from 'vue'
// @ts-ignore
import vClickOutside from 'v-click-outside'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(vClickOutside)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
