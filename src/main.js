import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueI18n from 'vue-i18n';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { routes } from './routes';
import { i18n } from './lang/lang'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueResource);
Vue.http.options.root = 'http://172.16.2.133'


Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const router = new VueRouter({ 
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  i18n.locale = localStorage.getItem('language') || 'en'
  return next()
})

new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
