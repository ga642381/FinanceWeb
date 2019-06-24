const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//models
const User = require('../../models/User');
router.get('/', (req, res) => {
    res.render('welcome')
})

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
router.get('/login', (req, res) => {
    res.render('login');
});

// see https://www.youtube.com/watch?v=hNinO6-bDVM
// and passport custom callback (passport.authenticate)
router.post('/login', (req, res, next) => {

    passport.authenticate('local', function (err, user, info) {

        if (err) { return next(err); }

        else if (!user) { return res.redirect('/auth/login') }

        else {
            //req.login --> pass user to passport.serializeUser
            req.logIn(user, err => {
                // user will be stored and can be retrived by req["user"]
                // https://stackoverflow.com/questions/12258795/how-to-access-cookie-set-with-passport-js
                if (err) { return next(err); }
                else {
                    return res.redirect('/');
                }
            })
        }
    })(req, res, next);


});

router.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
})


module.exports = router;