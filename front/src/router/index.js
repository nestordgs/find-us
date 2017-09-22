import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from '@/components/Register'
// Category Components
import Categorias from '@/components/category/list'
import CategoriasEdit from '@/components/category/edit'
import CategoriasAdd from '@/components/category/create'
// Locations Components
import Ubicaciones from '@/components/locations/list'
import UbicacionesEdit from '@/components/locations/edit'
import UbicacionesAdd from '@/components/locations/create'
// Cities Components
import Ciudades from '@/components/cities/list'
import CiudadesAdd from '@/components/cities/create'
import CiudadesEdit from '@/components/cities/edit'
// Offices Components
import Oficinas from '@/components/offices/list'
import OficinasAdd from '@/components/offices/create'
// Forms Components
import FormCategory from '@/components/category/form'
import FormLocation from '@/components/locations/form'
import FormCities from '@/components/cities/form'
import FormOffices from '@/components/offices/form'

// Common Components
import DialogInfo from '@/components/dialog.info'
import WorkingHours from '@/components/workingHours'

Vue.use(Router)

Vue.component('form-category', FormCategory)
Vue.component('form-location', FormLocation)
Vue.component('form-city', FormCities)
Vue.component('form-office', FormOffices)
Vue.component('dialog-info', DialogInfo)
Vue.component('working-hours', WorkingHours)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/categorias',
      name: 'Categorias',
      component: Categorias
    },
    {
      path: '/categorias/:id',
      name: 'CategoriasEdit',
      component: CategoriasEdit
    },
    {
      path: '/categorias/add',
      name: 'CategoriaAdd',
      component: CategoriasAdd
    },
    {
      path: '/ubicaciones',
      name: 'Ubicaciones',
      component: Ubicaciones
    },
    {
      path: '/ubicaciones/:id',
      name: 'UbicacionesEdit',
      component: UbicacionesEdit
    },
    {
      path: '/ubicaciones/add',
      name: 'UbicacionesAdd',
      component: UbicacionesAdd
    },
    {
      path: '/ciudades/',
      name: 'Ciudades',
      component: Ciudades
    },
    {
      path: '/ciudades/add',
      name: 'CiudadesAdd',
      component: CiudadesAdd
    },
    {
      path: '/ciudades/:id',
      name: 'CiudadesEdit',
      component: CiudadesEdit
    },
    {
      path: '/oficinas/',
      name: 'Oficinas',
      component: Oficinas
    },
    {
      path: '/oficinas/add',
      name: 'OficinasAdd',
      component: OficinasAdd
    }
  ]
})
