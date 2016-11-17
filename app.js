/**
 * Created by Administrator on 2016/11/7.
 */
var express=require('express');
var path=require('path');
var mongoose=require('mongoose');
var serveStatic = require('serve-static');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var logger=require('morgan')
var port=process.env.PORT||3000;
var app=express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeMDB');

app.use(serveStatic('bower_components'));
app.use(require('body-parser').urlencoded({extended: true}));
// app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, "public")));
app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(cookieParser());
app.use(session({
    secret:'zxy',
    resave:false,
    saveUninitialized:true
}));
app.locals.moment = require('moment');


if('development'===app.get('env')){
    app.set('showStackError',true);
    app.use(logger(':method :url :status'));
    app.locals.pretty=true
    mongoose.set('debug',true)
}

require('./config/routes')(app);
app.listen(port);
console.log(' project start on port '+port);
