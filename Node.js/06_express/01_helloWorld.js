/* 
    express是node中的服务器软件
        通过express可以快速地在node中搭建一个web服务器
    - 使用步骤
        1. 创建并初始化项目
            yarn init -y
        2. 安装express
            yarn add express
        3. 创建index.js 并编写代码
*/
//引入express
const express = require("express");
//获取服务器的实例（对象）
const app = express();

/* 
    如果希望服务器可以正常访问，则需要为服务器设置路由，
        路由可以根据不同的请求方式和请求地址来处理用户的请求

        app.METHOD(...)
            METHOD 可以是 get 或 post 
        
        中间件
            - 在express我们使用app.use来定义一个中间件
                中间件作用和路由很像，用法很像
                但是路由不区分请求的方式，只看路径
            - 和路由的区别
                1. 会匹配所有请求
                2. 路径设置父目录
            如果不写"/"，则根目录下所有的访问路径都会执行
            next()是回调函数的第三个参数，它是一个函数，调用函数后，可以触发后续的中间件
                next()不能在响应处理完毕后调用
*/
app.use((req, res, next) => {
    console.log("收到请求1");
    //res.send("这是通过中间件返回的响应1")
    next()//放行，我不管了~
});

app.use((req, res, next) => {
    console.log("收到请求2");
    //res.send("这是通过中间件返回的响应2")
    next()//放行，我不管了~
});

app.use((req, res, next) => {
    console.log("收到请求3");
    res.send("这是通过中间件返回的响应3")
});

//  "/" 表示根目录：http://localhost:3000
// 路由的回调函数执行时会接收三个参数，第一个是request，第二个是response
/* 
    在路由中，应该做两件事
        读取用户的请求（request）
            req表示的是用户的请求信息，通过req可以获取用户传递数据
        根据用户的请求返回响应（response）
            res表示服务器发送给客户端的响应信息，通过res来向客户端返回数据
            sendStatus()向客户端发送响应状态码
            status()用来设置响应状态码，但是并不发送
            send()设置并发送响应体
*/
/* app.get("/", (req, res) => {
    console.log("有人访问我了~");
    
    console.log(req.url);
    //res.sendStatus(404);
    res.status(200);
    res.send("<h1>这是我的第一个服务器！</h1>");
}) */

/* 
    启动服务器
    app.listen(端口号)用来启动服务器
    服务器启动后，即可通过3000端口来访问了
    协议名://ip地址:端口号/路径
    http://localhost:3000
    http://127.0.0.1:3000
*/
app.listen(3000, () => {
    console.log("服务器启动了~");
})