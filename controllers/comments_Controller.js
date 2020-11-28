const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = async function(req,res){
    //Find the post first
    try{
    let post = await Post.findById(req.body.post);
    if(post){
        Comment.create({content: req.body.content,
            post: req.body.post,
            user: req.user._id})
            //Push it into array
            post.comments.push(comment);
            post.save();
            res.redirect('back');
        }
    }catch(err){
        console.log("Error",err);
        return;
    }
}
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,coment){
        if(err){
            console.log("Error in deleting comment");
            return;
        }
        if(comment){
            if(comment.user == req.user.id){
                let postId = comment.post;
                comment.remove();
                Post.findByIdAndUpdate(postId,function(err,post){
                    // for(let i = 0;i<post.comments.length;i++){
                    //     if(post.comments[i] == req.params.id){
                    //         splice(i,1);
                    //     }
                    // }
                    return res.redirect('back');
                })
            }
        }
    })
}