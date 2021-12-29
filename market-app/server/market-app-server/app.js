var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//////////api
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var products = [
  {
    id: 1,
    name: "Milo 250",
    description: "Beverage drink",
    imageUrl: "./src/assets/milo.jpg",
    stores: [
      { id: 1, name: "Store 1", quantity: 1, price: 10.0 },
      { id: 2, name: "Store 2", quantity: 8, price: 100.0 },
      { id: 4, name: "Store 4", quantity: 91, price: 1000.0 },
    ],
  },
  {
    id: 2,
    name: "Pineapple",
    description: "Fresh fruit drink with all the fibers.",
    imageUrl: "./src/assets/pineapple.jpg",
    stores: [
      { id: 1, name: "Store 1", quantity: 2, price: 10.0 },
      { id: 2, name: "Store 2", quantity: 2.5, price: 10.0 },
    ],
  },
  {
    id: 3,
    name: "Plate",
    description: "Ceramic flat plate for serving food",
    imageUrl: "./src/assets/plate.jpg",
    stores: [
      { id: 1, name: "Store 1", quantity: 1, price: 10.0 },
      { id: 2, name: "Store 2", quantity: 2, price: 10.0 },
      { id: 3, name: "Store 3", quantity: 4, price: 10.0 },
    ],
  },
];

app.get("/api/products", (req, res) => {
  res.send(products);
});
//////////

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
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
