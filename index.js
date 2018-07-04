// 引用模块
var name = require('./name.js')
var fs = require('fs') // nodejs本身自带这种模块开发
var $ = require('jquery') // 第三方的用npm管理

console.log(name.sayName())
console.log(name.sayTime())

// 第三方的模块
console.log($)