/**
 * Created by svarog on 16.08.17.
 */
const passport = require('passport');
const User = require('../models/users');
const config = require('../config');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');


const localOptions = { usernameField:'email'};
const localLogin = new localStrategy(localOptions, function (email, password, done) {
    User.fundOne({email:email}, function(err, user){
        if(err) {return done(err);}
        if(!user) {return done(null, false)}
        user.comparePassword(password, function (err, isMatch) {
            if(err) { return done(err); }
            if(!isMatch) {return done(null, false)}

            return(null, user)
        })


    })
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey:config.secret
};


const jwtLogin = new jwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub, function (err, user) {
        if(err){return done(err,false)}
        if(user){
            done(null, user);
        } else {
            done(null, false)
        }
    })
});

passport.use(jwtLogin);
passport.use(localLogin)