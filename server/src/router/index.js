const express = require('express')
const categoryRoutes = require('../router/category.route')
const locationRoutes = require('../router/location.route')
const cityRoutes = require('../router/cities.route')
const officeRoutes = require('./offices.route')
const atmRoutes = require('./atms.route')

const AuthCtrl = require('../controller/auth.controller')
const AuthCtrlPolicy = require('../policies/auth.controller.policy')

const router = express.Router()

router.post('/register', AuthCtrlPolicy.register, AuthCtrl.register)

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

module.exports = router
