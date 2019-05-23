var createError = require('http-errors');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");



/* ====== create a new app ====== */
//create a new app by calling express()
const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(cors());
app.use(logger('dev'));

// Express now includes body-parser middleware by default
// POST JSON -> request.body
app.use(express.json());     //app.use(bodyParser.json());

//query string data in the URL(e.g. /profile?id=5) -> request.query
app.use(express.urlencoded({ extended: false }));     //app.use(bodyParser.urlencoded({ extended: false }));

//client -> request.cookies ; allow modification : by changing response.cookies
app.use(cookieParser());

//This middleware serves static assets from your public folder.
// console.log(path.join(__dirname, 'public'))   .../backend/public :放靜態檔案
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "../client/build")))


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


//attached to our app
app.use('/api/crawledlog', crawledlogRouter);
app.use('/api/metas', metasRouter)

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
  res.render('error');
});

module.exports = app;
