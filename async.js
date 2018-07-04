var async = require('async')

// 串行通信

// 计数
console.time('time')

// async.series([
//   function (callback) {
//     setTimeout(function () {
//       callback(null, 'one')
//     }, 1000)
//   },
//   function (callback) {
//     setTimeout(function () {
//       callback(null, 'two')
//     }, 1000)
//   }
// ], function (error, result) {
//   console.log(result)
//   console.timeEnd('test')
// })

// 并行无关联 执行时间是时间最长的
console.time('test')
// async.parallel([
//   function (callback) {
//     setTimeout(() => {
//       console.log('one')
//       callback(null, 'one')
//     }, 3000)
//   },
//   function (callback) {
//     setTimeout(() => {
//       callback(null, 'two')
//     }, 1000)
//   }
// ], function (error, result) {
//   console.log(result)
//   console.timeEnd('test')
// })

// 瀑布流  串行有关联
async.waterfall([
  function (callback) {
    callback(null, 'one')
  },
  function (arg, callback) {
    callback(null, arg, 'two')
  },
  function (arg1, arg2, callback) {
    callback(null, [arg1, arg2, 'done'])
  }
], function (error, result) {
  console.log(result)
  console.timeEnd('test')
})
