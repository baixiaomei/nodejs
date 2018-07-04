const EventEmitter = require('events')
console.log(EventEmitter)
class Player extends EventEmitter {}
// 声明一个实例
const player = new Player()

// player.on('play', (track) => {
//   console.log(`正在播放《${track}》`)
// })

player.once('play', (track) => { // 只执行一次
  console.log(`正在播放《${track}》`)
})
// player.emit('play', '精绝古城')
player.emit('play', '王皮子坟')