/**
 * Created by Administrator on 2016/11/13.
 */
var Movie=require('../models/movie');
//index page
exports.index=function (req,res) {
    console.log('user in session: ')
    console.log(req.session.user);

    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('index',{
            title:'yukihala的电影盒子 首页',
            movies:movies
        })
    })
};