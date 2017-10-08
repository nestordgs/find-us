import express from 'express'
import categoryRoutes from './category.route'
import locationRoutes from './location.route'
import cityRoutes from './cities.route'
import officeRoutes from './offices.route'
import atmRoutes from './atms.route'

import AuthCtrl from '../controller/auth.controller'
import AuthCtrlPolicy from '../policies/auth.controller.policy'

const router = express.Router()

router.post('/register',
  AuthCtrlPolicy.register,
  AuthCtrl.register)
router.post('/login',
  AuthCtrl.login)

router.route('/test')
  .post((req, res) => {
    res.send({
      message: 'this is from test method post'
    })
  })
  .get((req, res) => {
    res.send({
      message: 'this is from test method get'
    })
  })

router.use('/category', categoryRoutes)
router.use('/location', locationRoutes)
router.use('/city', cityRoutes)
router.use('/office', officeRoutes)
router.use('/atm', atmRoutes)

export default router
