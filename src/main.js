import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax'
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios);
import 'vuesax/dist/vuesax.css'


Vue.config.productionTip = false

Vue.use(Vuesax, {})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
