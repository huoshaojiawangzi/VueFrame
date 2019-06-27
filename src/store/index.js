import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import tab from './modules/tab.js';
import currentUser from './modules/currentUser.js';
import common from './modules/common.js';
import global from './modules/global';


export default new vuex.Store({
  modules: {
    tab,
    currentUser,
    common,
    global
  }
})
