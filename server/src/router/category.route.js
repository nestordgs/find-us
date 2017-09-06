const express = require('express');
const categoryMdl = require('../models/categoryModels');
const categoryCtrl = require('../controller/category.controller');

const router = express.Router();

router.route('/')
    .get(categoryCtrl.list)
    .post(categoryCtrl.create);

module.export = router;

