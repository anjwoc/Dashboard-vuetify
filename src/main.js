import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import VueSocketIo from 'vue-socket.io';
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'

sync(store, router)

Vue.use(new VueSocketIo({
  debug: true,
  connection: 'http://localhost:3085'
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
