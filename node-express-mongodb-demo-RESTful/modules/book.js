var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
    genres: {
        type: String,
        required: true,
      },
    description: {
        type: String,
      },
    author: {
        type: String,
        required: true,
      },
    publisher: {
        type: String,
      },
    pages: {
        type: String,
      },
    image_url: {
        type: String,
      },
    price: {
        type: String,
      },
    create_time: {
        type: Date,
        default: Date.now,
      },
  });
var Book = module.exports = mongoose.model('Book', bookSchema);

// get Books
module.exports.getBooks = function (callback, limit) {
    Book.find(callback).limit(limit);
  };

// get book
module.exports.getBook = function (id, callback) {
    Book.findById(id, callback);
  };

// add book
module.exports.addBook = function (book, callback) {
    Book.create(book, callback);
  };

// update book
module.exports.updateBook = function (id, book, options, callback) {
    var query = { _id: id };
    var update = {
        title: book.title,
        genres: book.genres,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        pages: book.pages,
        image_url: book.image_url,
        price: book.price,
      };
    Book.findOneAndUpdate(query, update, options, callback);
  };

module.exports.removeBook = function (id, callback) {
    var query = { _id: id };
    Book.remove(query, callback);
  };
