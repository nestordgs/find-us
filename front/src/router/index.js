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

// Forms Components
import FormCategory from '@/components/category/form'
import FormLocation from '@/components/locations/form'

// Common Components
import CategoryName from '@/components/categoryNames'

Vue.use(Router)

Vue.component('form-category', FormCategory)
Vue.component('form-location', FormLocation)
Vue.component('name-category', CategoryName)

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
    }
  ]
})
