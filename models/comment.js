const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    // Comment belogs to the user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // Comment belongs to the post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
       
} , {
    timestamps: true
})

const Comment = mongoose.model('Comment' ,commentSchema);

module.exports = Comment;