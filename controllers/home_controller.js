const Post = require("../models/post");
const User = require('../models/user');

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user__id', 25);
  try {
    const allPosts = await Post.find()
    .sort('-createdAt')
    .populate('user').populate({path:'comments', populate: {path: 'user'}});
    if (allPosts) {
      const allUsers = await User.find();
      if(allUsers){
        return res.render("home", {
          title: "Codeial || Home",
          posts: allPosts,
          all_users: allUsers
        });
      }
      
      
    }
  } catch (err) {
    console.log("Error", err);
  }
};
