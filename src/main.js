// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store.js'
import './bus'

import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import VeeValidate from 'vee-validate'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import currencyFilter from './filters/currency';
import VueClipboard from 'vue-clipboard2';

//Vue.use(Vuex);
Vue.use(VueAxios,axios);
Vue.use(VeeValidate);

Vue.use(VueClipboard);

VeeValidate.Validator.localize('zh_TW',zhTWValidate)
Vue.config.productionTip = false
Vue.component('Loading', Loading); //全域
Vue.filter('currency',currencyFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
