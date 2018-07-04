var date = require('./date')

var Name = {
    name: 'zhangsan',
    sayName: function () {
        return this.name
    },
    sayTime: function () {
        return date
    }
}

// 暴露模块

module.exports = Name
