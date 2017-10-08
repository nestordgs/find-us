import express from 'express'
import categoryCtrl from '../controller/category.controller'
import isAuthenticated from '../policies/isAuthenticated'

const router = express.Router()

router.route('/')
  .get(categoryCtrl.list)
  .post(isAuthenticated, categoryCtrl.create)
router.route('/getLast')
  .post(isAuthenticated, categoryCtrl.last)
router.route('/getIn')
  .post(isAuthenticated, categoryCtrl.getIn)
router.route('/:id')
  .get(categoryCtrl.get)
  .put(isAuthenticated, categoryCtrl.update)
  .delete(isAuthenticated, categoryCtrl.delete)

export default router
