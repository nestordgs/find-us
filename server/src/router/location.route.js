const express = require('express')
const locationMdl = require('../models/location.model')
const locationCtrl = require('../controller/location.controller')
const isAuthenticated = require('../policies/isAuthenticated')

const router = express.Router()

router.route('/')
  .get(locationCtrl.list)
  .post(isAuthenticated, locationCtrl.create)
router.route('/getLast')
  .post(isAuthenticated, locationCtrl.last)
router.route('/:id')
  .get(locationCtrl.get)
  .put(isAuthenticated, locationCtrl.update)
  .delete(isAuthenticated, locationCtrl.delete)

module.exports = router
