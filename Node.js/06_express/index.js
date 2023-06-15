const express = require("express");
const path = require("node:path");
const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));

//引入解析请求体的中间件
app.use(express.urlencoded());

const USERS = [
    {
        username:"admin",
        password:"123",
        nickname:"超级管理员"
    },
    {
        username:"swk",
        password:"123",
        nickname:"孙悟空"
    }
]
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // for(const user of USERS){
    //     if(user.username === username){
    //         if(user.password === password){
    //             res.send(`<h1>登录成功！${user.nickname}</h1>`);  
    //             return;
    //         } 
    //     }
    // }
    // res.send(`<h1>用户名或密码错误！</h1>`);

    const loginUser = USERS.find((item) => {
        return item.username === username && item.password === password;
    })
    if(loginUser){
        res.send(`<h1>登录成功！${loginUser.nickname}</h1>`);  
    }else{
        res.send(`<h1>用户名或密码错误！</h1>`);
    }
});

app.post("/regist", (req, res) => {
    const {username,password,repwd,nickname} = req.body;
    //只验证用户名是否存在
    const user = USERS.find(item => {
        return item.username === username || item.nickname === nickname;
    })
    if(!user){
        USERS.push({
            username,
            nickname,
            password
        });
        res.send(`<h1>恭喜您，注册成功！</h1>`)
    }else{
        res.send(`<h1>用户名已存在</h1>`)
    }
});

app.listen(3000, () => {
    console.log("服务器启动了~");
})
