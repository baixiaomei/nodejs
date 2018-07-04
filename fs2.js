const fs = require('fs')

/**
 * fs.mkdir(文件名， 回调) 弄的操作本地文件  添加文件夹
*/

fs.mkdir('./logs', (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('success')
  }
})
fs.writeFile('./logs/x.json', (error) => {
  console.log(error)
  console.log('success')
})