/**
 * Created by Administrator on 2016/11/7.
 */
var express=require('express');
var path=require('path');
var mongoose=require('mongoose');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var port=process.env.PORT||3000;
var app=express();

mongoose.connect('mongodb://localhost/nodeMDB')

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(serveStatic('bower_components'));
app.use(bodyParser.urlencoded());
// app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, "bower_components")));
app.listen(port);

console.log(' project start on port '+port);

//index page
app.get('/',function (req,res) {
    res.render('index',{
        title:'yukihala的电影盒子 首页',
        movies:[{
                title:'可怜的浓眉',
                _id:1,
                poster: 'http://img1.3lian.com/img13/c3/42/d/5.jpg'
            },{
                title:'空砍不赢球',
                _id:2,
                poster: 'http://img1.3lian.com/img13/c3/42/d/5.jpg'
            },{
                title:'场场50+',
                _id:3,
                poster: 'http://img1.3lian.com/img13/c3/42/d/5.jpg'
            },{
                title:'就是不赢球',
                _id:4,
                poster: 'http://img1.3lian.com/img13/c3/42/d/5.jpg'
            },{
                title:'队友CBA',
                _id:5,
                poster: 'http://img1.3lian.com/img13/c3/42/d/5.jpg'
            },{
                title:'今年又白瞎',
                _id:6,
                poster: 'http://img1.3lian.com/img13/c3/42/d/5.jpg'
            }
        ]
    })
});

//detail page
app.get('/movie/:id',function (req,res) {
    res.render('detail',{
        title:'yukihala的电影盒子 详情页',
        movie: {

            doctor: "何塞帕迪里亚",

            country: "American",

            title: "机械战警",

            year: 2014,

            poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',

            language: "英语",

            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',

            summery: "lalalalalalalalallalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalallalalalalalalalallalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalallalalalalalalalallalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalallalalalalalalalallalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalal"

        }
    })
});
//admin page
app.get('/admin/movie',function (req,res) {
    res.render('admin',{
        title:'yukihala的电影盒子 后台录入页',
        movie: {
            doctor: "",
            country: "",
            title: "",
            year: "",
            poster:'',
            language: "",
            flash: '',
            summary: ''
        }
    })
});
//list page
app.get('/admin/list',function (req,res) {
    res.render('list',{
        title:'yukihala的电影盒子 列表页',
        movies: [{
                title: "机械战警",

                doctor: "何塞帕迪里亚",

                country: "American",

                _id: 1,

                year: 2014,

                language: "英语",

                flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf'
            }
        ]
    })
});
