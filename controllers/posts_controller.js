const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require('../models/like');

module.exports.create = async function (req, res) {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (newPost) {
      if(req.xhr){
        return res.status(200).json({
          data: {
            post: newPost
          },
          message: 'Post created!'
        })
      }

      req.flash('success' , 'Post published');
      return res.redirect("back");
    }
  } catch (err) {
    req.flash('error' , err);
    return res.redirect('back');
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const currentPost = await Post.findById(req.params.id);
    if (currentPost) {
      // .id means object id into string
      if (currentPost.user == req.user.id) {
        // change :: delete the associated likes for the post and all its comments' likes tooo
        await Like.deleteMany({likeable : currentPost , onModel: 'Post'});
        await Like.deleteMany({_id : {$in : currentPost.comments}});


       await Post.findByIdAndDelete({_id : currentPost._id});
       await Comment.deleteMany({ post: currentPost._id });

        if(req.xhr){
          return res.status(200).json({
            data: {
              post_id: req.params.id
            },
            message: 'Post deleted'
          })
        }

       req.flash('success' , 'Post and associated comments deleted!');
        return res.redirect("back");
      } else {
        return res.redirect("back");
      }
    }
  } catch (err) {
    req.flash('error' , 'You can not delete this post!');
    return res.redirect("back");
  }
};

