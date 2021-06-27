import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax'
import axios from 'axios';
import Vuex from 'vuex'     //状态管理工具
import store from './vuex/store'  //引入vuex的状态仓库
import NProgress from 'nprogress'    //页面顶部加载条和样式
import 'vuesax/dist/vuesax.css'
import 'nprogress/nprogress.css'
import 'lib-flexible/flexible'//lib-flexible插件,移动端适配解决方案。https://github.com/amfe/article/issues/17
import directive from "./assets/util/directive";
import VueAxios from 'vue-axios';
//兼容ie
import "babel-polyfill";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const commonUtil = require('./assets/util/common')

Vue.use(VueAxios,axios);


Vue.use(Vuex)
Vue.config.productionTip = false

//main.js
const mock=true
if(mock){
  require('./mock/api')
}

Vue.use(Vuesax, {})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
