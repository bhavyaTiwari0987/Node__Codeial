const User = require('../models/user');

// render the sign up page
module.exports.signUp = function (req, res){
    return res.render('user_sign_up' ,{
        title: "Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function (req, res){
    return res.render('user_sign_in' , {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create= async function (req, res){
    try{
        if (req.body.password != req.body.confirm_password){
            alert("Check the password!");
            return res.redirect('back');
        }
        const CurrentUser = await User.findOne({email: req.body.email});
        if(!CurrentUser){
            const newUser = User.create(req.body);
            res.redirect('/users/sign-in');
            alert('Signup successful!');
        }else {
            alert('Email is already exist...')
            return res.redirect('back');
           
        }
    
    }catch(err){
        console.log('Error' , err);
    }
    
    
}

//sign in and create the session for the user
module.exports.createSession = function (req, res){
    // todo later
}