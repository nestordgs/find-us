// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueGoodTable from 'vue-good-table'
import App from './App'
import router from './router'
import {Snotify} from 'vue-snotify'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueGoodTable)
Vue.use(Snotify)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDx9kGiK6ksyeZQEWFBn_-HbSR-60eGZlU',
    libraries: 'places',
    installComponents: false
    // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
