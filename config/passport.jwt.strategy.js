const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
// const { ExtractJwt } = require('passport-jwt');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}


passport.use(new JWTStrategy(opts,async function(jwtPayLoad , done){
     try{
        const currentUser = await User.findById(jwtPayLoad._id);
        if(currentUser){
            return done(null , currentUser);
        }else{
            return done(null , false);
        }
           
    }catch(err){
        console.log('Error in finding user in JWT');
    }
}));

module.exports = passport;