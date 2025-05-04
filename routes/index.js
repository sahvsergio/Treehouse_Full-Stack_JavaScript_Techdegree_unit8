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
  if (allBooks){
  allBooks
    .then((books) => {
      res.render("index", { title: "Books  List", books: books });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
}else{

  res.send(400);
}});

router.get("/books/new", function (req, res, next) {
  res.render("new-book", { title: "Books" });
});
router.get("/books/:id", function (req, res, next) {
  let book =Book.findByPk(req.params.id);
  if (book)
  book.then((bookInfo)=>{
    if(bookInfo){
    res.render("update-book", { title: "Update a book" , book:bookInfo});
    }
    else{
      res.status(404).render("error")
    }
    



  });

  
});

/* POST routes */

router.post("/books/new", function (req, res, next) {
 
  Book.create(
    req.body
  ).then((err)=>{
    res.redirect("/");
  }).catch((err)=>{

    if (err.name==="SequelizeValidationError"){
      console.log('there was a validation error ');
       res.render("form-error", {error:err});

    }
    else{

      throw err;

    }
  }



  ).catch((err)=>{

   
  });
  


});
router.post("/books/:id", function (req, res, next) {

  res.render("update", { title: "Books" });
});


router.post("/books/:id/delete", function (req, res, next) {
  Book.findByPk(req.params.id)
  .then((deletedBook=>{if (deletedBook){
    deletedBook.destroy();
    res.redirect("/");
  }
  })).catch();


  
});

module.exports = router;
