import Vue from 'vue'

import Phone from '@/components/Phone'
import LocationMap from '@/components/LocationMap'
import DialogInfo from '@/components/DialogInfo'
import WorkingHours from '@/components/WorkingHours'
import FormCategory from '@/components/category/form'
import FormLocation from '@/components/locations/form'
import FormCities from '@/components/cities/form'
import FormOffices from '@/components/offices/form'

Vue.component('form-category', FormCategory)
Vue.component('form-location', FormLocation)
Vue.component('form-city', FormCities)
Vue.component('form-office', FormOffices)
Vue.component('dialog-info', DialogInfo)
Vue.component('working-hours', WorkingHours)
Vue.component('location-map', LocationMap)
Vue.component('phone', Phone)
