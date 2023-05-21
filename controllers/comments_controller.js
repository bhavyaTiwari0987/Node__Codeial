const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailer/comments_mailer");

module.exports.createComment = async (req, res) => {

  try {
    let post = await Post.findById(req.body.post);

    if (post){
        let comment = await Comment.create({
            comment: req.body.comment,
            post: req.body.post,
            user: req.user._id
        });

        post.comments.push(comment);
        post.save();
        
        comment = await comment.populate(['user', 'name' , 'email'])
        commentsMailer.newComment(comment);
        if (req.xhr){
            

            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Post created!"
            });
        }


        req.flash('success', 'Comment published!');

        res.redirect('/');
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
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Post deleted",
        });
      }

      req.flash("success", "Comment deleted!");
      return res.redirect("back");
    }
  } else {
    return res.redirect("back");
  }
};
