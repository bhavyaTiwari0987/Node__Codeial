const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = async (req, res) => {
  try {
    const currentPost = await Post.findById(req.body.post);
    if (currentPost) {
      const newComment = await Comment.create({
        comment: req.body.comment,
        user: req.user._id,
        post: req.body.post,
      });
      if (newComment) {
        console.log("new comment", newComment);
        // Adding comment to the post
        currentPost.comments.push(newComment);
        currentPost.save();
        res.redirect("back");
      }
    }
  } catch (err) {
    console.log("Error", err);
    res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  const currentComment = await Comment.findById(req.params.id);
  if (currentComment.user == req.user.id) {
    let postId = currentComment.post;
    await Comment.findOneAndDelete({ _id: req.params.id });

    const post = await Post.findByIdAndUpdate(postId, {
      $pull: { comments: req.params.id },
    });
    if (post) {
      return res.redirect("back");
    }
  } else {
    return res.redirect("back");
  }
};
