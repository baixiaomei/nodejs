var fs = require('fs')

module.exports = {
  read: function (url, res, code, callback) {
    res.writeHead(200, {'Content-Type': code + '; charset=utf-8'})
    fs.readFile(url, 'utf-8', function (error, data) {
      if (error) {
        console.log(error)
      } else {
        callback(data)
        // write 时异步的所以在它之后执行end
        res.end('结束')
      }
    })
  }
}