var express = require('express');
var async = require('async') // 串行有关联 异步
var router = express.Router();

// 上传图片组件
var multiparty = require('multiparty')
var fs = require('fs')

var MongoClient = require('mongodb').MongoClient
// var URL = 'mongodb://localhost:27017/nodeApp'
var DB_CONN_STR = 'mongodb://localhost:27017/nodeApp'

/* 定义评论添加接口 */
router.post('/submit', function(req, res) {
  var title = req.body.title
  var content = req.body.content

  var insertData = function (client, cb) {
    // 这个nodeApp是你已经建好的数据库，如果你没有建会自动建好
    var comments = client.db('nodeApp').collection('comments') 
    // ids 集合
    var ids = client.db('nodeApp').collection('ids')
    // 串行有关联；对comment的添加操作依托于对ids修改入库
    async.waterfall([
      function (callback) {
        ids.findAndModify(
          {name: 'comment'}, // 条件是name=comment
          [['_id', 'desc']], // 按照_id进行降序
          {$inc: {id: 1}}, // id每次进行加1
          function (err, results) {
            callback(null, results.value.id)
          }
        )
      },
      function (id, callback) {
        var obj = {id: id, title: title, content: content}
        // 这个comments是你要存入数据的集合  comments在nodeApp数据库里
        comments.insertOne(obj, function (err, results) {
          if (err) {
            callback(null, err)
            console.log('连接数据库失败')
          } else {
            callback(null, {results})
          }
        })
      }
    ], function (err, results) {
      cb(results)
    })
  }

  // 数据库的连接和成功之后的处理
  MongoClient.connect(DB_CONN_STR, function (err, client) {
    if (err) {
      console.log(err)
    } else {
      insertData(client, function (results) {
        // 提交成功数据直接跳列表页
        res.redirect('/comment/commentlist')
      })
    }
  })
});

// 定义评论显示列表接口
router.get('/commentlist', function (req, res) {

  // 获得get请求地址栏得参数
  var pageNo = parseInt(req.query['pageNo'])
  // 短路写法
  pageNo = pageNo || 1
  var pageSize = 10
  var totalPage = 0
  var count = 0

  var findData = function (client, cb) {
    var col = client.db('nodeApp')
    var coll = col.collection('comments')
    async.series([
      function (callback) {
        coll.find({}).toArray(function (err, results) {
          count = results.length
          // 向上取整
          totalPage = Math.ceil(count / pageSize)
        })
        callback(null, {})
      },
      function (callback) {
        coll.find({}).sort({_id: -1}).skip((pageNo - 1) * pageSize).limit(pageSize).toArray(function (err, results) {
          callback(null, results)
        })
      }
    ], function (err, results) {
      // 这个results是第一个function和第二个function results和在一起的结果
      cb(results[1])
    })
  }

  MongoClient.connect(DB_CONN_STR, function (err, client) {
    if (err) {
      console.log(err)
    } else {
      findData(client, function (results) {
        res.render('commentlist', {
          pageNo: pageNo,
          totalPage: totalPage,
          count: count,
          data: results
        })
      })
    }
  })
})

// 定义上传图片的接口
router.all('/uploadImg', function (req, res) {
  // 设置变量
  var form = new multiparty.Form()
  // 设置编码格式
  form.encoding = 'utf-8'
  // 设置文件的存储路径  临时文件夹 在根目录下（nodeApp）新建一个文件夹  这个是Java和PHP上传图片都必须要做的
  form.uploadDir = './uploadtemp'
  // 设置文件的大小限制
  form.maxFileSize = 2 * 1024 * 1024
  //上传处理 fields 域   files= 图片的文件
  form.parse(req, function (err, fields, files) {
    // 把图片放在 public 上传图片的真是路径
    var uploadurl = '/images/upload/'
    // 获得文件域（表单的类型）对象 input标签 type='file'
    var file = files['filedata']
    //获得原始文件名字
    var originalFilename = file[0].originalFilename
    // 获得原始文件的路径
    var tmpPath = file[0].path
    // 重命名文件
    var timestamp = new Date().getTime()
    uploadurl += timestamp + originalFilename
    // './public/images/upload/2342341234loading.gif'
    newPath = './public/' + uploadurl

    // 传输  流处理 接受前端传过来的图片二进制流
    var fileReadStream = fs.createReadStream(tmpPath)
    var fileWriteStream = fs.createWriteStream(newPath)
    // 文件写操作
    fileReadStream.pipe(fileWriteStream)
    // 返回信息给前端
    fileWriteStream.on('close', function () {
      // 把临时文件给删除掉
      fs.unlinkSync(tmpPath) // 同步
      res.send('{"err": "", "msg": "' + uploadurl + '"}') // 做到这我们就已经把图片传到后端了

    })
  })
})

// 定义详情页
router.all('/detail', function (req, res) {
  var id = parseInt(req.query['id'])

  MongoClient.connect(DB_CONN_STR, function (err, client) {
    var detail = client.db('nodeApp').collection('comments')
    detail.find({id: id}).toArray(function (err, results) {
      res.render('detail', {data: results})
    })
  })

})
module.exports = router;
