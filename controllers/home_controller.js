const Post = require("../models/post");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user__id', 25);
  try {
    const allPosts = await Post.find().populate('user');
    if (allPosts) {
        console.log(allPosts);
      return res.render("home", {
        title: "Codeial || Home",
        posts: allPosts,
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
};
