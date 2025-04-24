var express = require('express');
var router = express.Router();
/* GET routes */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/books');
});
router.get("/books", function (req, res, next) {
  res.render("index", { title: "update books" });
});

router.get("/books/new", function (req, res, next) {
  res.render("new-book", { title: "Books" });
});
router.get("/books/:id  ", function (req, res, next) {
  res.render("update-book", { title: "Update a book" });
});


/* POST routes */

router.post("books/new", function (req, res, next) {
  res.render("index", { title: "Books" });
});
router.post("books/:id", function (req, res, next) {
  res.render("index", { title: "Books" });
});
router.post("books/:id/delete", function (req, res, next) {
  res.render("index", { title: "Books" });
});


module.exports = router;
