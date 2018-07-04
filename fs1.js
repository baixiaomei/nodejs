// node 文件系统

const fs = require('fs')

fs.stat('./server.js', (error, stats) => { //把error放在前面
  if (error) {
    console.log(error)
  } else {
    console.log(stats)
    console.log(stats.isFile()) // 是不是文件
    console.log(stats.isDirectory()) // 是不是是个目录
  }
}) // 查看当前文件的信息