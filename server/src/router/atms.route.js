import express from 'express'
import atmCtrl from '../controller/atms.controller'
import isAuthenticated from '../policies/isAuthenticated'

const router = express.Router()

router.route('/')
  .get(atmCtrl.list)
  .post(isAuthenticated, atmCtrl.create)
router.route('/:id')
  .get(atmCtrl.get)
  .put(isAuthenticated, atmCtrl.update)
  .delete(isAuthenticated, atmCtrl.delete)

export default router
