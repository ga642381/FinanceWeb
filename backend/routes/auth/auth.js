const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//models
const User = require('../../models/User');



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
        //Validation passed

        //model (mongoose)
        //a little bug : "findOne" not "findone", hard to debug
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //User exists
                    errors.push({ msg: 'Email is already registered' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }

                else {
                    //Creat a new user
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set password to hashed
                            newUser.password = hash;

                            //Save user
                            newUser.save()
                                .then(user => {



                                    //auth with google
                                    // router.get('/google', (req, res) => {
                                    //     //handle with passport
                                    //     res.send('logging in with google');
                                    // });   req.flash('success_msg', 'You are now registered and can log in')
                                    res.redirect('/auth/login');
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
            .catch(err => res.send(err));
    }
})


//Login Handle

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
})


module.exports = router;