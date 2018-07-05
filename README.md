# nodejs
node + express + ejs + mongodb 的前后端不分离项目 功能是上传评论

进入nodeApp  执行：

  supervisor   ./bin/www

  http://localhost:3000/

### express

安装： npm install express -g

      express --help

      报错 command not found : express

      解决办法：
      npm install -g express-generator

使用ejs技术：

      express --view=ejs nodeApp  (nodeApp 是node的项目名称)

      cd nodeApp

      npm install

      DEBUG=nodeapp:*npm start

在浏览器里打开

      http://localhost：3000

### MongoDB

安装：

  brew update

  brew install mongodb

启动服务：

  mongod --config /usr/local/etc/mongod.conf

新建一个窗口

  mongo

mongodb的可视化工具：

  https://www.cnblogs.com/shiweida/p/7692468.html

### xheditor编辑器

xhEditor是一个基于jQuery开发的简单迷你并且高效的在线可视化HTML编辑器，而且兼容很多浏览器，所以就选它了，具体使用如下：

https://blog.csdn.net/guorui_java/article/details/77771663


还有一个类似的 ueditor

