/**
 * Created by Administrator on 2016/11/14.
 */
var mongoose=require('mongoose');
var CommentSchema= require('../schemas/comment');
var Comment=mongoose.model('Comment',CommentSchema);//发布模型

module.exports=Comment;