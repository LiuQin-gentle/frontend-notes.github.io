const express = require("express");
const path = require("node:path");
const fs = require("fs/promises");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const uuid = require("uuid").v4;
const studentRouter = require("./routes/student");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    session({
        store: new FileStore({
            path: path.resolve(__dirname, "./sessions"),//path用来指定session本地文件的路径
            secret:"嘿嘿", //加密
           // ttl:10, //session的有效时间，单位为秒，默认一个小时
            //默认情况下，fileStore会每间隔一小时，清除一次session对象
            //reapInterval 用来指定清除session的间隔，单位秒，默认 1 小时
            //reapInterval:10
        }),
        secret: "hello"
    })
);
/* 
    csrf攻击
        - 跨站请求伪造
        - 现在大部分的浏览器都不会在跨域的情况下自动发送cookie
            这个设计就是为了避免csrf的攻击
        - 怎么解决？
            1. 使用referer头来检查请求的来源
            2. 使用验证码
            3. 尽量使用post请求(结合token)
        
        - token(令牌)
            - 可以在创建表单时随机生成一个令牌
                然后将令牌存储到session中，并通过模板发送给用户
                用户提交表单时，必须将token发回，才可以进行后续操作
                (可以使用uuid来生成token)
*/

/* 
    session是服务器中的一个对象，这个对象用来存储用户的信息
        每一个session都有一个唯一的id，session创建后，
            id会以cookie的形式发送给浏览器
        浏览器收到以后，每次访问都会将id发回，服务器就可以根据id找到对应的session
    id(cookie) ---> session对象

    session什么时候会失效？
        1. 浏览器的cookie没了
        2. 服务器中的session对象没了

    express-session默认是将session存储到内存中，所以服务器一旦重启session会自动重置
        所以我们使用session通常会对session进行一个持久化的操作（写到文件或数据库）

    如何将session存储到本地文件：
        - 需要引入一个中间件session-file-store
            ① 安装
                npm i session-file-store
            ② 引入
                const FileStore = require("session-file-store")(session);
            ③ 设置为中间件
                app.use(
                    session({
                        store: new FileStore({}),
                        secret: "hello"
                    })
                );
*/

app.use("/student",studentRouter);

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/logout", (req, res) => {
    //使session失效
    req.session.destroy(() => {
        res.redirect("/");
    });
});
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username === "admin" && password === "123"){
        // 这里仅仅是将loginUser添加到了内存中的session，而没有写入到文件中
        req.session.loginUser = username;

        //为了使得session可以立刻存储，需要手动调用save
        req.session.save(() => {
            res.redirect("/student/list");
        }); 
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
