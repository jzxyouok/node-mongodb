/**
 * Created by Administrator on 2016/11/13.
 */
var User=require('../models/user');
//signup
exports.signup= function(req,res){
    var _user=req.body.user;

    User.findOne({name: _user.name},function(err,user){
        if(err){
            console.log(err)
        }
        if(user){
            alert('用户名已被注册过~是你的就直接去登陆吧！');
            return res.redirect('/signin');
        }else{
            var user=new User(_user);
            user.save(function(err,user){
                if(err){
                    console.log(err)
                }
                // console.log(user)
                res.redirect('/')
            })
        }
    })
};

//userlist page
exports.list=function (req,res) {
        User.fetch(function(err,users){
            if(err){
                console.log(err)
            }
            res.render('userlist',{
                title:'yukihala的电影盒子 用户列表页',
                users: users
            })
        })
};
//showsignup

exports.showSignup=function (req,res) {
        res.render('signup',{
            title:'yukihala的电影盒子 用户注册页面'
    })
};

//showsignin
exports.showSignin=function (req,res) {
    res.render('signup',{
        title:'yukihala的电影盒子 用户登录页面'
    })
};
//signin
exports.signin=function(req,res){
    var _user=req.body.user ;
    var name=_user.name;
    var password=_user.password;

    User.findOne({name:name},function(err,user){
        if(err){console.log(err)}
        if(!user){
            console.log('没有该账号，去注册吧！');
            return res.redirect('/signup')
        }
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err)
            }
            if(isMatch){
                console.log('Password is matched');
                req.session.user=user;//把登录状态保存在本地，session是与服务器之间的会话

                return res.redirect('/');

            }else{

                console.log('Password is not matched');
                return res.redirect('/signin')
            }
        })
    })

};
//logout
exports.logout=function (req,res) {
    delete req.session.user;
    // delete app.locals.user;
    res.redirect('/')
};

//midware for user
exports.signinRequired=function (req,res,next) {
    var user=req.session.user;
    if(!user){return res.redirect('/signin')}
    next()
};
exports.adminRequired=function (req,res,next) {
    var user=req.session.user;
    if(user.role<=10){
        return res.redirect('/signin')}
    next()
};