const express = require('express')
const cityMdl = require('../models/cities.model')
const cityCtrl = require('../controller/cities.controller')

const router = express.Router()

router.route('/')
  .get(cityCtrl.list)
  .post(cityCtrl.create)
router.route('/getLast')
  .post(cityCtrl.last)
router.route('/:id')
  .get(cityCtrl.get)
  .put(cityCtrl.update)
  .delete(cityCtrl.delete)

module.exports = router