const express = require('express')
const atmMdl = require('../models/atms.model')
const atmCtrl = require('../controller/atms.controller')
const isAuthenticated = require('../policies/isAuthenticated')

const router = express.Router()

router.route('/')
  .get(atmCtrl.list)
  .post(isAuthenticated, atmCtrl.create)
router.route('/:id')
  .get(atmCtrl.get)
  .put(isAuthenticated, atmCtrl.update)
  .delete(isAuthenticated, atmCtrl.delete)

module.exports = router