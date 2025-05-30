var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const dbModule = require("./models");
const sequelize = dbModule.sequelize;
const models = dbModule.models;
// use async and await to connect to the database

(async () => {
  try {
    // Test the connection to the database
    await sequelize.authenticate();
    console.log("Connection to the database successful!");

    // Sync the models
    console.log("Synchronizing the models with the database...");
    await sequelize.sync();
    console.log("Hello");
  } catch (error) {
    console.log(error);
  }
})();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error("Oops, page not found");
  err.status = 404;
  res.render("page-not-found");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.render("error", {error:err});
   
});

app.listen(9000, () => {
  console.log("The application is running on localhost:9000");
});

module.exports = app;
