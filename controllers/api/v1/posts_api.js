const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    const allPosts = await Post.find()
    .sort('-createdAt')
    .populate('user').populate({path:'comments', populate: {path: 'user'}});

    return res.json(200 , {
        message: 'List of Posts',
        posts: allPosts
    })
}

module.exports.destroy = async (req, res) => {
    try {
      const currentPost = await Post.findById(req.params.id);
      if (currentPost) {
        // .id means object id into string
        if (currentPost.user == req.user.id) {
         await Post.findByIdAndDelete({_id : currentPost._id});
         await Comment.deleteMany({ post: currentPost._id });
  
        //   if(req.xhr){
        //     return res.status(200).json({
        //       data: {
        //         post_id: req.params.id
        //       },
        //       message: 'Post deleted'
        //     })
        //   }
        return res.status(200).json({
            message: 'Post and associated comments deleted successfully'
        })
        //  req.flash('success' , 'Post and associated comments deleted!');
        //   return res.redirect("back");
        } else {
          return res.json(401 , {
            message: 'You can not delete this post!'
          })
        }
      }
    } catch (err) {
    //   req.flash('error' , 'You can not delete this post!');
    //   return res.redirect("back");
    res.josn(500, {
        message: 'Internal sever error'
    })
    }
  };
  
  