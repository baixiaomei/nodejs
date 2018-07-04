var http = require('http')
var url = require('url')
var route = require('./module/router')

var fs = require('fs')

http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    var pathname = url.parse(req.url).pathname.replace(/\//, '')
    console.log(pathname)
    try {
      route[pathname](req, res)
    } catch (e) { // 路由重定向
      route['home'](req, res)
    }
    // route.home(req, res)
  }
}).listen(8000)

console.log('server running at http://localhost:8000')