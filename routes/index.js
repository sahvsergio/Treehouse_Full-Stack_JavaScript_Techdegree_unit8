var express = require('express');
var router = express.Router();
/* GET routes */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Books' });
});
router.get("/books", function (req, res, next) {
  res.render("index", { title: "Books" });
});

router.get("/books/new", function (req, res, next) {
  res.render("index", { title: "Books" });
});
router.get("/books/:id  ", function (req, res, next) {
  res.render("update-book", { title: "Update a book" });
});


/* GET routes */

router.post("books/new", function (req, res, next) {
  res.render("index", { title: "Books" });
});




module.exports = router;
