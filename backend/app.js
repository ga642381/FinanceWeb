const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');






/* ====== create a new app ====== */
//create a new app by calling express()
const app = express();


/* ====== view engine setup ====== */
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* ===== cors =====*/
const cors = require("cors");
app.use(cors());


app.use(logger('dev'));

// POST JSON -> request.body

//query string data in the URL(e.g. /profile?id=5) -> request.query

//client -> request.cookies ; allow modification : by changing response.cookies

// This middleware serves static assets from your public folder.
// .../backend/public :放靜態檔案
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "../client/build")))


/* ===== Express Session =====*/
const session = require('express-session')
// Show messages after redirect
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
/* ===== Passport Middleware =====*/
const passport = require('passport');
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

/* ===== Connect flash =====*/
const flash = require('connect-flash');
app.use(flash());


//Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

/* ====== DB config ====== */
const mongoose = require('mongoose');
const db = require('./config/keys').mongoTaiwanStock;
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

/* ====== routes ====== */

// routes:
const metasRouter = require('./routes/api/metas')
const crawledlogRouter = require('./routes/api/crawledlog');
const authRouter = require('./routes/auth/auth');

//attached to our app
app.use('/api/crawledlog', crawledlogRouter);
app.use('/api/metas', metasRouter)
app.use('/auth', authRouter)

//https://tylermcginnis.com/react-router-cannot-get-url-refresh/
//fix the problem of refreshing page ( getting the subpage from the client side)
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

/* ====== routes ====== end */



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
