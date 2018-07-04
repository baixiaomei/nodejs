var file = require('./file')
var fs = require('fs')

module.exports = {
  home: function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    // 路径相对于router1.js
    file.read('./views/home.html', res, 'text/html',  function (data) {
      res.write(data)
    })
  },
  list: function (req, res) {
    file.read('./views/list.json', res, 'text/json',  function (data) {
      res.write('callback(')
      res.write(data)
      res.write(')')
    })
  }
}