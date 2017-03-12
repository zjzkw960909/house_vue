var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var redis_store = require('connect-redis')(session);
var formidable = require('express-formidable');
var app = express();
//使用定时工具
var set_schedule = require('./utils/node-schedule');

//使用控制层模块

var admin = require('./control/admin');
var upload = require('./control/upload');
var house_search = require('./control/house_search');
var weixin_reg = require('./control/weixin_reg');
var weixin_want = require('./control/weixin_want');

var ip = 3300;
var globel = {
    times: 1392
};
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //记录器，显示req的信息,dev默认
app.use(bodyParser.json()); //为了解析json 数据
app.use(bodyParser.urlencoded({ extended: false })); //通上，为了自动解析post参数,如果不定义需要自己解析参数
app.use(cookieParser()); //cookie解析器
app.use(express.static(path.join(__dirname, 'dist'))); //静态文件存放的地方
app.use(formidable.parse());
//app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000*60 }}))
//设置redis session值
var opt = {
    host:"127.0.0.1",
    port:6379
};
app.use(session({
     store: new redis_store(opt),
     secret: 'kevin'
}));

//用户登陆
admin(app);
//上传文件
upload(app);
//后台和微信端房屋登记
weixin_reg(app, globel);
//需求相关 
weixin_want(app);
//后台添加区域，搜索功能
house_search(app);
//设置定时时间，及任务
set_schedule(globel,15,9,0,6);
app.listen(ip, function () {
    console.log('open:'+ip);
});
