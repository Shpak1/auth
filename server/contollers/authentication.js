/**
 * Created by svarog on 14.08.17.
 */
const User = require('../models/users');
jwt = require('jwt-simple');
config = require('../config');


function  tokenUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub:user.id, iat:timestamp}, config.secret)
}


exports.signin = function (req,res, next) {
    res.send({token:tokenUser(req.user)})

}

exports.signup = function (req, res, next){
    const email = req.body.email;
    const password = req.body.password;

    //see if user with given email exists
    User.findOne({email:email}, function(err, existingUser){
        if(!email || !password){
            return res.status(422).send({error: 'Де явки, ёба?'})
        }
        if (err) { return next(err); }

        //return error if user with this email is not exist
        if(existingUser){
            return res.status(422).send({ error : 'Email is in use'})
        }

        //create new user
        const user = new User({
            email:email,
            password:password
        });
        user.save(function(err){
            if(err){return next (err);}
            res.json({token:tokenUser(user)})
        })
    })


};