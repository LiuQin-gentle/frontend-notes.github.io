const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;
let STUDENTS = require("../data/students.json");
const router = express.Router();

router.use((req, res, next) => {
    //获取一个请求头refer
    /* const referer = req.get("referer");
    if(!referer || !referer.startsWith("http://localhost:3000/")){
        res.status(403).send("你没有这个权限！");
        return;
    } */

    if(req.session.loginUser){
        next();
    }else{
        res.redirect("/");
    }
});

router.get("/list", (req, res) => {
    //生成一个token
    const csrfToken = uuid();
    //将token添加到session中
    req.session.csrfToken = csrfToken;
    req.session.save(() => {
        res.render("students", { 
            stus: STUDENTS, 
            username: req.session.loginUser,
            csrfToken: req.session.csrfToken
        });
    });

    });

router.post("/add-student", (req, res, next) => {
    //客户端发送的token
    const csrfToken = req.body._csrf;
    const sessionToken = req.session.csrfToken;
    req.session.csrfToken = null;
    //将客户端的token和session中的token进行比较
    if(sessionToken === csrfToken){
        const id = STUDENTS.at(-1).id + 1;
        const newUser = {
            id, 
            name: req.body.name, 
            age: +req.body.age,
            gender: req.body.gender,
            address: req.body.address
        };
        STUDENTS.push(newUser);
        next();
    } else{
        res.status(403).send("token错误");
    } 
})

router.get("/delete", (req, res, next) => {
    const id = +req.query.id;
    STUDENTS = STUDENTS.filter((item) => {
        return item.id !== id;
    });
    next();
})

router.get("/to-update", (req, res) => {
    const id = +req.query.id;
    const student = STUDENTS.find((item) => {
        return item.id === id;
    })
    res.render("update", {student});
})

router.post("/update-student", (req, res, next) => {
    const {id, name, age, gender, address} = req.body;

    const student = STUDENTS.find((item) => {
        return item.id == id;
    });
    student.name = name;
    student.age = +age;
    student.gender = gender;
    student.address = address; 
    next();
})

router.use((req, res) => {
    fs.writeFile(
        path.resolve(__dirname, "../data/students.json"),
        JSON.stringify(STUDENTS)
    ).then(() => {
        res.redirect("/student/list");
    }).catch((err) => {
        res.send("操作失败！");  
    });
    return;
})
module.exports = router