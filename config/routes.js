/**
 * Created by Administrator on 2016/11/12.
 */
var Index=require('../app/controllers/index');
var User=require('../app/controllers/user');
var Movie=require('../app/controllers/movie');
var Comment=require('../app/controllers/comment');

module.exports=function (app) {
    //pre handle user
    app.use(function (req,res,next) {
        var _user=req.session.user;

        app.locals.user=_user;

        next()
    });

//index page
    app.get('/',Index.index);

//user
    app.post('/user/signin',User.signin);//signin
    app.post('/user/signup',User.signup);//signup
    app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list);//userlist page
    app.get('/signin',User.showSignin);
    app.get('/signup',User.showSignup);
    app.get('/logout',User.logout);//logout
    // app.delete('/admin/user/list',User.signinRequired,User.adminRequired,User.del);//list delete user

//movie

    app.get('/movie/:id',Movie.detail);//detail page
    app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.updata);//admin update movie
    app.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.save);//admin post movie
    app.get('/admin/movie',User.signinRequired,User.adminRequired,Movie.new);//admin new page
    app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list);//list page
    app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del);//list delete movie


// Comment
    app.post('/user/comment',User.signinRequired,Comment.save)
};


