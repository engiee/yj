var express = require('express');
var router = express.Router();
var Book = require('../modules/book');

router.post('/', function (req, res, next) {
    var book = req.body;
    Book.addBook(book, function (err, book) {
        if (err) {
          throw err;
        }

        res.json(book);
      });

  });

router.get('/:id', function (req, res, next) {
    Book.getBook(req.params.id, function (err, book) {
        if (err) {
          throw err;
        }

        res.render('book', { title: 'Express', book: book });
      });

  });

router.put('/:_id', function (req, res, next) {
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function (err, book) {
        if (err) {
          throw err;
        }

        res.json(book);
      });
  });

router.delete('/:_id', function (req, res, next) {
    var id = req.params._id;
    console.log(id);
    Book.removeBook(id, function (err, book) {
        if (err) {
          throw err;
        }

        res.json(book);
      });
  });

module.exports = router;
