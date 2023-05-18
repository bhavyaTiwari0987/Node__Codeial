const Post = require('../models/post');
module.exports.create = async function(req,res){
    try{
        const newPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(newPost){
            return res.redirect('back');
        }
        
    }catch(err){
        console.log('Error', err);
    }
}