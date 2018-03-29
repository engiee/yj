var express = require('express');
var router = express.Router();
var Book = require('../modules/book');

router.get('/', function (req, res, next) {
    res.render('add');
  });

module.exports = router;
