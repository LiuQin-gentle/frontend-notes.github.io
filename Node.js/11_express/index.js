const express = require("express");
const path = require("node:path");
const fs = require("fs/promises");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const studentRouter = require("./routes/student");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: "hello"
}));

app.use("/student",studentRouter);

app.get("/", (req, res) => {
    res.render("login")
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username === "admin" && password === "123"){
        req.session.loginUser = username;
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
