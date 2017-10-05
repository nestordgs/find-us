import RedirectIfAuthenticated from './Middleware/RedirectIfAuthenticated'

export default function middleware (router) {
  RedirectIfAuthenticated(router)
}
