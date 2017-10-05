const express = require('express')
const categoryMdl = require('../models/categoryModels')
const categoryCtrl = require('../controller/category.controller')
const isAuthenticated = require('../policies/isAuthenticated')

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

module.exports = router
