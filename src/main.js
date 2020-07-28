// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
//引入vuex
import store from './store/index'
// 引入axios
import axios from 'axios'  
// 挂载到vue原型链上
import qs from 'qs'
import '@/assets/main.css'
Vue.prototype.$axios = axios 
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
  router.beforeEach((to, from, next) => {
    // if (to.path === '/login') {
    //   next();
    // } else {
      
      let token = localStorage.getItem('Authorization');
      if(to.meta.requireAuth){
        if (!token) {
          next('/');
          // alert("账号或密码错误main.js");
          alert("token失效")
        }else{
          next();
        }
      }
      else {
        next();
      }
    // }
  });

  
  