const express = require('express')
const atmMdl = require('../models/atms.model')
const atmCtrl = require('../controller/atms.controller')

const router = express.Router()

router.route('/')
	.get(atmCtrl.list)
	.post(atmCtrl.create)
router.route('/:id')
	.get(atmCtrl.get)
	.put(atmCtrl.update)
	.delete(atmCtrl.delete)

module.exports = router