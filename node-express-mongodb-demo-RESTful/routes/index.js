var express = require('express');
var router = express.Router();
var Book = require('../modules/book');

/* GET home page. */
router.get('/', function (req, res, next) {
    Book.getBooks(function (err, books) {
        if (err) {
          throw err;
        }

        res.render('index', { title: 'Express', data: books });
      });

  });

router.post('/', function (req, res, next) {

    var book = req.body;
    Book.addBook(book, function (err, book) {
        if (err) {
          throw err;
        }

        res.render('book', { title: 'Express', book: book });
      });

  });

module.exports = router;
