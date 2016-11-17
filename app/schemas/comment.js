/**
 * Created by Administrator on 2016/11/14.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;//用objectId做字段类型，方便实现关联文档查询
                                   //mongodb中会默认配置这个值

var CommentSchema=new Schema({
    movie:{type:ObjectId,ref:'Movie'},//当前页面
    from:{type:ObjectId,ref:'User'},//评论人
    reply:[{
        from:{type:ObjectId,ref:'User'},//评论人
        to:{type:ObjectId,ref:'User'},//恢复对象
        content:String//评论内容
    }],//子评论
    to:{type:ObjectId,ref:'User'},//恢复对象
    content:String, //评论内容

    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

CommentSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }
    else{
        this.meta.updateAt=Date.now()
    }

    next()
});

CommentSchema.statics={
    fetch:function (cd) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cd)
    },
    findById:function (id,cd) {
        return this
            .findOne({_id:id})
            .exec(cd)
    }
};

module.exports=CommentSchema;