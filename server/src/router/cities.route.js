import express from 'express'
import cityCtrl from '../controller/cities.controller'
import isAuthenticated from '../policies/isAuthenticated'

const router = express.Router()

router.route('/')
  .get(cityCtrl.list)
  .post(isAuthenticated, cityCtrl.create)
router.route('/getLast')
  .post(isAuthenticated, cityCtrl.last)
router.route('/:id')
  .get(cityCtrl.get)
  .put(isAuthenticated, cityCtrl.update)
  .delete(isAuthenticated, cityCtrl.delete)

export default router