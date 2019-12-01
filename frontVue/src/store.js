import Vuex from 'vuex';
import Vue from 'vue';
import Persistancer from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [Persistancer()],
    state: {
      count: 0
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })