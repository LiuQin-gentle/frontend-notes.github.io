const express = require("express");
const path = require("node:path");
const fs = require("fs/promises");
const cookieParser = require("cookie-parser");
const studentRouter = require("./routes/student");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/student",studentRouter);

app.get("/", (req, res) => {
    res.render("login")
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username === "admin" && password === "123"){
        /* 
        现在咱们这个登录，简直形同虚设，
            HTTP协议是一个无状态的协议，
                服务器无法区分请求是否发送自同一个客户端
 
            cookie
                - cookie是HTTP协议中用来解决无状态问题的技术
                - cookie的本质就是一个头
                    - 服务器以响应头的形式将cookie发送给客户端
                        客户端收到以后会将其存储，并在下次向服务器发送请求时将其传回
                        这样服务器就可以根据cookie来识别出客户端了
                - 需要安装中间件来是使得express可以解析cookie
                    1. 安装cookie-parser
                        npm i cookie-parser
                    2. 引入
                        const cookieParser = require("cookie-parser");
                    3. 设置中间件
                        app.use(cookieParser());
    */
        // 登录成功
        res.cookie("username", username);
        res.redirect("/student/list");
    }else{
        res.send("用户名或密码错误")
    }
})

app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面被外星人劫持了</h1>")
})
app.listen(3000, () => {
    console.log("服务器启动了！");
})
