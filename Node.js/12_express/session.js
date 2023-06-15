const express = require("express");
const path = require("node:path");
const fs = require("fs/promises");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: "hello"
}));

app.get("/set", (req, res) => {
    /* 
        cookie的不足：
            - cokie是由服务器创建，浏览器保存，每次浏览器访问服务器时都需要将cookie发回
                导致不能在cookie中存放较多的数据，并且cookie是直接存储在客户端，容易被篡改盗用
            - 注意：使用功能cookie一定不会在cookie存储敏感数据
        为了弥补Cookie的不足，我们希望可以这样：
            将用户的数据统一存储在服务器中，
                每一个用户的数据都只有一个对应的id
                只需要通过cookie将id发送给浏览器
                浏览器只需每次访问时将id发回，即可读取到服务器中存储的数据
                这个技术我们称之为session（会话）
        
        session
            - session是服务器中的一个对象，这个对象用来存储用户的数据
            - 每一个session对象都有一个唯一的id，id会通过cookie的形式发给客户端
            - 客户端每次访问时只需将存储有id的cokie发回即可获取它在服务器中存储的数据
            - 在express 可以通过express-session组件来实现session功能
            - 使用步骤
                ① 安装
                    npm i express-session
                ② 引入
                    const session = require("express-session")
                ③ 设置为中间件
                    app.use(session({...}))
    */
    req.session.username = "swk";
    res.send("查看session");
})

app.get("/get", (req, res) => {
    const name = req.session.username;
    console.log(name);
    res.send("读取session");
})

app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面被外星人劫持了</h1>")
})
app.listen(3000, () => {
    console.log("服务器启动了！");
})
