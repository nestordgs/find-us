const express = require('express')
const categoryMdl = require('../models/categoryModels')
const categoryCtrl = require('../controller/category.controller')

const router = express.Router()

router.route('/')
  .get(categoryCtrl.list)
  .post(categoryCtrl.create)
router.route('/getLast')
  .post(categoryCtrl.last)
router.route('/getIn')
  .post(categoryCtrl.getIn)
router.route('/:id')
  .get(categoryCtrl.get)
  .put(categoryCtrl.update)
  .delete(categoryCtrl.delete)

module.exports = router
