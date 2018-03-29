/**
 * Created by cc on 2015/9/25 9:31.
 */

var MongoClient = require('mongodb').MongoClient;
var settings = require("../settings.js");
//不管数据库什么操作，都是先连接数据库，所以我们可以把连接数据库

//封装成为内部函数
function _connectDB(callback) {
  var url = settings.dburl; //从settings文件中，都数据库地址
  //连接数据库
  MongoClient.connect(url)
    .then(function(db) {
      callback(db);
    });
}

//插入数据
exports.insertOne = function(collectionName, json, callback) {

  _connectDB(function(db) {
    /* body... */
    db.collection(collectionName).insertOne(json)
      .then(function(r) {
        callback(r);
        db.close(); //关闭数据库
      });
  })
};

//查找数据，找到所有数据。args是个对象{"pageamount":10,"page":10}
exports.find = function(collectionName, json, C, D) {
  var result = []; //结果数组
  if (arguments.length == 3) {
    //那么参数C就是callback，参数D没有传。
    var callback = C;
    var skipnumber = 0;
    //数目限制
    var limit = 0;
  } else if (arguments.length == 4) {
    var callback = D;
    var args = C;
    //应该省略的条数
    var skipnumber = args.pageamount * args.page || 0;
    //数目限制
    var limit = args.pageamount || 0;
    //排序方式
    var sort = args.sort || {};
  } else {
    throw new Error("find函数的参数个数，必须是3个，或者4个。");
    return;
  }

  //连接数据库，连接之后查找所有
  _connectDB(function(db) {
    var cursor = db.collection(collectionName).find(json).sort(sort).skip(skipnumber).limit(limit).toArray();
    cursor.then(function(docs) {
      /* body... */
      callback(docs);
      db.close(); //关闭数据库
    })


  });
}

//删除
exports.deleteMany = function(collectionName, json, callback) {
  _connectDB(function(db) {
    //删除
    db.collection(collectionName).deleteMany(json)
      .then(function(results) {
        callback(results);
        db.close(); //关闭数据库
      }, function(err) {
        /* body... */
        callback(err);
        db.close(); //关闭数据库
      })


  });
}

//修改
exports.updateMany = function(collectionName, json1, json2, callback) {
  _connectDB(function(db) {
    db.collection(collectionName).updateMany(json1,json2)
      .then(function(results) {
        /* body... */
        callback(results);
        db.close();
      },function (results) {
          /* body... */
          callback(results);
        db.close();
      });

  })
}

exports.getAllCount = function(collectionName, callback) {
  _connectDB(function(db) {
    db.collection(collectionName).count({}).then(function(shu) {
      console.log(shu);
      callback(shu);
      db.close();
    });
  })
}
