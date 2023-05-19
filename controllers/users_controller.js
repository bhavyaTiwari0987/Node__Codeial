const User = require("../models/user");

// render the sign up page
module.exports.signUp = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//render the sign in page
module.exports.signIn = function (req, res) {
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};
module.exports.profile = async function (req, res) {
  const currentUser = await User.findById(req.params.id);
  if(currentUser){
    return res.render("user_profile", {
      title: "Codeial | Profile-Page",
      profile_user: currentUser
    });
  }
 
};

module.exports.update = async (req,res) => {
  try{
    if(req.user.id == req.params.id){
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      if(user){
        return res.redirect('back');
      };
    }else{
      return res.status(401).send('Unauthorized');
    }
  }catch (err){
    console.log(err);
  }
  
}


// get the sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      alert("Check the password!");
      return res.redirect("back");
    }
    const CurrentUser = await User.findOne({ email: req.body.email });
    if (!CurrentUser) {
      const newUser = User.create(req.body);
      res.redirect("/users/sign-in");
      alert("Signup successful!");
    } else {
      alert("Email is already exist...");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
  }
};

//sign in and create the session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

// module.exports.destroySession = function(req,res){
//   req.logout();
//   return res.redirect('/');
// }
module.exports.destroySession = function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}


