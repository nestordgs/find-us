const express = require('express')
const cityMdl = require('../models/cities.model')
const cityCtrl = require('../controller/cities.controller')
const isAuthenticated = require('../policies/isAuthenticated')

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

module.exports = router