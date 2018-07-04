const fs = require('fs')
// 同步执行读文件
fs.readdirSync('./logs').map((file) => {
  // 删除文件的操作
  fs.unlink(`./logs/${file}`, (error) => {
    console.log('deleted!')
  })
})

// 异步删除文件目录
fs.rmdir('./logs', (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('ok')
  }
})