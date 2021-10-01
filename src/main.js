import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax'
import axios from 'axios';
import VueAMap from 'vue-amap';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)//全局使用ElementUI
import Vuex from 'vuex'     //状态管理工具
import store from './vuex/store'  //引入vuex的状态仓库
import NProgress from 'nprogress'    //页面顶部加载条和样式
import 'vuesax/dist/vuesax.css'
import 'nprogress/nprogress.css'
import 'lib-flexible/flexible'
//lib-flexible插件,移动端适配解决方案。https://github.com/amfe/article/issues/17
import directive from "./assets/util/directive";
import VueAxios from 'vue-axios';
import "@/assets/scss/main.scss"
//兼容ie
import "babel-polyfill";

import 'element-ui/lib/theme-chalk/index.css'
const commonUtil = require('./assets/util/common')
const baseConfig = require('./assets/util/baseConfig')
import constantsMap from './assets/util/constant'   //项目内使用到的常量
import vueUtil from './assets/util/vue-util'   //项目内使用到的常量
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

let baseURL = ''
if (process.env.NODE_ENV === 'development') {      //这里配置项目开发和上线后的baseURL
  baseURL = '/api'
} else {
  baseURL = 'http://203.195.156.57:3000/api'
}
Vue.use(directive)
Vue.use(VueAxios,axios);
Vue.use(mavonEditor)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(VueAMap);
//main.js
const mock=true
if(mock){
  require('./mock/api')
}
VueAMap.initAMapApiLoader({
  key: '70d0e910c9b68f064145ea2c2fad7c13',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType','Geolocation','AMap.PathSimplifier','AMap.SimpleInfoWindow'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11' // 版本号 为了能够使用高德地图的ui
});

Vue.directive('loadmore', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function() {
      let sign = 0
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
})

Vue.use(Vuesax, {})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
