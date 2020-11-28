const Post = require("../models/post");
const Comment = require('../models/comment');
module.exports.create = async function(req,res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');   
    }catch(err){
        console.log("Error",err);
        return;
    }
}
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post){            
            //Check Whether the user is allowed to delete the post?
            if(post.user == req.user.id){
                post.remove();
                // First delete all comments where post id is same as req.params.id 
                await Comment.deleteMany({post:req.params.id});
                return res.redirect('back');
            }else{
                res.redirect('back');
            }
        }
    }catch(err){
        console.log("Error",err);
        return;
    }
}