var express = require('express');
var router = express.Router();
// 安装mongodb  然后调用mongodb桥
var MongoClient = require('mongodb').MongoClient
// 定义连接字符串常量 mongodb默认端口
var DB_CONN_STR = 'mongodb://localhost:27017/nodeApp'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('write and send');
});

// 注册接口
router.post('/register', function (req, res) {
  // 接受数据  body
  console.log(req.body.username)
  var username = req.body.username
  var password = req.body.password
  var nickname = req.body.nickname
  // 数据库连接
  MongoClient.connect(DB_CONN_STR, function (err, client) {
    // 连接一个集合  3.0新的写法
    var coll = client.db('nodeApp')
    var obj = {username: username, password: password, nickname: nickname}
    // 插入数据
    coll.collection('users').insertOne(obj, function (err, result) {
      if (err) {
        console.log('数据库连接失败')
        return;
      }
      console.log(result)
      res.send('数据库连接成功')
    })
  })
})

// 登录接口
router.post('/login', function (req, res) {
  var username = req.body.username
  var password = req.body.password
  MongoClient.connect(DB_CONN_STR, function (err, client) {
    var coll = client.db('nodeApp')
    var query = {username: username, password: password}
    coll.collection('users').find(query).toArray(function (err, result) {
      if (err) {
        console.log(err)
      } else {
        if (result.length > 0) {
          //session 是依赖于cookie的
          // req.session.username = username
          res.send('登陆成功')
        } else {
          res.send('登陆失败')
        }
      }
    })
  })
})

module.exports = router;
