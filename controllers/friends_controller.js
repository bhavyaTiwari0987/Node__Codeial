const Friendship = require('../models/friendship');
const User = require('../models/user');

exports.createFriendship = async function(req, res){
    try{
        let loginUser = req.query.loginUser;
        let targetUser = req.query.targetUser;
   
        const newFriendsip = await Friendship.create({
            from_user: req.query.loginUser,
            to_user: req.query.targetUser
        })

        const fromUser = await User.findById(req.query.loginUser);
        const toUser = await User.findById(req.query.targetUser);
      

        fromUser.friendships.push(newFriendsip._id + '-' + toUser.name + '-' +  req.query.targetUser);
        toUser.friendships.push(newFriendsip._id + '-' + fromUser.name + '-' + req.query.loginUser);
        fromUser.save();
        toUser.save();

    
        return res.redirect('back');
    }catch(err){
        console.log('Error' , err);
        return res.redirect('back');
    }
}