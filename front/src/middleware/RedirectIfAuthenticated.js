import store from '@/store/store'

export default function RedirectIfAuthenticated (router) {
  /**
   * If the user is already authenticated he shouldn't be able to visit
   * pages like login, register, etc...
   */
  router.beforeEach((to, from, next) => {
    if (to.name === 'login' || to.name === 'register') {
      return next()
    }
    if (store.getters.isAuth) {
      return next()
    }
    next('/login')
  })
}
