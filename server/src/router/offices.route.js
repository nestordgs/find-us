const express = require('express')
const officeMdl = require('../models/offices.model')
const officeCtrl = require('../controller/offices.controller')

const router = express.Router()

router.route('/')
  .get(officeCtrl.list)
  .post(officeCtrl.create)
router.route('/:id')
  .get(officeCtrl.get)
  .put(officeCtrl.update)
  .delete(officeCtrl.delete)

module.exports = router