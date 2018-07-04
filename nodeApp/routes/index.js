var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express3', name: '<b>zhangsan</b>' });
});

// 注册功能
router.get('/register', function (req, res, next) {
  res.render('register', {title: '注册', isShowNickname: true, name: '<b>zhangsan</b>'})
})

// 登录功能
router.get('/login', function (req, res, next) {
  res.render('login', {title: '登陆'})
})

// 评论添加
router.get('/comment', function (req, res, next) {
  res.render('comment', {title: '评论添加'})
})

// 评论展示
// router.get('/commentlist', function (req, res, next) {
//   res.render('commentlist', {})
// })

module.exports = router;
