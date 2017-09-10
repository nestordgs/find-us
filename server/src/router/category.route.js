const express = require('express');
const categoryMdl = require('../models/categoryModels');
const categoryCtrl = require('../controller/category.controller');

const router = express.Router();

router.route('/')
  .get(categoryCtrl.list)
  .post(categoryCtrl.create);
router.route('/:id')
  .get(categoryCtrl.get)
  .put(categoryCtrl.update)
  .delete(categoryCtrl.delete);
router.route('/getLast')
  .get(categoryCtrl.last);
router.route('/getIn')
  .post(categoryCtrl.getIn);

module.exports = router;

