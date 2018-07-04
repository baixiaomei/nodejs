var http = require('http')

// http请求需要有request  response
http.createServer(function (request, response) {
  // 写头部 返回值 文档类型  编码
  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
  // 如果不进行处理里面会进行两次请求
  // console.log(request.url) // 有两个URL
  if (request.url !== '/favicon.ico') {
    response.write('Hello NodeJs')
    console.log(request.url)
    response.end() // 结束服务，否则将一直请求
  }

}).listen(8000) // 链式调用

console.log('server running at http://localhost:8000')