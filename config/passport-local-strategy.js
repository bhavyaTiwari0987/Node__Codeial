const passport = require("passport");
const User = require('../models/user');

const LocalStrategy = require("passport-local").Strategy;

//Telling passport to use local strategy..
// Authenticatin using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    
    async function (email, password, done) {
        // find a user and establish the identity.
        const currentUser = await User.findOne({email: email})
        if(!currentUser){
            console.log('Error in finding user ===>> Passport');
            done(err);
        }else{
            if(!currentUser || currentUser.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, currentUser);
        }
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
})

// deserializing the user from the key in the cookies..
passport.deserializeUser(async function(id, done){
    const currentUser = await User.findById(id);
    if(!currentUser){
        console.log('Error in finding user ===>> Passport');
        done(err);
    }else{
        return done(null, currentUser);
    }
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed inuser from the session cookie and we are just sending this to locals for the views...
        res.locals.user = req.user
    }
    next();

}
module.exports = passport;
