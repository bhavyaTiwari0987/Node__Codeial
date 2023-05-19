const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (newPost) {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const currentPost = await Post.findById(req.params.id);
    console.log(currentPost);
    if (currentPost) {
      // .id means object id into string
      if (currentPost.user == req.user.id) {
       await Post.findByIdAndDelete({_id : currentPost._id});
       await Comment.deleteMany({ post: currentPost._id });
        return res.redirect("back");
      } else {
        return res.redirect("back");
      }
    }
  } catch (err) {
    console.log("Error", err);
  }
};

