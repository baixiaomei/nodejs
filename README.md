# nodejs
node + express + ejs + mongodb 的前后端不分离项目 功能是上传评论

### xheditor编辑器

xhEditor是一个基于jQuery开发的简单迷你并且高效的在线可视化HTML编辑器，而且兼容很多浏览器，所以就选它了，具体使用如下：

https://blog.csdn.net/guorui_java/article/details/77771663


还有一个类似的 ueditor

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

