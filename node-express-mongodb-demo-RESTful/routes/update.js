var express = require('express');
var router = express.Router();
var Book = require('../modules/book');

router.get('/:id', function (req, res, next) {
    Book.getBook(req.params.id, function (err, book) {
        if (err) {
          throw err;
        }

        res.render('update', { title: 'Express', book: book });
      });

  });

module.exports = router;
