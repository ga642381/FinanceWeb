var express = require('express');
var router = express.Router();

//auth welcome
router.get('/', (req, res) => {
    res.render('welcome')
})

//auth router 
router.get('/login', (req, res) => {
    res.render('login');
});



/* ====== register ====== */
router.get('/register', (req, res) => {
    //handle with passport
    res.render('register');
});

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //check
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields!' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match!' })
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });

    }
    else {
        res.send('pass');
    }
})












// auth with google
router.get('/google', (req, res) => {
    //handle with passport
    res.send('logging in with google');
});



module.exports = router;