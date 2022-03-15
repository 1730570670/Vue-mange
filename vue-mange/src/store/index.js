import Vue from 'vue'; //引入Vue
import Vuex from 'vuex'; //引入Vuex
import tab from './tab'
// 将Vue全局注入
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tab,
    }
})