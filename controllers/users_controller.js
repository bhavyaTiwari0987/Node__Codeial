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

//render the profile page
module.exports.profile = function (req, res){
    return res.render('user_profile' , {
        title: "Codeial | Profile-Page"
    })
}


// get the sign  up data
module.exports.create= function (req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }


    User.findOne({email : req.body.email} , function (err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body , function (err, user){
                if(err){console.log("error in creating user while signing up"); return}

                return res.redirect ('/users/sign-in');
            })
        }else{
            return res.redirect('back');

        }
    })
    
}

//sign in and create the session for the user
module.exports.createSession = async function (req, res){
    //steps to authenticate
    //find the user
    try {
        const currentUser =  await User.findOne({email : req.body.email});   //handle user found
        console.log(currentUser);

        if(currentUser){
            if(currentUser.password != req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id' , currentUser.id);
            return res.redirect('/users/profile');
        }else {
            console.log('nahi mila user');
            return res.redirect('back');
        }
    }catch(error){
        console.log('Error' , error);
    }

    
    // if(user){
    //     //handle passwords which doesn't match
    //     if(user.password != req.body.password){
    //         return res.redirect('back');
    //     }
    //     //handle session creation
    //     res.cookie('user_id' , user.id);
    //     return res.redirect('/users/profile');
    // }else{
    //     //handle user not found
    //     return res.redirect('back');

    // }
   
}