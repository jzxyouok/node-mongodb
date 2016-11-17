/**
 * Created by Administrator on 2016/11/14.
 */
var Comment=require('../models/comment');

//comment
exports.save=function(req,res){

    var _comment=req.body.comment;
    var movieId=_comment.movie;
//如果存在评论
    if(_comment.cid){
        Comment.findById(_comment.cid,function (err,comment) {
            var reply={
                from:_comment.from,
                to:_comment.tid,
                content:_comment.content
            };

            comment.reply.push(reply);

            comment.save(function(err,comment){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/'+movieId)
            })
        })
    }
    //如果不存在
    else{
        var comment=new Comment(_comment);
        comment.save(function(err,comment){
            if(err){
                console.log(err)
            }
            res.redirect('/movie/'+movieId)
        })
    }


};

