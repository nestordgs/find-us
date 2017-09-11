const express = require('express');
const locationMdl = require('../models/location.model');
const locationCtrl = require('../controller/location.controller');

const router = express.Router();

router.route('/')
    .get(locationCtrl.list)
    .post(locationCtrl.create);
router.route('/getLast')
  .post(locationCtrl.last);
router.route('/:id')
    .get(locationCtrl.get)
    .put(locationCtrl.update)
    .delete(locationCtrl.delete);

module.exports = router;