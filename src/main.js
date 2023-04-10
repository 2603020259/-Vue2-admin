import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index';
import store from './store/index';
import './mock/index';
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router:router,
  store:store,
  render: h => h(App),
  created(){
    store.commit('asideAbout/ADDMENU',router);
  }
}).$mount('#app')
