import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import '@/assets/css/app.css'

Vue.use(require('vue-moment'));
Vue.use(VeeValidate);

sync(store, router)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');