import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from '@/components/Register'
// Category Components
import Categorias from '@/components/category/list'
import CategoriasEdit from '@/components/category/edit'
import CategoriasAdd from '@/components/category/create'
// Forms Components
import FormCategory from '@/components/category/form'
import CategoryName from '@/components/categoryNames'

Vue.use(Router)

Vue.component('form-category', FormCategory)
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
    }
  ]
})
