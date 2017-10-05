const express = require('express')
const officeMdl = require('../models/offices.model')
const officeCtrl = require('../controller/offices.controller')
const isAuthenticated = require('../policies/isAuthenticated')

const router = express.Router()

router.route('/')
  .get(officeCtrl.list)
  .post(isAuthenticated, officeCtrl.create)
router.route('/:id')
  .get(officeCtrl.get)
  .put(isAuthenticated, officeCtrl.update)
  .delete(isAuthenticated, officeCtrl.delete)

module.exports = router