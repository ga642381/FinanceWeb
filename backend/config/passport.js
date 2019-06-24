const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const keys = require('./keys');

//Load User Model
const User = require('../models/User');

module.exports = function (passport) {
    /* LocalStrategy setting */
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match User
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'The email is not registered' })
                    }

                    //Match password
                    else {
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;

                            if (isMatch) {
                                return done(null, user);
                            }
                            else {
                                return done(null, false, { message: 'Password incorrect' })
                            }
                        });
                    }
                })
                .catch(err => console.log(err))
        })
    );

    /* GoogleStrategy setting */
    passport.use(new GoogleStrategy({
        clientID: keys.Google.clientID,
        clientSecret: keys.Google.clientSecret,
        callbackURL: "/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        const currentUser = await User.findOne({ name: profile.displayName });
        //console.log('Current User in google strategy: ', currentUser);
        if (!currentUser) {
            const newUser = new User({
                name: profile._json.name,
                email: profile._json.email
            });
            await newUser.save();
            done(null, newUser);
        }
        else {
            done(null, currentUser);
        }
    }))

    /* serialize setting for cookie */
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            done(null, user);
        })
    })
}