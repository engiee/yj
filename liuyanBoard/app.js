/**
 * Created by wangzhen on 20158/03/25 11:35.
 */
var express = require("express");
var app = express();
var db = require("./model/cc_db.js");

var formidable = require('formidable');//formidable模块实现了上传和编码图片和视频。它支持GB级上传数据处理，支持多种客户端数据提交。有极高的测试覆盖率，非常适合在生产环境中使用。
// 包装mongo返回的id
var ObjectId = require('mongodb').ObjectID;

var bodyParser = require('body-parser')
//这里不适用--设置模板引擎
// app.set("view engine", "ejs");

//静态文件
app.use(express.static("./webapp"));

//读取所有留言，这个页面是供Ajax使用的
app.get("/du", function (req, res, next) {
    //可以接受一个参数
    var page = parseInt(req.query.page);

    db.find("liuyanben",{},{"sort":{"shijian":-1},"pageamount":2,"page":page},function(result){
        res.json({"result":result});
    });
});

//新增留言
app.post("/tijiao", function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {
        //写入数据库

        db.insertOne("liuyanben", {
            "xingming" : fields.xingming,
            "liuyan" : fields.liuyan,
            "shijian" : new Date().getTime()
        }, function (result) {
            // if(err){
            //     res.send({"result":-1}); //-1是给Ajax看的
            //     return;
            // }
            res.json({"result":1});
        });
    });
});

//删除
app.get("/del",function(req,res,next){
    //得到参数
    var id = req.query.id;
    db.deleteMany("liuyanben",{"_id":ObjectId(id)},function(data){
        // console.log(data);
        // res.redirect("/");
        res.json({"ret":1});
    });
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })
// 修改留言,这里注意这样的写法
app.post("/update", urlencodedParser, function(req, res) {
  var id = req.body.id;  
  var name = req.body.xingming;
  var info = req.body.liuyan;

  db.updateMany(
    "liuyanben", //集合名字
    // 这个特别注意，返回的id值需要-----ObjectId()函数的包装！！
    { "_id": ObjectId(id) }, 
    {
      $set: { 
        "xingming": name,
        "liuyan": info,
        "shijian" : new Date().getTime()
       } //怎么改
    },
    function(result) { //改完之后做什么
      res.send(result);
    }
  );
});

// 读取留言板的总数
app.get("/sum", function (req, res, next) {
    
    db.getAllCount("liuyanben",function(sum){
        res.json({"sum":sum});
    });
});

app.listen(3000);
