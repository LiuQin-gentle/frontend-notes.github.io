const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.urlencoded({extended:true}));
//解析json格式请求体的中间件
app.use(express.json());
app.use((req, res, next) => {
    //设置响应头
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
    //Access-Control-Allow-Origin 设置指定值时只能设置一个
    //res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500");
    //Access-Control-Allow-Methods 允许的请求的方式
    //Access-Control-Allow-Headers 允许传递的请求头
    next();
})

let STU_ARR = [
    {id:1, name:"孙悟空", age:18, gender:"男", address:"花果山"},
    {id:2, name:"猪八戒", age:18, gender:"男", address:"高老庄"},
    {id:3, name:"沙和尚", age:18, gender:"男", address:"流沙河"}
];

app.get("/test", (req, res)=> {
    
})

//统一的api
app.get("/student", (req,res)=> {
    //这个路由必须在登录后才能访问
    try {
        //需要检查是否登录
        //读取请求头
        const token = req.get("Authorization").split(" ")[1];
        //对token进行解码
        const decodeToken = jwt.verify(token, "chaojianquanmima");

        //解码成功，token有效
        //返回学生信息
        res.send({
            status: "ok",
            data: STU_ARR
        });
    } catch (error) {
        //解码错误，用户token无效
        res.status(403).send({
            status:"error",
            data:"token无效"
        })
    }
    
})

//登录
app.post("/login", (req, res) => {
    const {username,password} = req.body;
    if(username === "admin" && password === "123123"){
        const token = jwt.sign({
            id:"12345",
            username:"admin",
            nickname:"超级管理员"
        }, "chaojianquanmima", {
            expiresIn:"1h"
        })
        res.send({
            status:"ok",
            data:{
                token,
                nickname:"超级管理员"}
        })
    }else{
        res.status(403).send({
            status:"error",
            data:"用户名或密码错误"
        })
    }
})

//添加学生
app.post("/student", (req, res) => {
    const {name, age, gender, address} = req.body;
    const STU = {
        id: +STU_ARR.at(-1).id + 1, 
        name, 
        age: +age, 
        gender, 
        address
    };
    STU_ARR.push(STU);
    res.send({
        status:"ok",
        data:STU_ARR
    })
});

//定义一个删除学生的路由 根据id删除学生
app.delete("/student/:id", (req, res)=>{
    const id = +req.params.id;
    const DEL_STU = STU_ARR.find((item)=>{
        return item.id === id;
    })
    if(DEL_STU){
        res.send({
            status: "ok",
            data: DEL_STU
        })
    } else{
        res.status(403).send({
            status: "error",
            data: "学生id不存在"
        })
    }
    
})

// 定义一个修改学生的路由
app.put("/student", (req,res)=>{
    const {id, name, age, gender, address} = req.body;
    const modStu = STU_ARR.find((item) => {
        return item.id === id;
    })
    if(modStu){
        modStu.name = name;
        modStu.age = age;
        modStu.gender = gender;
        modStu.address = address;
        res.send({
            status: "ok",
            data: modStu
        })
    } else{
        res.status(403).send({
            status:"error",
            data:"学生不存在"
        })
    }
})

app.get("/student/get/:id", (req, res)=>{
    const id = +req.params.id;
    const STU = STU_ARR.find((item)=>{
        return item.id === id;
    })
    res.send({
        status: "ok",
        data: STU
    })
})

app.listen(3000, () => {
    console.log("服务器启动了");
})