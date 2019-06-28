const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/* ====== create a new app ====== */
//create a new app by calling express()
const app = express();


/* ====== DB config ====== */
const mongoose = require('mongoose');
const db = require('./config/keys').mongoTaiwanStock;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));



/* ====== view engine setup ====== */
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
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
app.use(express.static(path.join(__dirname, "../frontend/build")))

/* ===== Express Session =====*/
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(
    session({
        secret: 'Tn(}2[GlzznYk=!',
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 1000 },
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);
/* ===== Passport Middleware =====*/
const passport = require('passport');
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// /* ===== Connect flash  Flash Middleware=====*/
const flash = require('connect-flash');
app.use(flash());

// VERY IMPORTANT : req.flash() requires sessions.
// req.flash will create a cookie
// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

/* ====== routes ====== */
/* Google auth */
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        //console.log('console in cb: ', req.user);
        res.redirect('/');
    });

// routes:
const metasRouter = require('./routes/api/metas');
const crawledlogRouter = require('./routes/api/crawledlog');
const authRouter = require('./routes/auth/auth');
const userdataRouter = require('./routes/api/userdata');
const databaseRouter = require('./routes/api/database');

//attached to our app
app.use('/api/database', databaseRouter);
app.use('/api/crawledlog', crawledlogRouter);
app.use('/api/metas', metasRouter);
app.use('/api/userdata', userdataRouter);
app.use('/auth', authRouter);




//https://tylermcginnis.com/react-router-cannot-get-url-refresh/
//fix the problem of refreshing page ( getting the subpage from the client side)
app.get('/*', function (req, res) {
    //console.log(req.user);
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'), function (err) {
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
    res.render('error');
});

module.exports = app;