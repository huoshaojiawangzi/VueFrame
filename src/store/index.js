import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import cameraRecord from '@/store/modules/cameraRecord.js';

export default new vuex.Store({
    state:{
        loading:false
    },
    mutations: {
       showLoading(state){
           state.loading = true
       },
       hideLoading (state) {
           state.loading = false
       }
    },
    modules: {
       cameraRecord
   }
})
