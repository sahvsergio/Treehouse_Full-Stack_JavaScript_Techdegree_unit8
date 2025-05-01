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

  allBooks
    .then((books) => {
      res.render("index", { title: "Books  List", books: books });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.get("/books/new", function (req, res, next) {
  res.render("new-book", { title: "Books" });
});
router.get("/books/:id", function (req, res, next) {
  let book =Book.findByPk(req.params.id);
  book.then((bookInfo)=>{
    res.render("update-book", { title: "Update a book" , book:bookInfo});
    



  });

  
});

/* POST routes */

router.post("/books/new", function (req, res, next) {
  let bookTitle = req.body.title;
  let bookAuthor = req.body.year;
  let bookGenre = req.body.genre;
  let bookYear = req.body.year;
  Book.create({
    title: bookTitle,
    author: bookAuthor,
    genre: bookGenre,
    year: bookYear,
  });
  res.redirect("/");
});
router.post("/books/:id", function (req, res, next) {
  res.render("index", { title: "Books" });
});
router.post("/books/:id/delete", function (req, res, next) {
  Book.findByPk(req.params.id)
  .then((deletedBook=>{
    deletedBook.destroy();
    res.redirect("/");
  }));


  
});

module.exports = router;
