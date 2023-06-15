/*  
    目前，服务器代码修改后必须要重启，
    要实现这个功能，我们需要安装一个模块 nodemon
        使用方式
            1. 全局安装
                npm i nodemon -g
                yarn global add nodemon
                    - 通过yarn进行全局安装时，默认yarn的目录并不在环境变量中
                    - 需要手动添加到环境变量
                - 启动
                    nodemon //运行index.js
                    nodemon xxx //运行指定的js
            2. 在项目中安装
                npm i nodemon -D
                yarn add nodemon -D

                - 启动
                    npx nodemon
*/
const express = require("express");
const path = require("node:path");
const app = express();

/* 
    服务器中的代码，对于外部来说都是不可见的，
        所以我们写的html页面，浏览器无法直接访问
        如果希望浏览器访问，则需要将页面所在的目录设置为静态资源目录
*/
//设置static中间件后，浏览器访问时，会自动取public目录寻找是否有匹配
app.use(express.static(path.resolve(__dirname, "./public")));

//引入解析请求体的中间件
app.use(express.urlencoded());

app.get("/login", (req, res) => {
    //console.log(req.query);
    if(req.query.username === "123" && req.query.password === "123"){
        res.send("<h1>登录成功！</h1>")
    }else{
        res.send("<h1>登录失败！</h1>")
    }
})
app.get("/", (req, res) => {
    /* 
        希望用户返回根目录时，可以给用户返回一个网页
    */
    res.send("怎么办呢");
})

// get请求发送参数的第二种方式
// /hello/:id  表示当用户访问/hello/xxx时会触发
// 在路径中以冒号命名的部分我们成为param，在get请求它可以被解析为请求参数
app.get("/hello/:id", (req, res) => {
    //约定优于配置
    //可以通过req.params属性来获取这些参数
    console.log(req.params);
    res.send("<h1>这是hello路由</h1>");
})

app.post("/login", (req, res) => {
    //通过req.body来获取post请求的参数(请求体中的参数)
    //默认情况下，express不会自动解析请求体，需要通过中间件为其增加功能
    //console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    if(username === "123" && password === "123"){
        res.send("<h1>登录成功！</h1>")
    }else{
        res.send("<h1>登录失败！</h1>")
    }
})

app.listen(3000, () => {
    console.log("服务器启动了~");
})
