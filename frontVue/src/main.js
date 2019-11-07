

import Vue from 'vue';
import App from './App.vue';
import router from './router'; //追加
import vuetify from './plugins/vuetify';
// import VueKonva from 'vue-konva';
import axios from 'axios';


// Vue.use(VueKonva);

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    axios,
    render: h => h(App),
}).$mount('#app')