import express from 'express'
import locationCtrl from '../controller/location.controller'
import isAuthenticated from '../policies/isAuthenticated'

const router = express.Router()

router.route('/')
  .get(locationCtrl.list)
  .post(isAuthenticated, locationCtrl.create)
router.route('/getLast')
  .post(isAuthenticated, locationCtrl.last)
router.route('/cat/:id')
  .get(locationCtrl.byCat)
router.route('/:id')
  .get(locationCtrl.get)
  .put(isAuthenticated, locationCtrl.update)
  .delete(isAuthenticated, locationCtrl.delete)

export default router
