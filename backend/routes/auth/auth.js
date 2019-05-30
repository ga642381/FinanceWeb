var express = require('express');
var router = express.Router();

//auth router 
router.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    console.log("logout")
    res.send('logging out');
});


// auth with google
router.get('/google', (req, res) => {
    //handle with passport
    res.send('logging in with google');
});



module.exports = router;