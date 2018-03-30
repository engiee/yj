/**
 *  载入依赖项
 *  fs：文件系统；
 *
 */
const fs = require('fs');  //文件系统
const path = require('path');  //路径
const express = require('express');  //web 应用开发框架
const validator = require('express-validator'); //中间件，它验证请求的body, params, query, headers 和 cookies ，并且如果任何配置的验证规则失败,返回一个错误的响应;
const mongoose = require('mongoose'); //node.js异步环境下对mongodb进行便捷操作的对象模型工具
const md5 = require("md5");  //加密工具
const session = require('express-session'); //基于express框专门用于处理session的中间件
const MongoStore = require('connect-mongo')(session); //session持久化保存到mongoDB的工具
const router = express.Router(); //express路由
const bodyParser = require('body-parser'); //express中间件，作用是对post请求的请求体进行解析
const app = express();  //
const User = require('./server/db').User;
const resolve = file=>path.resolve(__dirname, file);//path.resolve（）方法将一系列路径或路径段解析为绝对路径。
// path.resolve([from ...], to) 说明：将参数 to 位置的字符解析到一个绝对路径里。参数说明：from 源路径、to 将被解析到绝对路径的字符串
const db = require('./server/db');

app.set('port', (process.env.port || 3300));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'csdemo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection }) //session存储位置
}));
//后端表单验证
app.use(validator({
    errorFormatter: function (param, msg, value) {
        let namespace=param.split('.'),
            root=namespace.shift(),
            formParam=root;

        while(namespace.length){
            formParam+='['+ namespace.shift() +']';
        }

        return {
            param:formParam,
            msg:msg,
            value:value
        };
    }
}));
app.get('/',function (reg,res,next) {
    console.log("链接开启")
    res.send('测试<a href="/demo">demo</a>');
    next();
})

app.get('/demo', function (req, res, next) {
        console.log("demo打开")
        const html = fs.readFileSync(resolve('index.html'), 'utf-8');
        res.send(html);
});
router.get('/get', function(req, res, next){
    console.log(req.query.id)
    let id=req.query.id;
    if(!id) {
        return next(new Error('未提供查询字段'));
    }
    db.test.findOne({_id: id}).exec(function(err, result){
        if ( err ) {
            console.log('get category: '+ err);
            throw err;
        }
        if(!result){
            return next(new Error('article not found: ', id));
        }
        res.status(200).send(JSON.stringify(result)).end();
    });
});
router.post('/set', function(req, res, next){
    const email= req.body.email;
    const password= req.body.password;
    const comfirmPassword= req.body.comfirmPassword;
    //服务端验证字段
    req.checkBody('email', '须为邮箱且不能为空').notEmpty().isEmail();
    req.checkBody('password', '密码不能为空').notEmpty();

    let errors=req.validationErrors(); console.log(errors);
    if(errors) return res.status(301).send(errors).end();

    const user= new db.test({
        name: email.split('@').shift(),
        email:email,
        password:md5(password),
        created:new Date
    });
    user.save(function(err, result){
        if ( err ) {
            console.log('reg err:'+ err);
            throw err;
        }else{
            console.log(result);
            //res.redirect('/adminArticleList');
            res.status(200).send(JSON.stringify(result)).end();
        }
    });
});
app.use(router);
app.listen(app.get('port'), function(){
    console.log('Server up: http://localhost:' + app.get('port'));
});

