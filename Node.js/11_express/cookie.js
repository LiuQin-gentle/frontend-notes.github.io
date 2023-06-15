const express = require("express");
const path = require("node:path");
const fs = require("fs/promises");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/set", (req, res) => {
    /* 
        cookie是有有效期的
            - 默认情况下，cookie的有效期就是一次会话（session）
                会话就是一次从打开到关闭浏览器的过程
            - maxAge 用来设置cookie的有效时间，单位是毫秒
    */
    res.cookie("name", "swk", {
        maxAge:1000 * 60 * 60 * 24 *30//一个月的时间
    });
    res.send("设置cookie");
})

app.get("/delete-cookie", (req, res) => {
    // cookie一旦发送给浏览器就不能再修改了
    // 但是可以通过发送新的同名cookie来替换旧cookie，从而达到修改的目的
    res.cookie("name", "", {
        maxAge: 0
    });
    res.send("删除cookie");
})

app.get("/get", (req, res) => {
    const name = req.cookies.name;
    console.log(name);
    res.send("读取cookie");
})

app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面被外星人劫持了</h1>")
})
app.listen(3000, () => {
    console.log("服务器启动了！");
})
