require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require("fs");
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session-jwt');
var passport = require("passport");
require('./database/db'); // initiating connection with mongodb
const public_key = fs.readFileSync("./cert/public-key.pem");
const private_key = fs.readFileSync("./cert/private-key.pem");

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/auth/register');
var loginRouter = require('./routes/auth/login');
var logoutRouter = require('./routes/auth/logout');

// products routes
var allProduct = require('./routes/products/all_product');
var createProduct = require('./routes/products/create_product');
var deleteProduct = require('./routes/products/delete_product');
var editProduct = require('./routes/products/edit_product');
var fetchProduct = require('./routes/products/fetch_product');
var someProduct = require('./routes/products/some_product');
var userProduct = require('./routes/products/user_products');

// users routes
var editUser = require('./routes/user/edit_user');
var fetchUser = require('./routes/user/fetch_user');

// common apis
var upload = require('./routes/common/upload');

// cart
var addToCart = require("./routes/cart/add_to_cart");
var clearCart = require("./routes/cart/clear_cart");
var fetchCart = require("./routes/cart/fetch_cart");
var removeCart = require("./routes/cart/remove_cart");
var countCart = require("./routes/cart/count");

// middleware
var auth = require("./middleware/auth");

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

// app.options(cors())
// app.options("*", (req, res, next) => {
//   // res.header('Access-Control-Allow-Origin', '*');
//   // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   // res.header('Access-Control-Allow-Credentials', true);
//   // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
//   req.method = "POST";
//   return next();
// });

// app.set('trust proxy', 1); // trust first proxy
// adding session middleware in express app
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 60, // 60 hr
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
  keys: {
    public: public_key.toString(),
    private: private_key.toString(),
  },
  path: "/"
}));
app.use(passport.authenticate('session'));
app.use(auth);

app.use('/api', registerRouter);
app.use('/api', loginRouter);
app.use('/api', logoutRouter);
app.use('/api', createProduct);
app.use('/api', allProduct);
app.use('/api', editProduct);
app.use('/api', fetchProduct);
app.use('/api', deleteProduct);
app.use('/api', editUser);
app.use('/api', fetchUser);
app.use('/api', upload);
app.use('/api', someProduct);
app.use('/api', userProduct);
app.use('/api', addToCart);
app.use('/api', clearCart);
app.use('/api', fetchCart);
app.use('/api', removeCart);
app.use('/api', countCart);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  app.set('trust proxy', 1); // trust first proxy
  req.session.cookie.secure = true; // serve secure cookies

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
