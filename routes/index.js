var express = require("express");
var router = express.Router();
const Book = require("../models").Book;

/* GET routes */
/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/books");
});

router.get("/books", function (req, res, next) {
  let allBooks = Book.findAll();
  if (allBooks) {
    allBooks
      .then((books) => {
        res.render("index", { title: "Books  List", books: books });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  } else {
    res.send(400);
  }
});

router.get("/books/new", function (req, res, next) {
  res.render("new-book", { title: "Books" });
});
router.get("/books/:id", function (req, res, next) {
  let book = Book.findByPk(req.params.id);
  if (book)
    book.then((bookInfo) => {
      if (bookInfo) {
        res.render("update-book", { title: "Update a book", book: bookInfo });
      } else {
        let err = new Error("Oops No Book found");
        err.status = 404;
        res.render("page-not-found", { error: err });
      }
    });
});

/* POST routes */

router.post("/books/new", function (req, res, next) {
  Book.create(req.body)
    .then((err) => {
      res.redirect("/");
    })
    .catch((err) => {
      if (err.name === "SequelizeValidationError") {
        res.render('new-book', {error:err});
      } else {
        next(err);
      }
    });
});

router.post("/books/:id", function (req, res, next) {
  Book.findByPk(req.params.id)
    .then((updatedBook) => {
      if (updatedBook) {
        updatedBook.update(req.body).then(
         res.redirect("/"))
      }
      else{
        let err=new Error('No book found to update');
        err.status=404;
        throw err;
      }
    }).
    catch((err) => {
      if (err.name === "SequelizeValidationError") {
        res.render('update-book', {book: updatedBook,error:err});
      } else {
        next(err);
      }
    });
 
});

router.post("/books/:id/delete", function (req, res, next) {
  Book.findByPk(req.params.id)
    .then((deletedBook) => {
      if (deletedBook) {
        deletedBook.destroy();
        res.redirect("/");
      }
      else{
        let err=new Error('No book to delete');
        err.status=404;
        throw err;
        

}
    })
    
});

module.exports = router;
