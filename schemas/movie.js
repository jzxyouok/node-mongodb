/**
 * Created by Administrator on 2016/11/8.
 */
var mongoose=require('mongoose');

var MovieSchema=new mongoose.Schema({
    doctor:String,
    title:String,
    country:String,
    language:String,
    summary:String,
    flash:String,
    poster:String,
    year:String,
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

MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }
    else{
        this.meta.updateAt=Date.now()
    }

    next()
});

MovieSchema.statics={
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

module.exports=MovieSchema;