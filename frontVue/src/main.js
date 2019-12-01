

import Vue from 'vue';
import App from './App.vue';
import router from './router'; //追加
import vuetify from './plugins/vuetify';
// import VueKonva from 'vue-konva';
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";
import store from './store.js';



Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    axios,
    store,
    render: h => h(App),

}).$mount('#app')