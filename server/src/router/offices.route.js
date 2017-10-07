import express from 'express'
import officeCtrl from '../controller/offices.controller'
import isAuthenticated from '../policies/isAuthenticated'

const router = express.Router()

router.route('/')
  .get(officeCtrl.list)
  .post(isAuthenticated, officeCtrl.create)
router.route('/:id')
  .get(officeCtrl.get)
  .put(isAuthenticated, officeCtrl.update)
  .delete(isAuthenticated, officeCtrl.delete)

export default router